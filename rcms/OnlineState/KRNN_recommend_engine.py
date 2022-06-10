import pandas as pd
import utils
from sklearn.neighbors import NearestNeighbors

#Hàm trả về danh sách item tư vấn cho người dùng
#Input: 
#user - id người dùng đang xét, N - số lượng item, training_df - file training, sim_path - đường dẫn thư mục độ tương đồng
#Output:
#Danh sách N item tư vấn cho người dùng
def recommend_sys(user, N, training_df, user_df):
    item_col=[]
    rating_col=[]

    # start = time.time()
    #Lấy ra độ tương đồng của người dùng 
    #user_df = pd.read_excel(r"{0}/{1}.xlsx".format(sim_path, user))
    ratings = utils.convert_data_to_array(training_df)
    #các item của người dùng có đánh giá tính cực
    #user_item = training_df.id_movie[training_df.id_user == user][training_df.rating == 1].to_list()

    #danh sách các item cần dự đoán
    #predict_list = [value for value in range(1,3953) if value not in user_item]
    predict_list = utils.find_candidate_items(ratings, [user])
    # end = time.time()
    # print("elapse time 1: ", end-start)
    
    # start = time.time()
    #vòng lặp item
    for j in predict_list:
        #Danh sách những người dùng có đánh giá item j  
        user_j = training_df.id_user[training_df.id_movie == j].to_list()

        #Tổng sim 10 người dùng (l = 10) có đánh giá tới item j và có độ tương đồng lớn nhất
        sum_sim = sum(user_df.similarity[user_df.id_user_2.isin(user_j) == True][:10].to_list())

        #thêm id item j vào cột item
        item_col.append(j)

        #Thêm sim vào cột đánh giá
        rating_col.append(sum_sim)
        
    # end = time.time()
    # print("elapse time 1: ", end-start)

    #Tạo dataframe từ cột item và cột đánh giá
    df = pd.DataFrame(data={'Item':item_col,'Rating':rating_col})

    #Sắp xếp đánh giá dự đoán theo giá trị đánh giá
    df = df.sort_values(by=['Rating'],axis=0,ascending=False, ignore_index=True)

    #Lấy danh sách item từ 1 tới N
    df =  df.iloc[:N]

    #Trả về danh sách N item 
    return df, df['Item'].to_list()


def unique_items(dataset):
    unique_items_list = []
    for person in dataset.keys():
        for items in dataset[person]:
            unique_items_list.append(items)
    s=set(unique_items_list)
    unique_items_list=list(s)
    return unique_items_list

def target_movies_to_users(target_person,dataset):
    target_person_movie_lst = []
    unique_list =unique_items(dataset)
    for movies in dataset[target_person]:
        target_person_movie_lst.append(movies)

    s=set(unique_list)
    recommended_movies=list(s.difference(target_person_movie_lst))
    a = len(recommended_movies)
    if a == 0:
        return 0
    return recommended_movies,target_person_movie_lst

def recommendation_phase(target_person,dataset,sim_df):
    if target_movies_to_users(target_person=target_person,dataset=dataset) == 0:
        print(target_person, "has seen all the movies")
        return -1
    not_seen_movies,seen_movies=target_movies_to_users(target_person=target_person,dataset=dataset)
    seen_ratings = [[dataset[target_person][movies],movies] for movies in dataset[target_person]]
    weighted_avg,weighted_sim = 0,0
    rankings =[]
    for i in not_seen_movies:
        for rate,movie in seen_ratings:
            item_sim =sim_df[(sim_df['id1']==i)&(sim_df['id2']==movie)].similarity.values[0]
            weighted_avg +=(item_sim*rate)
            weighted_sim +=item_sim
            print(i,movie,weighted_sim)
        if weighted_sim != 0:
            weighted_rank=weighted_avg/weighted_sim
            rankings.append([weighted_rank,i])

    rankings.sort(reverse=True)
    return rankings