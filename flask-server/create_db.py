import mysql.connector

mydb = mysql.connector.connect(
    host = "sql6.freesqldatabase.com",
    user = "sql6588183",
    passwd = "NjqHuVi4ee"
)

my_cursor = mydb.cursor()

# my_cursor.execute("CREATE DATABASE sql6588183")

for db in my_cursor:
    print(db)