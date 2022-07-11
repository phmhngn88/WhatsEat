import flask
from flask import request, jsonify, abort
from flask_mysqldb import MySQL
from flask_cors import CORS
from sqlalchemy import true
import fetch_data
import utils
from math import isnan
import KRNN_recommend_engine
app = flask.Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_PORT'] = None
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '11111111'
app.config['MYSQL_DB'] = 'whatseat'
app.config['JSON_AS_ASCII'] = False

mysql = MySQL(app)

@app.route('/', methods=['GET'])
def home():
    return """<h1>What's eat recommend engine</h1>
              <p>This site is APIs for getting list of recommend products.</p>"""

def individual_recommend_list_recipes(id_user, user_kcal, n_recipe,page,level,mintime,maxtime,allergy):
    cur = mysql.connection.cursor()
    rec_ids, is_newuser, is_notlove, is_build = utils.check_new_user(cur, id_user)
    if is_newuser:
        if is_notlove == 0 or is_build == 0:
            print("New user with filter!")
            rec_list = fetch_data.get_top_recipe(cur,user_kcal,n_recipe,page,level,mintime,maxtime,allergy)['id'].to_list()
            cur.close()
        else:    
            print("New user detected!")
            rec_list = fetch_data.get_recommend_list_cb(id_user,user_kcal,n_recipe,page,cur,level,mintime,maxtime,allergy)['id1'].to_list()
            cur.close()    

    cur = mysql.connection.cursor()
    print(rec_list)
    rec_list2 = fetch_data.get_list_recipents_by_index(cur,rec_list)
    cur.close()
    rec_list2['images'] = rec_list2['images'].apply(utils.to_json)
    return rec_list2

def individual_recommend_list_products(id_user, n_product):
    cur = mysql.connection.cursor()
    rec_ids, is_newuser, is_notlove = utils.check_new_user_product(cur, id_user)

    if is_newuser:
        if is_notlove == 0:
            print("New user with filter!")
            rec_list = []
            rec_list = fetch_data.get_top_products(cur,n_product)['id'].to_list()
            cur.close()
        else:    
            print("New user detected!")
            rec_list = []
            rec_list = fetch_data.get_recommend_list_product_cb(id_user,n_product,cur)['id1'].to_list()
            cur.close()

    cur = mysql.connection.cursor()
    rec_list2 = fetch_data.get_top_product_low_price(cur,rec_list)
    cur.close()
    print(rec_list2)
    rec_list2['images'] = rec_list2['images'].apply(utils.to_json_product)
    return rec_list2

@app.route('/individual/product/', methods=['GET'])
def individual_state1_api():
    if 'id_user' in request.args:
        id_user = request.args['id_user']
        n_product = int(request.args['n_product'])

    else:
        return """Error: No id field provided. Please specify an id.
                (URL: /individual/product?id_user= ...&n_product=...)
                """
    
    rec_list = individual_recommend_list_products(id_user,n_product)
    print(rec_list)
    return jsonify(rec_list.to_dict('records'))

#Recommend recipe 
@app.route('/individual/recipe/', methods=['GET'])
def individual_recipe_api():
    if 'id_user' in request.args:
        id_user = request.args['id_user']
        user_kcal = float(request.args['user_kcal'])
        n_recipe = int(request.args['n_recipe'])
        page = int(request.args['page'])
        level = request.args['level']
        mintime = int(request.args['mintime'])
        maxtime = int(request.args['maxtime'])
        allergy = request.args['allergy']
    else:
        return """Error: No id field provided. Please specify an id.
                (URL: /individual/recipe?id_user=...&user_kcal=...&n_recipe=...&page=...&level=...&mintime=...&maxtime...&allergy=...)
                """
    
    rec_list = individual_recommend_list_recipes(id_user,user_kcal,n_recipe,page,level,mintime,maxtime,allergy)
    print(rec_list)
    return jsonify(rec_list.to_dict('records'))

@app.route('/individual/product/apriori', methods=['GET'])
def individual_product_apriori():
    if 'id_product' in request.args:
        list_product = request.args.getlist('id_product')
    else:
        abort(500,'{"message":"Error: No id field provided. Please specify an id.(URL: /individual/product/apriori?id_product= ... &id_product= ...)"}')
        
    list_product = list(map(int, list_product))
    list_product = utils.list_to_string(sorted(list_product))
    cur = mysql.connection.cursor()
    
    print('number',list_product)
    result = fetch_data.get_product_priori(cur, list_product)
    if result.index.stop <=0 :
        abort(500,'{"message":"Error: No products is recommneded ')
    result = result.drop_duplicates()
    result = fetch_data.get_product_by_list_id(cur,result['consequents'].to_list())
    cur.close()
    result['images'] = result['images'].apply(utils.to_json_product)
    return jsonify(result.to_dict('record'))

@app.route('/individual/recipe/apriori', methods=['GET'])
def individual_recipe_apriori():
    if 'id_recipe' in request.args:
        list_recipe = request.args.getlist('id_recipe')
    else:
        abort(500,'{"message":"Error: No id field provided. Please specify an id.(URL: /individual/product/apriori?id_product= ... &id_product= ...)"}')
        
    list_recipe = list(map(int, list_recipe))
    list_recipe = utils.list_to_string(sorted(list_recipe))
    cur = mysql.connection.cursor()
    
    result = fetch_data.get_recipe_priori(cur, list_recipe)
    print(result)
    if result.index.stop <=0 :
        abort(500,'{"message":"Error: No products is recommneded ')
    result = result.drop_duplicates()
    result = fetch_data.get_list_recipents_by_index(cur,result['consequents'].to_list())
    cur.close()
    result['images'] = result['images'].apply(utils.to_json)
    return jsonify(result.to_dict('record'))

@app.route('/individual/product/ib',methods=['GET'])
def individual_product_ib():
    if 'id_user' in request.args:
        id_user = request.args['id_user']
    else:
        return """Error: No id field provided. Please specify an id.
                (URL: /individual/product?id_user= ...&n_product=...)
                """
    rec_list = []
    for rating ,id_product in individual_item_based(id_user):
        if(rating >= 3):
            rec_list.append(id_product)

    cur = mysql.connection.cursor()
    rec_list2 = fetch_data.get_top_product_low_price(cur,rec_list)
    cur.close()
    rec_list2['images'] = rec_list2['images'].apply(utils.to_json_product)
    return jsonify(rec_list2.to_dict('records'))

def individual_item_based(id_user):
    cur = mysql.connection.cursor()
    print("Old user detected!")
    ratings = fetch_data.get_product_review(cur)
    sim_df= fetch_data.similarity_item_df(cur)

    #get matrix data 
    data = ratings.pivot_table(index=['ProductId'],columns=['CustomerId'],values='Rating')

    #convert to dictionary
    sdd = data.dropna(how = 'all').to_dict()
    clean_dict = {k: {j: sdd[k][j] for j in sdd[k] if not isnan(sdd[k][j])} for k in sdd}

    dataset = clean_dict

    return KRNN_recommend_engine.recommendation_phase(id_user,dataset,sim_df)

app.run(debug=true)