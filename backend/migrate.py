from sqlalchemy import text
from database import engine

# Agregar columna instagram a la tabla reports si no existe
with engine.connect() as connection:
    try:
        connection.execute(text("""
            ALTER TABLE reports 
            ADD COLUMN instagram VARCHAR;
        """))
        connection.commit()
        print("✅ Columna 'instagram' agregada exitosamente a la tabla 'reports'")
    except Exception as e:
        if "already exists" in str(e):
            print("⚠️ La columna 'instagram' ya existe")
        else:
            print(f"❌ Error: {e}")
