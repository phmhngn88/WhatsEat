import pandas as pd

def get_recpie_review(cur):
    cur.execute("""SELECT  CustomerId, RecipeId, Rating FROM whatseat.recipereviews""")
    res = cur.fetchall()
    data = pd.DataFrame(res, columns=['CustomerId','RecipeId','Rating'])
    return data