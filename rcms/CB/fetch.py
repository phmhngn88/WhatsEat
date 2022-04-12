from random import triangular
import pandas as pd
import numpy as np

def recipes_df(cur):
    cur.execute("""SELECT RecipeId, Name, Description FROM whatseat.recipes""")
    res = cur.fetchall()
    data = pd.DataFrame(res, columns=['RecipeId', 'Name', 'Description'])
    return data
