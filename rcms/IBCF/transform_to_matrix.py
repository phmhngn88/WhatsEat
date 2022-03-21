import pandas as pd
import numpy as np
from pandas import compat 

def to_dict_dropna(data):
  return dict((k, v.dropna().to_dict()) for k, v in compat.iteritems(data))

raw_data={'A':{1:2,2:3,3:4},'B':{1:np.nan,2:44,3:np.nan}}
data=pd.DataFrame(raw_data)

dict=to_dict_dropna(data)