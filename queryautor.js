//Listar livro de um autor
const { connectDB, closeDB, client } = require("./connect");

// Função para listar todos os livros de um autor específico
async function listByAuthor(author) {
  try {
    // Valida o autor
    if (!author || typeof author !== "string" || author.trim() === "") {
      throw new Error("Autor inválido! Especifique um nome de autor válido.");
    }

    // Estabelece conexão
    await connectDB();
    const db = client.db("BibliotecaDB");
    const col = db.collection("livros");

    // Busca todos os livros do autor
    const books = await col.find({ autor: author.trim() }).toArray();

    // Loga o resultado
    if (books.length === 0) {
      console.log(`Nenhum livro encontrado para o autor: ${author}`);
    } else {
      console.log(`Livros encontrados para o autor ${author}:`);
      books.forEach((book) => {
        console.log(
          `- Título: ${book.titulo}, ISBN: ${
            book.isbn
          }, Ano: ${book.anopublicado.getFullYear()}`
        );
      });
    }

    return books;
  } catch (error) {
    console.error("Erro ao listar livros:", error.message);
    throw error;
  } finally {
    // Fecha a conexão
    await closeDB();
  }
}

// Executa a função para listar livros (exemplo)
(async () => {
  try {
    await listByAuthor("Clara Mendes"); // Lista todos os livros de Clara Mendes
  } catch (error) {
    console.error("Erro na execução:", error.message);
  }
})();

module.exports = { listByAuthor };
