import pyodbc
print("Base de datos de Pink Steam")
try:
    connection=pyodbc.connect('DRIVER={SQL Server};SERVER=KATTYS-LAPTOP;DATABASE=PinkSteamDB;UID=KATTYS-LAPTOP\Katty;Trusted_Connection=yes')
    print("Se ha establecido la conexcion con la base de datospy")
except Exception as ex:
    print(ex)
finally:
    connection.close()
    print("La conexcion ha finalizado")