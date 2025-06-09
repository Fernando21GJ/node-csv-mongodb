const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

/**
 * Lee un CSV y devuelve una Promise con un array de objetos.
 */
function procesarCSV(archivoPath) {
  return new Promise((resolve, reject) => {
    const resultados = [];
    fs.createReadStream(archivoPath)
      .pipe(csv())
      .on('data', (data) => resultados.push(data))
      .on('end', () => resolve(resultados))
      .on('error', (err) => reject(err));
  });
}

/**
 * Guarda un array de documentos en MongoDB.
 */
async function guardarEnMongo(documentos) {
  const uri = 'mongodb://mongo:27017';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('tienda');
    const collection = db.collection('productos');
    const result = await collection.insertMany(documentos);
    console.log(`${result.insertedCount} documentos insertados.`);
  } finally {
    await client.close();
  }
}

async function main() {
  const archivo = process.argv[2] || 'usuarios.csv';
  try {
    const datos = await procesarCSV(archivo);
    await guardarEnMongo(datos);
    console.log('Proceso completado.');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
