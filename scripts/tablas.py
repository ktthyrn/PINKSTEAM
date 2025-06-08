import pyodbc
from prettytable import PrettyTable
print("Base de datos de Pink Steam")
try:
    connection=pyodbc.connect('DRIVER={SQL Server};SERVER=KATTYS-LAPTOP;DATABASE=PinkSteamDB;UID=KATTYS-LAPTOP\Katty;Trusted_Connection=yes')
    print("Se ha establecido la conexcion con la base de datospy")
    cursor = connection.cursor()
    cursor.execute("SELECT @@version;")
    row = cursor.fetchone()
    print(row)

    cursor.execute("SELECT * FROM usuarios")
    rows = cursor.fetchall()
    tabla = PrettyTable()
    tabla.field_names = [column[0] for column in cursor.description]
    for row in rows:
        tabla.add_row(row)
    print(tabla)
except Exception as ex:
    print(ex)
finally:
    connection.close()
    print("La conexcion ha finalizado")

