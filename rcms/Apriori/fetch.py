import pandas as pd

def transaction_df(cur):
    cur.execute("""SELECT OrderId, ProductId FROM whatseat.orderdetails""")
    res = cur.fetchall()
    data = pd.DataFrame(res, columns=['OrderId', 'ProductId'])
    return data
