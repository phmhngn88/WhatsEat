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
genre_df = utils.genre_df(cur)
#xóa những phần tử null
genre_df = genre_df.dropna()
cur.close()

similarity = cosine_similarity(genre_df)
df = pd.DataFrame(similarity)
print(df)
object_list = utils.convertDataframeToList(df)
fields = ("id1", "id2", "similarity")
utils.upsert(conn, "cb_similarity", fields, object_list)

