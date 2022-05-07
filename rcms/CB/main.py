import pandas as pd
import MySQLdb
import utils
from sklearn.metrics.pairwise import cosine_similarity

conn = MySQLdb.connect(host="127.0.0.1", user="root", passwd="11111111", db="whatseat")
cur = conn.cursor()

################## RECIPE ###############################
#lấy dataframe món ăn theo thể loại
genre_df = utils.genre_df(cur,type = "recipe")
#xóa những phần tử null
genre_df = genre_df.dropna()
cur.close()
#tính similarity theo dataframe món ăn theo thể loại
similarity = cosine_similarity(genre_df)
df = pd.DataFrame(similarity)
#convert dataframe sang list
object_list_recipe = utils.convertDataframeToList(df)
#insert similiraty vào db
fields = ("id1", "id2", "similarity")
utils.upsert(conn, "cb_similarity", fields, object_list_recipe)

################## PRODUCT ###############################
#lấy dataframe món ăn theo thể loại
cur = conn.cursor()
genre_product_df = utils.genre_df(cur,type = "product")
#xóa những phần tử null
genre_product_df = genre_product_df.dropna()
cur.close()
#tính similarity theo dataframe món ăn theo thể loại
similarity = cosine_similarity(genre_product_df)
df = pd.DataFrame(similarity)
#convert dataframe sang list
object_list_product = utils.convertDataframeToList(df)
#insert similiraty vào db
fields = ("id1", "id2", "similarity")
utils.upsert(conn, "cb_product_similarity", fields, object_list_product)