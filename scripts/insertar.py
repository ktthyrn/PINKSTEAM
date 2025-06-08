import pyodbc
print("Base de datos de Pink Steam")
try:
    connection=pyodbc.connect('DRIVER={SQL Server};SERVER=KATTYS-LAPTOP;DATABASE=PinkSteamDB;UID=KATTYS-LAPTOP\Katty;Trusted_Connection=yes')
    print("Se ha establecido la conexcion con la base de datospy")
    cursor = connection.cursor()
    cursor.execute("SELECT @@version;")
    row = cursor.fetchone()
    print(row)
    ###Para editar cada modulo cambiar la siguiente linea
    cursor.execute("INSERT INTO generos (genre_id, nombre) VALUES (?, ?)", (11, 'Fantasía'))
    connection.commit()

    cursor.execute("SELECT * FROM generos")
    rows = cursor.fetchall()
    for row in rows:
        print(row)
except Exception as ex:
    print(ex)
finally:
    connection.close()
    print("La conexcion ha finalizado")
