from collections import Counter
from sklearn.metrics.pairwise import cosine_similarity
import fetch_data

# genre_df: fetch all movie's genre data from database and transform to 
# dataframe of genres where each genre is one column 
def genre_df(cur):
    # fetch genre data from the database
    genre_df = fetch_data.genre_recipe(cur) # genre_df: 2 columns(id, genres)
    # split genres column to make each genre one column
    genre_df['genres'] = genre_df['genres'].apply(lambda x: x.split(","))
    genres_counts = Counter(g for genres in genre_df['genres'] for g in genres)
    genres = list(genres_counts.keys())

    for g in genres:
        genre_df[g] = genre_df['genres'].transform(lambda x: int(g in x))
    return genre_df[genres]

# get_content_based_recommendations: find K-nearest recipe of input recipes using cosine similarity
def get_content_based_recommendations(recipe_ids,cosine_sim, n_recommendations=10):
    # Collect cosine similarity score of all input recipe ids
    sim_scores = []
    for i in range(len(recipe_ids)):
        tmp = list(enumerate(cosine_sim[recipe_ids[i]]))
        sim_scores.extend(tmp)
    # print(sim_scores)
    # Sort to find highest scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores_list = sim_scores[1:(len(sim_scores)+1)]
    sim_scores = sim_scores[1:(n_recommendations+1)]
    similar_recipes = [i[0] for i in sim_scores]
    return similar_recipes, sim_scores_list

# get_recommend_list: main function (apply algorithm above): for easy calling purpose
def get_recommend_list(list_item_ids,n_recommendations, cur):
    cosine_sim_mtrx = cosine_similarity(genre_df(cur))
    res, res_w_score = get_content_based_recommendations(list_item_ids, cosine_sim_mtrx, n_recommendations)
    return res, res_w_score
