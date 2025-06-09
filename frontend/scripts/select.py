import pyodbc

print("Base de datos de Pink Steam")

def obtener_generos_paginados(cursor, pagina, tamano_pagina):
    offset = (pagina - 1) * tamano_pagina
    query = """
        SELECT * FROM generos
        ORDER BY genre_id
        OFFSET ? ROWS FETCH NEXT ? ROWS ONLY;
    """
    cursor.execute(query, (offset, tamano_pagina))
    return cursor.fetchall()

connection = None 

try:
    connection = pyodbc.connect(
        r'DRIVER={SQL Server};SERVER=KATTYS-LAPTOP;DATABASE=PinkSteamDB;UID=KATTYS-LAPTOP\Katty;Trusted_Connection=yes'
    )
    print("Se ha establecido la conexión con la base de datos")

    cursor = connection.cursor()

    pagina = 1
    tamano_pagina = 4
    resultados = obtener_generos_paginados(cursor, pagina, tamano_pagina)

    for fila in resultados:
        print(fila)

except Exception as ex:
    print("Error:", ex)

finally:
    if connection:
        connection.close()
        print("La conexión ha finalizado")
