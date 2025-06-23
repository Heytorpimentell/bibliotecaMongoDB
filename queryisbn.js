// findBookByISBN.js
const { connectDB, closeDB, client } = require("./connect"); // Importa funções de conexão do seu arquivo connect.js

/**
 * @function findBookByISBN
 * @description Busca e retorna um único livro da coleção com base no seu ISBN.
 * Assume que os documentos de livro possuem um campo 'isbn' (tipo String).
 * @param {string} isbn O número ISBN do livro a ser buscado.
 * @returns {Promise<Object|null>} O documento do livro encontrado ou null se nenhum livro for encontrado.
 * @throws {Error} Lança um erro se o ISBN for inválido, ou se houver problemas de conexão/consulta.
 */
async function findBookByISBN(isbn) {
  try {
    // 1. Validação do ISBN
    if (!isbn || typeof isbn !== "string" || isbn.trim() === "") {
      throw new Error("ISBN inválido! Por favor, forneça um ISBN válido.");
    }

    // 2. Estabelece a conexão com o banco de dados
    await connectDB();
    const db = client.db("BibliotecaDB"); // Nome do seu banco de dados
    const col = db.collection("livros"); // Nome da sua coleção de livros

    // 3. Realiza a consulta:
    //    - .findOne({ isbn: isbn.trim() }): Busca o PRIMEIRO documento que corresponde ao critério.
    //                                      O critério é que o campo 'isbn' no documento seja igual ao ISBN fornecido (sem espaços).
    const book = await col.findOne({ isbn: isbn.trim() });

    // 4. Exibe os resultados no console
    if (!book) {
      console.log(`Nenhum livro encontrado com o ISBN: ${isbn}`);
    } else {
      console.log(`Livro encontrado para o ISBN ${isbn}:`);
      console.log(
        `- Título: ${book.titulo || "N/A"}, Autor: ${
          book.autor || "N/A"
        }, Gênero: ${book.genero || "N/A"}, Páginas: ${
          book.numPaginas || "N/A"
        }`
      );
    }

    return book; // Retorna o documento do livro (ou null se não encontrado)
  } catch (error) {
    // Captura e loga quaisquer erros que ocorram durante o processo
    console.error("Erro ao buscar livro pelo ISBN:", error.message);
    throw error; // Relança o erro para que o chamador possa tratá-lo, se necessário
  } finally {
    // 5. Garante o fechamento da conexão com o banco de dados
    await closeDB();
  }
}

// --- Exemplo de Uso (descomente para testar este arquivo individualmente) ---

(async () => {
  try {
    // Exemplo de ISBN para um livro que pode existir
    await findBookByISBN("978-0321765723"); // Substitua por um ISBN real do seu DB

    // Exemplo de ISBN para um livro que provavelmente NÃO existe
    await findBookByISBN("999-9999999999");
  } catch (error) {
    console.error("Erro na execução do script findBookByISBN:", error.message);
  }
})();

// Exporta a função para que possa ser importada e usada em outros módulos
module.exports = {
  findBookByISBN,
};
