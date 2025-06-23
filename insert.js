const { connectDB, closeDB, client } = require("./connect");

// Inserir documentos dentro da coleção
async function insert() {
  try {
    // Estabelecer conexão
    await connectDB();

    const db = client.db("BibliotecaDB"); // Referenciando o banco
    const col = db.collection("livros"); // Referenciando a coleção

    // Lista de documentos || Inserindo esses dados.
    const livroDocuments = [
      {
        titulo: "Sombras do Passado",
        autor: "Clara Mendes",
        anopublicado: new Date("2018-03-15"),
        genero: "Romance",
        numeropaginas: 320,
        sinopse:
          "Uma jovem descobre segredos de família que mudam sua visão do mundo.",
        isbn: "978-1234567890123",
      },
      {
        titulo: "O Eco do Silêncio",
        autor: "Clara Mendes",
        anopublicado: new Date("2019-06-22"),
        genero: "Drama",
        numeropaginas: 280,
        sinopse:
          "Um músico luta para recuperar sua inspiração após uma tragédia pessoal.",
        isbn: "978-1234567890130",
      },
      {
        titulo: "Horizontes Perdidos",
        autor: "Clara Mendes",
        anopublicado: new Date("2020-09-10"),
        genero: "Ficção Histórica",
        numeropaginas: 400,
        sinopse: "Uma saga familiar durante a Segunda Guerra Mundial.",
        isbn: "978-1234567890147",
      },
      {
        titulo: "Luzes na Escuridão",
        autor: "Clara Mendes",
        anopublicado: new Date("2021-02-05"),
        genero: "Suspense",
        numeropaginas: 350,
        sinopse:
          "Uma detetive investiga desaparecimentos misteriosos em uma cidade pequena.",
        isbn: "978-1234567890154",
      },
      {
        titulo: "O Último Verão",
        autor: "Clara Mendes",
        anopublicado: new Date("2022-07-30"),
        genero: "Romance",
        numeropaginas: 300,
        sinopse:
          "Dois amigos reacendem um amor de juventude em um verão inesquecível.",
        isbn: "978-1234567890161",
      },
      {
        titulo: "Caminhos Cruzados",
        autor: "Clara Mendes",
        anopublicado: new Date("2023-01-12"),
        genero: "Drama",
        numeropaginas: 340,
        sinopse:
          "Três estranhos têm suas vidas entrelaçadas por um evento inesperado.",
        isbn: "978-1234567890178",
      },
      {
        titulo: "O Peso das Palavras",
        autor: "Clara Mendes",
        anopublicado: new Date("2020-04-18"),
        genero: "Ficção Literária",
        numeropaginas: 360,
        sinopse:
          "Um escritor enfrenta o impacto de suas obras na vida de seus leitores.",
        isbn: "978-1234567890185",
      },
      {
        titulo: "Minha Vida em Palavras",
        autor: "Clara Mendes", // Corrigido: adicionado autor
        anopublicado: new Date("2024-11-03"),
        genero: "Autobiografia",
        numeropaginas: 380,
        sinopse:
          "A autora reflete sobre sua carreira e os desafios de ser mulher na literatura.",
        isbn: "978-1234567890192",
      },
      {
        titulo: "Entre as Sombras",
        autor: "Clara Mendes",
        anopublicado: new Date("2017-08-25"),
        genero: "Mistério",
        numeropaginas: 310,
        sinopse: "Um crime antigo ressurge, ameaçando a paz de uma comunidade.",
        isbn: "978-1234567890208",
      },
      {
        titulo: "O Fio da Memória",
        autor: "Clara Mendes",
        anopublicado: new Date("2020-12-01"),
        genero: "Romance",
        numeropaginas: 290,
        sinopse: "Uma idosa reconta sua vida através de cartas nunca enviadas.",
        isbn: "978-1234567890215",
      },
      {
        titulo: "O Labirinto do Tempo",
        autor: "João Silva",
        anopublicado: new Date("2020-03-20"),
        genero: "Ficção Científica",
        numeropaginas: 420,
        sinopse:
          "Um cientista descobre uma forma de viajar no tempo, mas a que custo?",
        isbn: "978-1234567890222",
      },
      {
        titulo: "A Dança das Estrelas",
        autor: "Mariana Costa",
        anopublicado: new Date("2016-05-14"),
        genero: "Fantasia",
        numeropaginas: 450,
        sinopse:
          "Uma jovem maga precisa salvar seu reino de uma força ancestral.",
        isbn: "978-1234567890239",
      },
      {
        titulo: "Cidade em Chamas",
        autor: "Pedro Almeida",
        anopublicado: new Date("2023-09-08"),
        genero: "Suspense",
        numeropaginas: 370,
        sinopse:
          "Um incêndio devastador revela segredos de uma metrópole corrupta.",
        isbn: "978-1234567890246",
      },
      {
        titulo: "O Silêncio das Águas",
        autor: "Ana Ribeiro",
        anopublicado: new Date("2019-11-27"),
        genero: "Drama",
        numeropaginas: 260,
        sinopse:
          "Uma família enfrenta a perda em uma vila isolada à beira-mar.",
        isbn: "978-1234567890253",
      },
      {
        titulo: "Além do Horizonte",
        autor: "Lucas Ferreira",
        anopublicado: new Date("2022-04-16"),
        genero: "Aventura",
        numeropaginas: 390,
        sinopse:
          "Um explorador busca uma cidade lendária nas selvas da Amazônia.",
        isbn: "978-1234567890260",
      },
      {
        titulo: "O Guardião das Chaves",
        autor: "Sofia Lima",
        anopublicado: new Date("2015-10-09"),
        genero: "Fantasia",
        numeropaginas: 480,
        sinopse: "Um jovem descobre que é o último de uma linhagem mágica.",
        isbn: "978-1234567890277",
      },
      {
        titulo: "Sombras no Deserto",
        autor: "Rafael Santos",
        anopublicado: new Date("2021-06-23"),
        genero: "Aventura",
        numeropaginas: 330,
        sinopse:
          "Uma expedição arqueológica no Saara encontra mais do que esperava.",
        isbn: "978-1234567890284",
      },
      {
        titulo: "O Voo da Liberdade",
        autor: "Beatriz Oliveira",
        anopublicado: new Date("2018-12-04"),
        genero: "Ficção Histórica",
        numeropaginas: 410,
        sinopse:
          "A história de uma mulher que luta pela liberdade durante a ditadura.",
        isbn: "978-1234567890291",
      },
      {
        titulo: "O Pássaro de Fogo",
        autor: "Gabriel Souza",
        anopublicado: new Date("2024-02-28"),
        genero: "Fantasia",
        numeropaginas: 500,
        sinopse:
          "Um herói improvável enfrenta uma criatura mítica para salvar seu povo.",
        isbn: "978-1234567890307",
      },
      {
        titulo: "A Última Canção",
        autor: "Isabela Martins",
        anopublicado: new Date("2017-04-11"),
        genero: "Romance",
        numeropaginas: 270,
        sinopse:
          "Uma cantora encontra o amor enquanto enfrenta uma doença terminal.",
        isbn: "978-1234567890314",
      },
    ];

    // Inserir documentos || Gravando dados.
    const result = await col.insertMany(livroDocuments);
    console.log(
      `Dados inseridos com sucesso! ${result.insertedCount} documentos inseridos.`
    );
    return result;
  } catch (error) {
    console.error("Erro ao inserir documentos:", error);
    throw error;
  } finally {
    // Fechar a conexão
    await closeDB();
  }
}

// Executar a função em um contexto assíncrono
(async () => {
  await insert();
})();

module.exports = { insert };
