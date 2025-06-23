const { connectDB, closeDB, client } = require("./connect");

// Função para deletar um livro com base em um filtro
async function del(filter) {
  try {
    if (!filter || Object.keys(filter).length === 0) {
      throw new Error("Filtro vazio! Especifique um critério (ex.: título).");
    }

    await connectDB();
    const db = client.db("BibliotecaDB");
    const col = db.collection("livros");

    // Contagem inicial de documentos
    const initialCount = await col.countDocuments();
    console.log(`Contagem inicial: ${initialCount} livros`);

    // Verifica se o documento existe
    const existingDoc = await col.findOne(filter);
    if (!existingDoc) {
      console.log(
        `Nenhum livro encontrado com o filtro: ${JSON.stringify(filter)}`
      );
      return { deletedCount: 0 };
    }
    console.log(
      `Encontrado: ${existingDoc.titulo} (ISBN: ${existingDoc.isbn})`
    );

    // Deleta o documento
    const result = await col.deleteOne(filter);

    // Contagem final de documentos
    const finalCount = await col.countDocuments();
    console.log(
      result.deletedCount === 1
        ? "Sucesso! 1 livro deletado."
        : "Falha: Nenhum livro deletado."
    );
    console.log(`Contagem final: ${finalCount} livros`);

    return result;
  } catch (error) {
    console.error("Erro ao deletar livro:", error.message);
    throw error;
  } finally {
    await closeDB();
  }
}

// Executa a função para deletar o livro "O Último Verão"
(async () => {
  try {
    await del({ titulo: "Sombras do Passado" });
  } catch (error) {
    console.error("Erro na execução:", error.message);
  }
})();

module.exports = { del };
