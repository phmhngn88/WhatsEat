from bs4 import BeautifulSoup
import MySQLdb
import fetch
from collections import Counter
def remove(html):
    return BeautifulSoup(html,features="html.parser").get_text()

def convertDataframeToList(dataframe):
    L = []
    for col in dataframe.columns:
        for idx in dataframe.index:
            value = dataframe.loc[idx, col]
            column, row = col, idx
            L.append([column,row,value])
    return L

def upsert(conn, table, fields, object_list):
    cursor = conn.cursor()
    table = "`"+table+"`"
    fields = ["`"+field+"`" for field in tuple(fields)]
    placeholders = ["%s" for field in fields]
    assignments = ["{x} = VALUES({x})".format(
        x=x
    ) for x in fields]

    query_string = """INSERT INTO
    {table}
    ({fields})
    VALUES
    ({placeholders})
    ON DUPLICATE KEY UPDATE {assignments}""".format(
                                                    table=table,
                                                    fields=", ".join(fields),
                                                    placeholders=", ".join(placeholders),
                                                    assignments=", ".join(assignments)
                                                    )
    
    cursor.executemany(query_string, object_list)
    conn.commit()
    print(table + ' upserts successfully')

def genre_df(cur,type):
    # fetch genre data from the database
    
    if(type == "recipe"):
        genre_df = fetch.genre_recipe(cur) # genre_df: 2 columns(id, genres)
    else:
        genre_df = fetch.genre_product(cur)
    # split genres column to make each genre one column
    genre_df['genres'] = genre_df['genres'].apply(lambda x: x.split(","))
    genres_counts = Counter(g for genres in genre_df['genres'] for g in genres)
    genres = list(genres_counts.keys())

    for g in genres:
        genre_df[g] = genre_df['genres'].transform(lambda x: int(g in x))
    print(genre_df[genres])
    return genre_df[genres]