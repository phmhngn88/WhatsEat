from random import triangular
import pandas as pd
import numpy as np

def recipes_df(cur):
    cur.execute("""SELECT RecipeId, Name, Description FROM whatseat.recipes""")
    res = cur.fetchall()
    data = pd.DataFrame(res, columns=['RecipeId', 'Name', 'Description'])
    return data

#Get genre of recipe
def genre_recipe(cur):
    cur.execute("""SELECT reType.RecipeId, group_concat( type.Name)
                    FROM whatseat.reciperecipetypes reType
                    JOIN whatseat.recipetypes type ON reType.RecipeTypeId = type.RecipeTypeId
                    group by reType.RecipeId LIMIT 1000""")
    res = cur.fetchall()
    recipes = pd.DataFrame(res, columns=['id','genres'])
    return recipes

#Get genre of product
def genre_product(cur):
    cur.execute("""SELECT P.ProductId, group_concat(PC.Name)
                    FROM whatseat.products P
                    JOIN whatseat.productcategories PC ON P.ProductCategoryId = PC.ProductCategoryId
                    group by P.ProductId LIMIT 1000""")
    res = cur.fetchall()
    recipes = pd.DataFrame(res, columns=['id','genres'])
    return recipes