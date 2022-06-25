
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