const { connectDB, closeDB, client } = require("./connect");

// Função para listar todos os livros de um gênero específico
async function listByGenre(genre) {
  try {
    // Valida o gênero
    if (!genre || typeof genre !== "string" || genre.trim() === "") {
      throw new Error(
        "Gênero inválido! Especifique um gênero válido (ex.: Romance)."
      );
    }

    // Estabelece conexão
    await connectDB();
    const db = client.db("BibliotecaDB");
    const col = db.collection("livros");

    // Busca todos os livros do gênero
    const books = await col.find({ genero: genre.trim() }).toArray();

    // Loga o resultado
    if (books.length === 0) {
      console.log(`Nenhum livro encontrado para o gênero: ${genre}`);
    } else {
      console.log(`Livros encontrados para o gênero ${genre}:`);
      books.forEach((book) => {
        console.log(
          `- Título: ${book.titulo}, Autor: ${book.autor}, ISBN: ${book.isbn}`
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
    await listByGenre("Romance"); // Lista todos os livros do gênero Romance
  } catch (error) {
    console.error("Erro na execução:", error.message);
  }
})();

module.exports = { listByGenre };
