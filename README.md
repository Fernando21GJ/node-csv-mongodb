
# node-csv-mongodb

Script en Node.js que procesa cualquier archivo CSV y lo guarda en MongoDB.

## 🚀 Cómo levantarlo

1. Clona el repositorio.
2. Asegúrate de tener el archivo CSV que quieres procesar en la raíz del proyecto.
3. Levanta con Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. El script se ejecutará automáticamente usando el archivo `usuarios.csv`. Puedes cambiarlo editando el `Dockerfile` o ejecutando directamente:
   ```bash
   docker-compose run --rm node_app node index.js otro_archivo.csv
   ```

Los datos se insertarán en la base de datos `tienda` en MongoDB.
