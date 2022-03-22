#import sklearn library
from re import T
import numpy as np
import pandas as pd
import fetch
import MySQLdb
from math import isnan
import sim

dataset = {
    'Rahul': {'Special Ops': 5,
              'Criminal Justice': 3,
              'Panchayat': 3,
              'Sacred Games': 3,
              'Apharan': 2,
              'Mirzapur': 3},

    'Rishabh': {'Special Ops': 5,
                'Criminal Justice': 3,
                'Sacred Games': 5,
                'Panchayat': 5,
                'Mirzapur': 3,
                'Apharan': 3},

    'Sonali': {'Special Ops': 2,
               'Panchayat': 5,
               'Sacred Games': 3,
               'Mirzapur': 4},

    'Ritvik': {'Panchayat': 5,
               'Mirzapur': 4,
               'Sacred Games': 4, },

    'Harshita': {'Special Ops': 4,
                 'Criminal Justice': 4,
                 'Panchayat': 4,
                 'Mirzapur': 3,
                 'Apharan': 2},

    'Shubhi': {'Special Ops': 3,
               'Panchayat': 4,
               'Mirzapur': 3,
               'Sacred Games': 5,
               'Apharan': 3},

    'Shaurya': {'Panchayat': 4,
                'Apharan': 1,
                'Sacred Games': 4}}
conn = MySQLdb.connect(host="127.0.0.1", user="root", passwd="11111111", db="testdb")
cur = conn.cursor()

rating_data = fetch.rating_click_df(cur)
rating_data.dropna()
cur.close()

#get matrix data 
data = rating_data.pivot_table(index='id_movie',columns='id_user',values='rating')

#convert to dictionary
sdd = data.dropna(how = 'all').to_dict()
clean_dict = {k: {j: sdd[k][j] for j in sdd[k] if not isnan(sdd[k][j])} for k in sdd}

# print(clean_dict)
# def to_dict_dropna(data):
#   return dict((k, v.dropna().to_dict()) for k, v in compat.items(data))

# dict = to_dict_dropna(data)
# print(dict)
# print("Cosine Similarity:",sim.item_similarity(clean_dict,3,5))

# print(sim.most_similar_items(clean_dict,"3"))

unseen_movies,seen_movies=sim.target_movies_to_users(clean_dict,1)

dct = {"Unseen Movies":unseen_movies,"Seen Movies":seen_movies}
# pd.DataFrame(dct)


print("Enter the target person")
tp = input().title()
tp = int(tp)
if tp in clean_dict.keys():
    a=sim.recommendation_phase(clean_dict,tp)
    if a != -1:
        print("Recommendation Using Item based Collaborative Filtering:  ")
        # for w,m in a:
        #     print(m," ---> ",w)
        print(a)
else:
    print("Person not found in the dataset..please try again")