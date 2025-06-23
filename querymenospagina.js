const { connectDB, closeDB, client } = require("./connect"); // Assumindo que este arquivo 'connect' existe

// Função para listar os 10 livros com menos páginas
async function listTop10BooksByFewestPages() {
  try {
    // 1. Estabelece conexão
    await connectDB();
    const db = client.db("BibliotecaDB"); // Seu banco de dados
    const col = db.collection("livros"); // Sua coleção de livros

    // 2. Busca os 10 livros com menos páginas
    // - .sort({ numPaginas: 1 }): Ordena os documentos pela quantidade de páginas em ordem crescente (1).
    // - .limit(10): Limita o resultado aos primeiros 10 documentos após a ordenação.
    const books = await col
      .find({})
      .sort({ numPaginas: 1 }) // <-- AQUI É A MUDANÇA: '1' para ordem crescente
      .limit(10)
      .toArray();

    // 3. Loga o resultado
    if (books.length === 0) {
      console.log(
        "Nenhum livro encontrado na coleção ou sem informações de páginas."
      );
    } else {
      console.log("Os 10 livros com menos páginas são:");
      books.forEach((book, index) => {
        console.log(
          `${index + 1}. Título: ${book.titulo}, Autor: ${
            book.autor
          }, Páginas: ${book.numPaginas || "N/A"}`
        );
      });
    }

    return books;
  } catch (error) {
    console.error(
      "Erro ao listar os 10 livros com menos páginas:",
      error.message
    );
    throw error;
  } finally {
    // 4. Fecha a conexão
    await closeDB();
  }
}

// --- Exemplo de Uso ---
(async () => {
  try {
    console.log("\n--- Listando os 10 livros com menos páginas ---");
    await listTop10BooksByFewestPages();
  } catch (error) {
    console.error("Erro na execução principal:", error.message);
  }
})();

module.exports = { listTop10BooksByFewestPages };
