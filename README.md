# Projeto Biblioteca MongoDB

Este projeto consiste na implementação de um sistema básico de gerenciamento de informações sobre livros utilizando MongoDB como banco de dados NoSQL. Desenvolvido em Node.js, ele oferece funcionalidades essenciais para armazenar, consultar, atualizar e deletar registros de livros.

## 🚀 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript.
* **MongoDB**: Banco de dados NoSQL para armazenamento de documentos.
* **Dotenv**: Para gerenciamento de variáveis de ambiente sensíveis.

## ✨ Funcionalidades

O sistema implementa as seguintes operações sobre a coleção de livros:

### 📖 Gerenciamento de Dados

* **Inserir Dados**: Implementa uma função para adicionar novos livros ao banco de dados, criando novos documentos na coleção.
* **Atualizar Dados**: Implementa uma função para modificar os dados de um livro existente.
* **Deletar Dados**: Implementa uma função para remover um livro da coleção do banco de dados.

### 🔍 Consultas Implementadas

* **Listar todos os livros de um determinado autor**: Permite filtrar e exibir todos os livros escritos por um autor específico.
* **Listar todos os livros de um determinado gênero**: Permite filtrar e exibir todos os livros categorizados em um gênero literário específico.
* **Listar todos os livros publicados em um determinado ano**: Permite filtrar e exibir todos os livros que foram publicados em um ano específico.
* **Listar os 10 livros com mais páginas**: Recupera e exibe os 10 livros que possuem a maior quantidade de páginas.
* **Listar os 10 livros com menos páginas**: Recupera e exibe os 10 livros que possuem a menor quantidade de páginas.
* **Buscar um livro pelo ISBN**: Permite localizar e exibir um livro específico utilizando seu ISBN como identificador único.

## 📚 Estrutura dos Documentos (Livro)

Cada documento na coleção `livros` representa um único livro e espera conter as seguintes informações:

* `titulo` (Título)
* `autor` (Autor)
* `anoPublicacao` (Ano de publicação)
* `genero` (Gênero)
* `numPaginas` (Número de páginas)
* `sinopse` (Sinopse)
* `isbn` (ISBN)

Exemplo de um documento de livro:

`json
{
  "titulo": "O Guia do Mochileiro das Galáxias",
  "autor": "Douglas Adams",
  "anoPublicacao": 1979,
  "genero": "Ficção Científica",
  "numPaginas": 193,
  "sinopse": "Arthur Dent, um humano, sobrevive à demolição da Terra e embarca em uma aventura intergaláctica.",
  "isbn": "978-0345391803"
}
⚙️ Configuração e Execução
Pré-requisitos
Node.js: Versão 14 ou superior.
MongoDB Atlas: Uma conta e um cluster MongoDB configurados (ou uma instância local do MongoDB rodando).
npm: Gerenciador de pacotes do Node.js, geralmente instalado com o Node.js.
Instalação
Clone o repositório (se aplicável, caso este projeto esteja em um repositório Git).
Navegue até a pasta do projeto no seu terminal.
Instale as dependências listadas no package.json:
Bash

npm install
Configuração do Banco de Dados
Crie um arquivo chamado .env na raiz do seu projeto.
Dentro do arquivo .env, adicione sua string de conexão do MongoDB Atlas (ou sua conexão local), como no exemplo abaixo:
Snippet de código

MONGO_URI=mongodb+srv://<seu_usuario>:<sua_senha>@<seu_cluster>.mongodb.net/?retryWrites=true&w=majority
Certifique-se de substituir <seu_usuario>, <sua_senha> e <seu_cluster> pelos seus dados reais de conexão.
Importante: Adicione a linha .env ao seu arquivo .gitignore para evitar que suas credenciais sejam versionadas no Git.
Estrutura de Arquivos
A estrutura de arquivos do projeto é organizada da seguinte forma:

.
├── node_modules/         # Dependências do projeto (IGNORADA PELO GIT)
├── .env                  # Variáveis de ambiente (IGNORADA PELO GIT)
├── .gitignore            # Define arquivos e pastas a serem ignorados pelo Git
├── connect.js            # Módulo para gerenciar a conexão e desconexão com o MongoDB
├── delete.js             # Script/função para deletar livros
├── insert.js             # Script/função para inserir novos livros
├── package.json          # Metadados do projeto e lista de dependências
├── package-lock.json     # Registro exato das versões das dependências
├── queryautor.js         # Script/função para listar livros por autor
├── querygenero.js        # Script/função para listar livros por gênero
├── queryisbn.js          # Script/função para buscar livro por ISBN
├── querylivroano.js      # Script/função para listar livros por ano de publicação
├── querymaispagina.js    # Script/função para listar os 10 livros com mais páginas
├── querymenosagi...js    # Script/função para listar os 10 livros com menos páginas
├── update.js             # Script/função para atualizar livros
└── # Outros arquivos de teste ou orquestração (se houver)
Como Executar as Funções
Cada arquivo .js que contém uma função de operação ou consulta pode ser executado individualmente via terminal (Node.js).

Exemplos de execução:

Para inserir dados (se insert.js tiver um exemplo de uso direto):
Bash

node insert.js
Para listar livros de um gênero específico (ex: "Romance"):
Bash

node querygenero.js
(Nota: Se a função em querygenero.js espera um parâmetro, você pode precisar modificar o final do arquivo para passar um valor fixo para testes, ou usar uma ferramenta para passar argumentos da linha de comando.)
Para buscar um livro pelo ISBN (ex: "978-0321765723"):
Bash

node queryisbn.js
(Nota: Similar ao anterior, ajuste o valor do ISBN para testar.)
Para listar os 10 livros com mais páginas:
Bash

node querymaispagina.js
Para listar os 10 livros com menos páginas:
Bash

node querymenosagi...js
Basta executar o arquivo Node.js correspondente à funcionalidade que deseja testar.

🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para relatar problemas ou sugerir melhorias, ou enviar pull requests para adicionar novas funcionalidades ou correções.
