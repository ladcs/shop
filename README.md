# Shop

Projeto simulação de depósito de um mercado.

Para baixar o mesmo, usar:

````git clone https://github.com/ladcs/shop````

Usando então o comando

````cd shop````

Pode levantar o banco de dados com o docker compose, comando

````docker-compose up -d````

Para isso é necessário ter um arquivo .env com a variavel de ambiente PORT, como visto no arquivo .env.example.

Essa varivel de ambiente é usado para poder ter acesso ao banco pelo localhost.

Após a imagem do banco funcionando, deve ir para a pasta do backend

````cd backend````

Aqui tem o arquivo .env.example novamente, nele mostra-se as variaveis que deve usar caso não esteja usando docker para subir o banco. caso use o Docker a PORT aqui deve ser a mesma que do .env anterior, caso use o docker é apenas necessario atribuir esse valor.

Deve iniciar com o comando.

````npm run start````

ou

````npm start````

Com a API funcionando, deve ter um retorno no terminar Rodando na porta 3001 ou Rodando na porta PORTAPI.

Deixando então em segundo plano, deve entrar na pasta frontend

````cd ../frontend````

Então com o comando

````npm run start````

ou

````npm start````

Poderá começar a mexer na aplicação.

Para mais detalhes ler o README.md na parte de backend e na parte de frontend.
