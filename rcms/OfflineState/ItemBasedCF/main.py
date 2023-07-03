#import sklearn library
import os
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import MySQLdb
import fetch
import sim
from math import isnan


def main():
    conn = MySQLdb.connect(host=os.environ.get('MYSQL_HOST'), user="admin", passwd="11111111", db="whatseat")
    cur = conn.cursor()
    ratings = fetch.recipe_ratings(cur)
    ratings.dropna()

    #get matrix data 
    data = ratings.pivot_table(index=['RecipeId'],columns=['CustomerId'],values='Rating')

    #convert to dictionary
    sdd = data.dropna(how = 'all').to_dict()
    clean_dict = {k: {j: sdd[k][j] for j in sdd[k] if not isnan(sdd[k][j])} for k in sdd}

    dataset = clean_dict

    sim.item_similarity(conn,dataset)

if __name__ == "__main__":
    main()