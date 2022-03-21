from sklearn.metrics.pairwise import cosine_similarity

def item_similarity(dataset,item1,item2):
    both_rated = {}
    for person in dataset.keys():
        if item1 in dataset[person] and item2 in dataset[person]: # vòng lặp lấy ra lần lượt 2 items bất kỳ
            both_rated[person] = [dataset[person][item1],dataset[person][item2]] # danh sách người dùng đều đã đánh giá cả 2 item này

   # print(both_rated)
    number_of_ratings = len(both_rated) # số lượng người dùng đều đã đánh giá 2 item này
    if number_of_ratings == 0:
        return 0
    # danh sách các điểm đánh giá của tất cả người dùng trong hệ thống đã từng đánh giá item1
    item1_ratings = [[dataset[k][item1] for k,v in both_rated.items() if item1 in dataset[k] and item2 in dataset[k]]]
    # danh sách các điểm đánh giá của tất cả người dùng trong hệ thống đã từng đánh giá item2
    item2_ratings = [[dataset[k][item2] for k, v in both_rated.items() if item1 in dataset[k] and item2 in dataset[k]]]
    #print("{} ratings :: {}".format(item1,item1_ratings))
    #print("{} ratings :: {}".format(item2,item2_ratings))
    # sử dụng consine_similarity để tính độ tương đồng của 2 item
    cs = cosine_similarity(item1_ratings,item2_ratings)
    return cs[0][0]

def unique_items(dataset):
    unique_items_list = []
    for person in dataset.keys():
        for items in dataset[person]:
            unique_items_list.append(items)
    s=set(unique_items_list)
    unique_items_list=list(s)
    return unique_items_list

def most_similar_items(dataset,target_item):
    un_lst=unique_items(dataset)
    scores = [(item_similarity(dataset,target_item,other_item),target_item+" --> "+other_item) for other_item in un_lst if other_item!=target_item]
    scores.sort(reverse=True)
    return scores

def target_movies_to_users(dataset,target_person):
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

def recommendation_phase(dataset,target_person):
    if target_movies_to_users(dataset,target_person=target_person) == 0:
        print(target_person, "has seen all the movies")
        return -1
    not_seen_movies,seen_movies=target_movies_to_users(dataset,target_person=target_person)
    seen_ratings = [[dataset[target_person][movies],movies] for movies in dataset[target_person]]
    weighted_avg,weighted_sim = 0,0
    rankings =[]
    for i in not_seen_movies:
        for rate,movie in seen_ratings:
            item_sim=item_similarity(dataset,i,movie)# tính độ tương đồng giữa item cần dự đoán và item đã được rating
            weighted_avg +=(item_sim*rate)
            weighted_sim +=item_sim
        weighted_rank=weighted_avg/weighted_sim # dự đoán giá trị rating theo công thức 2.20 slide tham khảo đồ án tốt nghiệp
        rankings.append([weighted_rank,i])

    rankings.sort(reverse=True)
    return rankings