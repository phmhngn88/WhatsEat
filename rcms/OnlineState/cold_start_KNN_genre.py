from collections import Counter
from sklearn.metrics.pairwise import cosine_similarity
import fetch_data

# get_content_based_recommendations: find K-nearest recipe of input recipes using cosine similarity
def get_content_based_recommendations(recipe_ids,cosine_sim, n_recommendations=10):
    # Collect cosine similarity score of all input recipe ids
    sim_scores = []
    for i in range(len(recipe_ids)):
        tmp = list(enumerate(cosine_sim[recipe_ids[i]]))
        sim_scores.extend(tmp)
    # Sort to find highest scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores_list = sim_scores[1:(len(sim_scores)+1)]
    sim_scores = sim_scores[1:(n_recommendations+1)]
    similar_recipes = [i[0] for i in sim_scores]
    return similar_recipes, sim_scores_list

# get_recommend_list: main function (apply algorithm above): for easy calling purpose
def get_recommend_list(list_item_ids,n_recommendations, cur):
    # fetch matrix from offline state
    cosine_sim_mtrx = fetch_data.get_cosine_sim_matrix(cur).pivot_table(index='id1',columns='id2',values='similarity')
    res, res_w_score = get_content_based_recommendations(list_item_ids, cosine_sim_mtrx, n_recommendations)
    return res, res_w_score

def get_recommend_list_product(list_item_ids,n_recommendations, cur):
    # fetch matrix from offline state
    cosine_sim_mtrx = fetch_data.get_cosine_sim_matrix_product(cur).pivot_table(index='id1',columns='id2',values='similarity')
    res, res_w_score = get_content_based_recommendations(list_item_ids, cosine_sim_mtrx, n_recommendations)
    return res, res_w_score