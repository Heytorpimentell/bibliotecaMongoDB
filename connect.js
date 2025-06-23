require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI; // String de conexão do .env
const client = new MongoClient(uri);

// Conecta ao banco de dados
async function connectDB() {
  try {
    await client.connect();
    console.log("Conectado com sucesso ao banco de dados!");
    return client;
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err.stack);
    throw err;
  }
}

// Fecha a conexão
async function closeDB() {
  try {
    await client.close();
    console.log("Conexão com MongoDB fechada.");
  } catch (err) {
    console.error("Erro ao fechar conexão:", err.stack);
    throw err;
  }
}

module.exports = { connectDB, closeDB, client };
