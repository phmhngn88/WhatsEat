import pandas as pd

def transaction_df(cur):
    cur.execute("""SELECT OrderId, ProductId FROM whatseat.OrderDetails""")
    res = cur.fetchall()
    data = pd.DataFrame(res, columns=['OrderId', 'ProductId'])
    return data

def menu_df(cur):
    cur.execute("""SELECT MenuId, RecipeId FROM whatseat.MenuDetails""")
    res = cur.fetchall()
    data = pd.DataFrame(res, columns=['MenuId', 'RecipeId'])
    return data

def convert_frozenset(frozenset):
    items = list(frozenset)
    items = sorted(items)
    if len(items) > 1:
        return (' '.join(str(e) for e in items))
    
    return str(items[0])
    
    