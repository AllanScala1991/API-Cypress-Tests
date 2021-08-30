# CYPRESS + EXPRESS + TYPESCRIPT

### Dependencias desse projeto:
- Cypress : Para desenvolver os testes.
- Express : Para desenvolver a API com Node js.
- Sequelize : ORM para o banco de dados com SQLite.
- Jsonwebtoken : para autenticação do usuário.

### Como rodar o projeto:
- Clone o repositório e execute "npm install" para instalar as dependencias.

- Defina as variaveis de ambiente.

- Em um terminal execute "npm dev" para iniciar o servidor.

- No outro terminal execute "npx cypress open" ou "npx cypress run" para executar os testes em modo headless.

### Variaveis de ambiente
- .ENV:
    - TOKEN_KEY= "Chave secreta para autenticação"
    - BASE_URL= "localhost:5000"

- cypress.env:
    - BASE_URL = "localhost:5000"

### ROTAS da API
- POST | GET | PUT | DELETE - /task : rota das tarefas.
- POST | GET | PUT | DELETE - /user : rota dos usuarios.
- POST - /login : rota que faz login

### Objetivo
    O objetivo desse projeto é dar uma introdução ao teste de API com Cypress utilizando TypeScript, tanto para API com Express , quanto para os testes. 