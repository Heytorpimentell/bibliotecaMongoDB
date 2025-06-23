const { connectDB, closeDB, client } = require("./connect");

// Função para atualizar um livro com base em um filtro e dados de atualização
async function update(filter, updateData) {
  try {
    // Valida o filtro e os dados de atualização
    if (!filter || Object.keys(filter).length === 0) {
      throw new Error(
        "Filtro vazio! Especifique um critério (ex.: ISBN ou título)."
      );
    }
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error(
        "Dados de atualização vazios! Especifique os campos a atualizar."
      );
    }

    // Estabelece conexão
    await connectDB();
    const db = client.db("BibliotecaDB");
    const col = db.collection("livros");

    // Verifica se o documento existe
    const existingDoc = await col.findOne(filter);
    if (!existingDoc) {
      console.log(
        `Nenhum livro encontrado com o filtro: ${JSON.stringify(filter)}`
      );
      return { modifiedCount: 0 };
    }
    console.log(
      `Encontrado: ${existingDoc.titulo} (ISBN: ${existingDoc.isbn})`
    );

    // Atualiza o documento usando $set para modificar apenas os campos especificados
    const result = await col.updateOne(filter, { $set: updateData });

    // Loga o resultado
    console.log(
      result.modifiedCount === 1
        ? "Sucesso! 1 livro atualizado."
        : "Nenhum livro atualizado."
    );
    return result;
  } catch (error) {
    console.error("Erro ao atualizar livro:", error.message);
    throw error;
  } finally {
    // Fecha a conexão
    await closeDB();
  }
}

// Executa a função para atualizar um livro (exemplo)
(async () => {
  try {
    await update(
      { isbn: "978-1234567890161" }, // Filtro: livro com ISBN de "O Último Verão"
      {
        titulo: "O Último Verão (Edição Revisada)", // Novo título
        numeropaginas: 310, // Novo número de páginas
        sinopse:
          "Dois amigos reacendem um amor de juventude em um verão inesquecível. Edição revisada.", // Nova sinopse
      }
    );
  } catch (error) {
    console.error("Erro na execução:", error.message);
  }
})();

module.exports = { update };
