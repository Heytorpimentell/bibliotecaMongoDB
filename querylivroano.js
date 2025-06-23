const { connectDB, closeDB, client } = require("./connect"); // Assumindo que este arquivo 'connect' existe

// Função para listar todos os livros publicados em um ano específico
async function listByYear(year) {
  try {
    // 1. Validação do ano
    if (typeof year !== "number" || year <= 0) {
      throw new Error("Ano inválido! Especifique um ano válido (ex.: 2023).");
    }

    // 2. Estabelece conexão
    await connectDB();
    const db = client.db("BibliotecaDB"); // Nome do seu banco de dados
    const col = db.collection("livros"); // Nome da sua coleção de livros

    // 3. Busca todos os livros do ano especificado
    // Aqui está a mudança chave: o filtro { anoPublicacao: year }
    const books = await col.find({ anoPublicacao: year }).toArray();

    // 4. Loga o resultado
    if (books.length === 0) {
      console.log(`Nenhum livro encontrado publicado no ano: ${year}`);
    } else {
      console.log(`Livros publicados no ano ${year}:`);
      books.forEach((book) => {
        console.log(
          `- Título: ${book.titulo}, Autor: ${book.autor}, Gênero: ${
            book.genero || "N/A"
          }, ISBN: ${book.isbn || "N/A"}`
        );
      });
    }

    return books;
  } catch (error) {
    console.error("Erro ao listar livros por ano:", error.message);
    throw error;
  } finally {
    // 5. Fecha a conexão
    await closeDB();
  }
}

// --- Exemplo de Uso ---
(async () => {
  try {
    console.log("\n--- Listando livros de 2023 ---");
    await listByYear(2023); // Lista todos os livros publicados em 2023

    console.log(
      "\n--- Listando livros de 1984 (exemplo de ano sem resultados, talvez) ---"
    );
    await listByYear(1984); // Exemplo de busca para um ano diferente
  } catch (error) {
    console.error("Erro na execução principal:", error.message);
  }
})();

module.exports = { listByYear };
