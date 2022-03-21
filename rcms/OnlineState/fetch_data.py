from random import triangular
import pandas as pd
import numpy as np

# rarting_click_df fuction: fetch user's click data from database
# Input: mysql cursor
# Output: pandas dataframe of clicks data with three columns: id_user, id_movie, rating
def rating_click_df(cur):
    cur.execute("""SELECT id_user, id_movie, is_clicked FROM testdb.interactive""")
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id_user', 'id_movie', 'rating'])
    return click_df

def rating_love_df(cur):
    cur.execute("""SELECT id_user, id_food, is_love FROM testdb.interactive_food""")
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id_user', 'id_food', 'rating'])
    return click_df

# similarity_df function: fetch user-user similarity data from database
# Input: 
# + cur: mysql cursor
# + user_id: id of user
# Output:
# + dataframe of similarity score with two columns: 
#       - id_user_2: ids of users that are similarity calculated with input user_id
#       - similarity: similarity score
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



def product_recommendation(cur):
    cur.execute("""SELECT id_user, id_movie, (is_clicked + shop_rating)/2 FROM testdb.interactive""")
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id_user', 'id_movie', 'rating'])
    return click_df

def interactive_food(cur,recipeTypeId):
    cur.execute("""SELECT id_user, id_food, is_love 
                        FROM testdb.interactive_food iFood
                        JOIN whatseat.recipes re ON iFood.id_food = re.RecipeId
                        where re.RecipeTypeId = %s""",(recipeTypeId,))
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id_user', 'id_food', 'rating'])
    return click_df

def movie_watched_by_user(cur, id_user):
    cur.execute("""SELECT id_user ,GROUP_CONCAT(id_food) FROM testdb.interactive_food WHERE id_user = %s AND is_love <> 0""",(id_user,))
    res = cur.fetchall()

    res = res[0][1]
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