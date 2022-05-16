from random import triangular
import pandas as pd
import numpy as np

# rarting_click_df fuction: fetch user's click data from database
# Input: mysql cursor
# Output: pandas dataframe of clicks data with three columns: id_user, id_movie, rating
def rating_recipe_df(cur):
    cur.execute("""SELECT CustomerId, RecipeId, Rating FROM whatseat.recipereviews""")
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['CustomerId', 'RecipeId', 'Rating'])
    return click_df

def similarity_item_df(cur):
    cur.execute("""SELECT id1, id2, similarity FROM whatseat.item_base_similarity""")
    res = cur.fetchall()
    item_sim_df = pd.DataFrame(res, columns=['id1', 'id2', 'similarity'])
    return item_sim_df

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

def list_product(cur, list_product_id):
    cur.execute("""SELECT ProductId, Name, InStock, BasePrice, Description FROM whatseat.products WHERE ProductId IN %s""",(tuple(list_product_id),))
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['productId','name','inStock','basePrice','description'])

def list_recipents(cur, list_recipents_id):
    cur.execute("""SELECT RecipeId, Name, TotalTime, TotalView, totalLike, ThumbnailUrl FROM whatseat.recipes WHERE RecipeId IN %s""",(tuple(list_recipents_id),))
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['recipeId','name','totalTime','totalView','totalLike','images'])

#get list recipe by index
def get_list_recipents_by_index(cur, list_recipents_id):
    cur.execute("""SELECT re.RecipeId, re.Name, re.TotalTime, re.TotalView, re.totalLike, re.ThumbnailUrl, re.Calories/re.Serving as Calo FROM whatseat.recipes re
     WHERE re.RecipeId IN %s""",(tuple(list_recipents_id),))
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['recipeId','name','totalTime','totalView','totalLike','images','calories'])

def product_recommendation(cur):
    cur.execute("""SELECT id_user, id_movie, (is_clicked + shop_rating)/2 FROM testdb.interactive""")
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id_user', 'id_movie', 'rating'])
    return click_df

#get interactive recipe
def interactive_food(cur,recipeTypeId):
    cur.execute("""SELECT review.CustomerId, review.RecipeId, review.Rating 
                        FROM whatseat.recipereviews review
                        JOIN whatseat.reciperecipetypes re ON review.RecipeId = re.RecipeId
                        Where re.RecipeTypeId = %s""",(recipeTypeId,))
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id_user', 'id_food', 'rating'])
    return click_df

#get list top recipe by total like
def get_top_recipe(cur, user_kcal,n_recipe):
    cur.execute("""SELECT RecipeId, (Calories/Serving) as Calo FROM whatseat.recipes Where Calo <= %s
     Order By totalLike desc LIMIT %s""",(user_kcal,n_recipe,))
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id','calories'])
    return click_df

#get list top product by total sell
def get_top_products(cur, n_product):
    cur.execute("""SELECT ProductId, Name, InStock, BasePrice,PhotoJson,WeightServing, TotalSell FROM whatseat.products 
     Order By TotalSell desc LIMIT %s""",(n_product,))
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id','name','inStock','basePrice','images','weightServing','totalSell'])
    return click_df

#get list recipe id love by user
def recipe_love_by_user(cur, id_user):
    cur.execute("""SELECT CustomerId ,GROUP_CONCAT(RecipeNo) FROM whatseat.lovedrecipes IR
    JOIN whatseat.recipes R ON IR.RecipeId = R.RecipeId WHERE CustomerId = %s """,(id_user,))
    res = cur.fetchall()
    print('res',res)
    res = res[0][1]
    ids = []
    if(res != None):
        ids = res.split(',')
        ids = [int(s) for s in ids]
    return ids

#get list product id love by user
def product_love_by_user(cur, id_user):
    cur.execute("""SELECT CustomerId ,GROUP_CONCAT(ProductNo) FROM whatseat.lovedproducts IP
    JOIN whatseat.products P ON IP.ProductId = P.ProductId WHERE CustomerId = %s """,(id_user,))
    res = cur.fetchall()
    print('res',res)
    res = res[0][1]
    ids = []
    if(res != None):
        ids = res.split(',')
        ids = [int(s) for s in ids]
    return ids

#filter by low price
def get_top_product_low_price(cur,list_product_id):
    cur.execute("""SELECT ProductId, Name, InStock, BasePrice,PhotoJson,WeightServing, TotalSell from
    whatseat.products where ProductId IN %s ORDER BY BasePrice ASC LIMIT 12""",(tuple(list_product_id),))
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['productId','name','inStock','basePrice','images','weightServing','totalSell'])

#get product with apriori
def get_product_priori(cur,list_product_id):
    cur.execute("""SELECT consequents FROM whatseat.apriori
    WHERE confidence >= 0.5 AND antecedents LIKE %s""",(list_product_id,))
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['consequents'])

#get product by list id
def get_product_by_list_id(cur,list_product_id):
    cur.execute("""SELECT ProductId, Name, InStock, BasePrice,PhotoJson,WeightServing, TotalSell from
    whatseat.products where ProductId IN %s""",(tuple(list_product_id),))
    res = cur.fetchall()
    return pd.DataFrame(res,columns=['productId','name','inStock','basePrice','images','weightServing','totalSell'])
#get recommend list recipe cb
def get_recommend_list_cb(id_user,user_kcal,n_recipe,cur):
    cur.execute("""SELECT CB.RecipeId , CB.CustomerId, CB.Similarity, R.Calories/R.Serving as Calo 
    from whatseat.cb_similarity CB
    JOIN whatseat.recipes R ON CB.RecipeId = R.RecipeId 
    Where CB.CustomerId LIKE %s AND Calo <= %s 
    ORDER BY CB.Similarity DESC LIMIT %s""",(id_user,user_kcal,n_recipe),)
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['id1','id2','similarity','calo'])
#get recommend list product cb
def get_recommend_list_product_cb(id_user,n_product,cur):
    cur.execute("""SELECT ProductId, CustomerId, Similarity from whatseat.cb_product_similarity 
    where CustomerId LIKE %s ORDER BY Similarity DESC LIMIT %s""",(id_user,n_product))
    res = cur.fetchall()
    return pd.DataFrame(res, columns=['id1','id2','similarity'])