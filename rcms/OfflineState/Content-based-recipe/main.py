import pandas as pd
import MySQLdb
import fetch
import utils
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy import spatial
from sqlalchemy import create_engine


conn = MySQLdb.connect(host="127.0.0.1", user="root", passwd="11111111", db="whatseat")
cur = conn.cursor()
recipe_df = fetch.recipes_df(cur)
recipe_df = recipe_df.dropna()
cur.close()

# recipe_df['Steps'] = recipe_df['Steps'].apply(utils.convert_content)
recipe_df['Ingredients'] = recipe_df['Ingredients'].apply(utils.convert_ingredient)
recipe_df['tags'] = recipe_df['Ingredients']
new = recipe_df.drop(columns=['Steps','Ingredients'])

new['tags'] = new['tags'].apply(lambda x: " ".join(x))

cv = TfidfVectorizer(max_features=20447,stop_words='english')
vector = cv.fit_transform(new['tags']).toarray()

dataframe = pd.DataFrame(vector,index = recipe_df['RecipeId'])

#get user profile interact with web
cur = conn.cursor()
list_user = fetch.get_list_user(cur)['CustomerId'].values.tolist()
cur.close()

#truncate table sim
cursor= conn.cursor()
cursor.execute("TRUNCATE TABLE whatseat.cb_similarity")
cursor.close()

for user in list_user:
    cur = conn.cursor()
    user_profile = fetch.get_user(cur,user)
    cur.close()
    user_profile['rating'] = 1
    #Lấy ra các vector item user đã like 
    user_tags_df = dataframe[dataframe.index.isin(user_profile.RecipeId)]
    user_tags_df.reset_index(drop=True, inplace=True)
    
    #Lấy ra các vector item user chưa like 
    unlove_recipe_df = dataframe[~dataframe.index.isin(user_profile.RecipeId)]

    #Tạo user profile từ các vector 
    user_profile = user_tags_df.T.dot(user_profile.rating)
    weight = user_profile / len(user_tags_df.index)

    #Tính độ tương đồng của user profile với các item profile chưa like
    similarity = unlove_recipe_df.apply(lambda row: 1 - spatial.distance.cosine(row, weight.array), axis=1)
    
    #Insert độ tương đồng giữa user profile và item profile vào db
    sim_df = pd.DataFrame({'RecipeId':similarity.index, 'Similarity':similarity.values})
    sim_df['CustomerId'] = user
    columns_titles = ["RecipeId", "CustomerId", "Similarity"]
    df_reorder=sim_df.reindex(columns=columns_titles)
    df_reorder = df_reorder.sort_values(by='Similarity', ascending=False)
    df_reorder = df_reorder.head(2000)
    print(df_reorder)

    my_conn = create_engine("mysql+mysqldb://root:11111111@localhost/whatseat")
    df_reorder.to_sql(con=my_conn,name='cb_similarity',if_exists='append',index=False)

    # object_list = list(df_reorder.to_records(index=False))

    # fields = ("RecipeId", "CustomerId", "Similarity")

    # utils.upsert(conn, "cb_similarity", fields, object_list)