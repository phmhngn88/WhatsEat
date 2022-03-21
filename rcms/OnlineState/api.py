from operator import is_
from numpy import rec
import pandas as pd
import flask
from flask import request, jsonify
from flask_mysqldb import MySQL
import time
from flask_cors import CORS
import fetch_data
import json
import utils
from math import isnan
import sim
import cold_start_KNN_genre
import KRNN_recommend_engine

app = flask.Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_PORT'] = None
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '11111111'
app.config['MYSQL_DB'] = 'testdb'

mysql = MySQL(app)

@app.route('/', methods=['GET'])
def home():
    return """<h1>What's eat recommend engine</h1>
              <p>This site is APIs for getting list of recommend products.</p>"""


def individual_recommend_list_state1(id_user):
    #connect to db
    cur = mysql.connection.cursor()
    rating_data = fetch_data.product_recommendation(cur)
    rating_data.dropna()
    cur.close()

    #get matrix data 
    data = rating_data.pivot_table(index='id_movie',columns='id_user',values='rating')

    #convert to dictionary
    sdd = data.dropna(how = 'all').to_dict()
    clean_dict = {k: {j: sdd[k][j] for j in sdd[k] if not isnan(sdd[k][j])} for k in sdd}

    #get list recommend
    tp = int(id_user)
    list_item = []
    if tp in clean_dict.keys():
        a=sim.recommendation_phase(clean_dict,tp)
        if a != -1:
            print("Recommendation Using Item based Collaborative Filtering:  ")
            for w,m in a:
                print(m)
                list_item.append(m)
    else:
        print("Person not found in the dataset..please try again")
        
    return list_item

def individual_recommend_list_food(id_user,id_category):
    #connect to db
    cur = mysql.connection.cursor()
    rating_data = fetch_data.interactive_food(cur,id_category)
    rating_data.dropna()
    cur.close()

    #get matrix data 
    data = rating_data.pivot_table(index='id_food',columns='id_user',values='rating')

    #convert to dictionary
    sdd = data.dropna(how = 'all').to_dict()
    clean_dict = {k: {j: sdd[k][j] for j in sdd[k] if not isnan(sdd[k][j])} for k in sdd}

    #get list recommend
    tp = int(id_user)
    list_item = []
    if tp in clean_dict.keys():
        a=sim.recommendation_phase(clean_dict,tp)
        if a != -1:
            print("Recommendation Using Item based Collaborative Filtering:  ")
            for w,m in a:
                print(m)
                list_item.append(m)
    else:
        print("Person not found in the dataset..please try again")
        
    return list_item

@app.route('/individual/state1/', methods=['GET'])
def individual_state1_api():
    if 'id_user' in request.args:
        id_user = int(request.args['id_user'])
    else:
        return """Error: No id field provided. Please specify an id.
                (URL: /individual/state1?id_user= ...)
                """
    
    rec_list = individual_recommend_list_state1(id_user)
    
    return jsonify(rec_list)

@app.route('/individual/food/', methods=['GET'])
def individual_food_api():
    if 'id_user' in request.args:
        id_user = int(request.args['id_user'])
    else:
        return """Error: No id field provided. Please specify an id.
                (URL: /individual/food?id_user= ...)
                """
    
    rec_list = individual_recommend_list_food(id_user,1)
    
    return jsonify(rec_list)

def individual_recommend_list_state2(id_user, n_movie):
    # cur = mysql.connection.cursor()
    # mov_ids = fetch_data.movie_watched_by_user(cur,id_user)
    # cur.close()

    cur = mysql.connection.cursor()
    mov_ids, is_newuser = utils.check_new_user(cur, id_user)
    # if is_newuser:
    #     print("New user detected!")
    #     rec_list, rec_list_w_score = cold_start_KNN_genre.get_recommend_list(mov_ids,n_movie,cur)
    #     rec_df = pd.DataFrame({'Item':rec_list})
    #     rec_df['Rating'] = 0
    #     cur.close()
    # else:
    print("Old user detected!")
    click_df = fetch_data.rating_love_df(cur)
    sim_df = fetch_data.similarity_df2(cur,id_user)
    cur.close()
    rec_df, rec_list = KRNN_recommend_engine.recommend_sys(id_user, n_movie, click_df, sim_df)
    
    return rec_df, rec_list


# Individual state 1 api: cold-start algorithm for new users and KRNN algorithm for old users
@app.route('/individual/state2/', methods=['GET'])
def individual_state2_api():
    if 'id_user' and 'n_movie' in request.args:
        id_user = int(request.args['id_user'])
        n_movie = int(request.args['n_movie'])
    else:
        return """Error: No id field provided. Please specify an id.
                (URL: /individual/state2?id_user= ... &n_movie= ...)
                """
    
    results_with_sim, rec_list = individual_recommend_list_state2(id_user,n_movie)
    result = utils.display_results(mysql, rec_list)
    
    return jsonify(result)


app.run(debug=True)
