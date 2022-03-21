from random import triangular
import pandas as pd
import numpy as np

def rating_click_df(cur):
    cur.execute("""SELECT id_user, id_movie, (is_clicked + shop_rating)/2 FROM testdb.interactive""")
    res = cur.fetchall()
    click_df = pd.DataFrame(res, columns=['id_user', 'id_movie', 'rating'])
    return click_df
