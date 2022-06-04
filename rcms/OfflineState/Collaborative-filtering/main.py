import pandas as pd
import MySQLdb
from sqlalchemy import Column
import fetch
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics.pairwise import cosine_similarity
import utils

conn = MySQLdb.connect(host="127.0.0.1", user="root", passwd="11111111", db="whatseat")
cur = conn.cursor()
recipe_rating_df = fetch.get_recpie_review(cur)
recipe_rating_df = recipe_rating_df.dropna()
cur.close()

rating_matrix = recipe_rating_df.pivot(index='RecipeId',columns='CustomerId',values='Rating')

#normalize matrix (trừ trung bình cộng của các item)
matrix_norm = rating_matrix.subtract(rating_matrix.mean(axis=1), axis = 0)

print(matrix_norm)

#create item similarity matrix
item_similarity_cosine = cosine_similarity(matrix_norm.fillna(0))
object_list = utils.convertDataframeToList(pd.DataFrame(item_similarity_cosine,index = matrix_norm.index,columns=matrix_norm.index))
fields = ("id1", "id2", "similarity")
utils.upsert(conn, "item_base_similarity", fields, object_list)
# knn = NearestNeighbors(metric='cosine', algorithm='brute')
# knn.fit(rating_matrix.values)
# distances, indices = knn.kneighbors(rating_matrix.values, n_neighbors=3)