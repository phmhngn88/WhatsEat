import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from mlxtend.frequent_patterns import apriori, association_rules
import MySQLdb
import fetch
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import association_rules, apriori

conn = MySQLdb.connect(host="127.0.0.1", user="root", passwd="11111111", db="whatseat")
cur = conn.cursor()

#lấy dataframe món ăn
transaction_df = fetch.transaction_df(cur)
transaction_df.drop(transaction_df[transaction_df['ProductId']=='None'].index,inplace=True)


cur.close()

transaction_list = []

for i in transaction_df["OrderId"].unique():
    tlist = list(set(transaction_df[transaction_df["OrderId"]==i]["ProductId"]))
    if len(tlist) > 0:
        transaction_list.append(tlist)

print(len(transaction_list))

te = TransactionEncoder()
te_ary = te.fit(transaction_list).transform(transaction_list)
df2 = pd.DataFrame(te_ary,columns = te.columns_)

frequent_itemsets = apriori(df2, min_support=0.01,use_colnames=True)
rules = association_rules(frequent_itemsets,metric='lift',min_threshold=1.0)
frequent_itemsets['length'] = frequent_itemsets['itemsets'].apply(lambda x: len(x))

rules.sort_values('confidence', ascending = False)