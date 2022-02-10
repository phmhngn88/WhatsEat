import pyodbc
print(pyodbc.drivers())
conn = pyodbc.connect('Driver={SQL Server Native Client 11.0};'
                      'Server=DESKTOP-QEN4LJI;'
                      'Database= movie;'
                      'UID=hh;'
                      'PWD= 123456;')

cursor = conn.cursor()
cursor.execute('SELECT * FROM rating')
for i in cursor:
    print(i)
