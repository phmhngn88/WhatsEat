from random import triangular
import pandas as pd
import numpy as np

# rarting_click_df fuction: fetch user's click data from database
# Input: mysql cursor
# Output: pandas dataframe of clicks data with three columns: id_user, id_movie, rating
def rating_click_df(cur):
    cur.execute("""SELECT id_user, id_movie, is_clicked FROM whatseat.interactive""")
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id_user', 'id_movie', 'rating'])
    return click_df

def rating_love_df(cur):
    cur.execute("""SELECT id_user, id_food, is_love FROM whatseat.interactive_food""")
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id_user', 'id_food', 'rating'])
    return click_df

def get_fav_food(cur, user_id):
    cur.execute("""SELECT CustomerId, RecipeId FROM whatseat.recipereviews where rating >= 4 and CustomerId = %s """,(user_id,))
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['CustomerId', 'RecipeId'])
    return click_df
# similarity_df function: fetch user-user similarity data from database
# Input: 
# + cur: mysql cursor
# + user_id: id of user
# Output:
# + dataframe of similarity score with two columns: 
#       - id_user_2: ids of users that are similarity calculated with input user_id
#       - similarity: similarity score
def fetch_sim(cur):
    cur.execute("""SELECT id1,id2, similarity FROM whatseat.cb_similarity""")
    res = cur.fetchall()
    similarity_df = pd.DataFrame(res, columns=['id1','id2', 'similarity'])
    print("similarity_df: ", similarity_df)
    return similarity_df

def similarity_df(cur, user_id):
    cur.execute("""SELECT id_user_2, similarity FROM moviedb.jaccard_similarity WHERE id_user_1 = %s""", (user_id,))
    res = cur.fetchall()
    similarity_df = pd.DataFrame(res, columns=['id_user_2', 'similarity'])
    print("similarity_df: ", similarity_df)
    return similarity_df

def similarity_df2(cur, user_id):
    cur.execute("""SELECT id_user_2, similarity FROM testdb.jaccard_similarity_food WHERE id_user_1 = %s""", (user_id,))
    res = cur.fetchall()
    similarity_df = pd.DataFrame(res, columns=['id_user_2', 'similarity'])
    print("similarity_df: ", similarity_df)
    return similarity_df

# user_factor fuction: fetch user's factors data from the database
# Input: 
# + cur: mysql cursor
# + user_id: id of user
# Output:
# + np array of user factors of input user with (1,k) shape
def user_factor(cur, user_id):
    cur.execute("""SELECT * FROM moviedb.user_factors WHERE id_user = %s""",(user_id,))
    res = cur.fetchall()
    user_factor = np.asarray(res, dtype= float).flatten()[1:]
    return user_factor

# item_factor function: fetch items' factors from the database
# Input: 
# + cur: mysql cursor
# Output:
# + np array of all item factors with (n_item,k) shape
def item_factor(cur):
    cur.execute("""SELECT * FROM moviedb.movie_factors """)
    res = cur.fetchall()
    res = [ele[1:] for ele in res]
    movie_factor = np.asarray(res, dtype= float)
    return movie_factor

# user_bias function: fetch user' bias score from the database
# Input: 
# + cur: mysql cursor
# + user_id: id of user
# Output:
# + user bias (float)
def user_bias(cur, user_id):
    cur.execute("""SELECT * FROM moviedb.user_biases WHERE id_user = %s""",(user_id,))
    res = cur.fetchall()
    user_bias = np.asarray(res, dtype= float).flatten()[1]
    return user_bias

# item_bias fuction: fetch items' bias scores from the database
# Input: 
# + cur: mysql cursor
# Output:
# + item bias in (n_item, 1) shape
def item_bias(cur):
    cur.execute("""SELECT * FROM moviedb.movie_biases""")
    res = cur.fetchall()
    res = [ele[1:] for ele in res]
    movie_bias = np.asarray(res, dtype= float).flatten()
    return movie_bias

# global_rating_mean function: fetch global rating mean from the database
# Input: 
# + cur: mysql cursor
# Output:
# + average global rating (float)
def global_rating_mean(cur ):
    cur.execute("""SELECT * FROM moviedb.global_mean_ratings """)
    res = cur.fetchall()
    global_mean_rating = np.asarray(res, dtype= float).flatten()[0]
    return global_mean_rating

# rating_watchtime_df function: fetch data of user - item view time from the database
# Input: mysql cursor
# Output: dataframe of watching time data
def rating_watchtime_df(cur):
    cur.execute("""SELECT id_user, id_movie, rating FROM moviedb.interactive""")
    res = cur.fetchall()
    training_df = pd.DataFrame(res, columns=['id_user', 'id_movie', 'rating'])
    training_df = training_df.dropna()
    return training_df

# movie_direction_actor function: fetch data of movies' director, actor from the database
# Input: 
# + cur: mysql cursor
# + list_item_id: List of item ids
# Output:
# + dataframe contain id of movies and information of their directors and actors
def movie_director_actor(cur, list_item_id):
    cur.execute("""SELECT id, director, actor FROM moviedb.movie WHERE id IN %s""",(tuple(list_item_id),))
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['id','director','actor'])

def list_product(cur, list_product_id):
    cur.execute("""SELECT ProductId, Name, InStock, BasePrice, Description FROM whatseat.products WHERE ProductId IN %s""",(tuple(list_product_id),))
    res = cur.fetchall()
    print(res)
    return pd.DataFrame(res, columns=['productId','name','inStock','basePrice','description'])

def list_recipents(cur, list_recipents_id):
    cur.execute("""SELECT RecipeId, Name, TotalTime, TotalView, totalLike, ThumbnailUrl FROM whatseat.recipes WHERE RecipeId IN %s""",(tuple(list_recipents_id),))
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['recipeId','name','totalTime','totalView','totalLike','images'])

def get_list_recipents_by_index(cur, list_recipents_id):
    cur.execute("""SELECT re.RecipeId, re.Name, re.TotalTime, re.TotalView, re.totalLike, re.ThumbnailUrl FROM whatseat.recipes re
     WHERE FAKE IN %s""",(tuple(list_recipents_id),))
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['recipeId','name','totalTime','totalView','totalLike','images'])

def product_recommendation(cur):
    cur.execute("""SELECT id_user, id_movie, (is_clicked + shop_rating)/2 FROM testdb.interactive""")
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id_user', 'id_movie', 'rating'])
    return click_df

def interactive_food(cur,recipeTypeId):
    cur.execute("""SELECT review.CustomerId, review.RecipeId, review.Rating 
                        FROM whatseat.recipereviews review
                        JOIN whatseat.reciperecipetypes re ON review.RecipeId = re.RecipeId
                        Where re.RecipeTypeId = %s""",(recipeTypeId,))
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id_user', 'id_food', 'rating'])
    return click_df
#get list top recipe by 
def get_top_recipe(cur):
    cur.execute("""SELECT Fake, RecipeId, Name, TotalTime, TotalView, totalLike, ThumbnailUrl, RecipeTypeId FROM whatseat.recipes 
     Order By totalLike desc LIMIT 20""")
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id','recipeId','name','totalTime','totalView','totalLike','images','recipeTypeId'])
    return click_df
#get list recipe id love by user
def recipe_love_by_user(cur, id_user):
    cur.execute("""SELECT CustomerId ,GROUP_CONCAT(Fake) FROM whatseat.lovedrecipes IR
    JOIN whatseat.recipes R ON IR.RecipeId = R.RecipeId WHERE CustomerId = %s """,(id_user,))
    res = cur.fetchall()
    print('res',res)
    res = res[0][1]
    ids = []
    if(res != None):
        ids = res.split(',')
        ids = [int(s) for s in ids]
    return ids

def genre(cur):
    cur.execute("""SELECT mList.id_movie, group_concat( li.name)
                    FROM moviedb.movie_list mList
                    JOIN moviedb.list li ON mList.id_list = li.id
                    where li.type = 0
                    group by mList.id_movie""")
    res = cur.fetchall()
    movies = pd.DataFrame(res, columns=['movieId','genres'])
    return movies

#Get genre of recipe
def genre_recipe(cur):
    cur.execute("""SELECT reType.RecipeId, group_concat( type.Name)
                    FROM whatseat.reciperecipetypes reType
                    JOIN whatseat.recipetypes type ON reType.RecipeTypeId = type.RecipeTypeId
                    group by reType.RecipeId LIMIT 30282""")
    res = cur.fetchall()
    recipes = pd.DataFrame(res, columns=['id','genres'])
    return recipes

def get_top_product_low_price(cur,list_product_id):
    cur.execute("""SELECT ProductId, Name, InStock, BasePrice,PhotoJson,WeightServing, TotalSell from
    whatseat.products where Fake IN %s ORDER BY BasePrice ASC LIMIT 12""",(tuple(list_product_id),))
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['recipeId','name','totalTime','totalView','totalLike','images','recipeTypeId'])


def get_product_priori(cur,list_product_id):
    cur.execute("""SELECT consequents FROM whatseat.apriori
    WHERE confidence >= 0.5 AND antecedents IN %s""",(tuple(list_product_id),))
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['consequents'])

def get_product_by_list_id(cur,list_product_id):
    cur.execute("""SELECT ProductId, Name, InStock, BasePrice,PhotoJson,WeightServing, TotalSell from
    whatseat.products where ProductId IN %s""",(tuple(list_product_id),))
    res = cur.fetchall()
    return pd.DataFrame(res,columns=['productId','name','inStock','basePrice','images','weightServing','totalSell'])