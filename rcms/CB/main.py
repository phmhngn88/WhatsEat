from re import T
import numpy as np
import pandas as pd
import fetch
import MySQLdb
from math import isnan
import utils
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

cv = CountVectorizer(max_features=5000,stop_words='english')

conn = MySQLdb.connect(host="127.0.0.1", user="root", passwd="11111111", db="whatseat")
cur = conn.cursor()

#lấy dataframe món ăn
recipes_df = fetch.recipes_df(cur)
#xóa những phần tử null
recipes_df = recipes_df.dropna()
cur.close()

# remove html tag trong description
recipes_df['Description'] = recipes_df['Description'].apply(utils.remove)

recipes_df = recipes_df.head(100)

recipes_df['tags'] = recipes_df['Description'].apply(lambda x:x.split())
new = recipes_df.drop(columns=['Description'])
new['tags'] = new['tags'].apply(lambda x: " ".join(x))

vector = cv.fit_transform(new['tags']).toarray()
similarity = cosine_similarity(vector)
df = pd.DataFrame(similarity)
print(df)
object_list = utils.convertDataframeToList(df,new['id'])
fields = ("id1", "id2", "similarity")
utils.upsert(conn, "cb_similarity", fields, object_list)

