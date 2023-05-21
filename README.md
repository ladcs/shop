# Shop

Projeto simulação de depósito de um mercado.

Para baixar o mesmo, usar:

````git clone https://github.com/ladcs/shop````

Usando então o comando

````cd shop````

A aplicação pode funcionar com o docker compose, comando

````docker-compose up -d````

Para isso é necessário ter um arquivo .env com algumas variáveis de ambiente, vistas no arquivo .env.example. Essas variáveis são:

PORT -> porta do banco de dados

MYSQL_PASSWORD -> senha do banco de dados

FRONTEND_PORT -> porta do front-end

BACKEND_PORT -> porta do back-end

Essas variáveis de ambiente são usados para poder ter acesso as aplicações pelo localhost.

Caso queira fazer a aplicação pelo node:

Deve ir para a pasta do backend

````cd backend````

Aqui tem o arquivo .env.example novamente, nele mostra-se as variaveis que deve usar, caso não esteja usando docker. As variáveis são:

MYSQL_USER -> usuário do MySQL;

MYSQL_PASSWORD -> senha do MySQL;

BACKEND_PORT -> Porta do backend;

PORT -> porta do MySQL;

HOST -> se for no node da propria máquina será localhost, ou o host do servido.

Deve iniciar com o comando.

````npm run start````

ou

````npm start````

Com a API funcionando, deve ter um retorno no terminar Rodando na porta BACKEND_PORT.

Deixando então em segundo plano, deve entrar na pasta frontend

````cd ../frontend````

Aqui também tem duas variaveis de ambiente, como pode ver em .env.local.example, essas devem ficar no arquivo .env.local, essas variáveis são:

NEXT_PUBLIC_BACKEND_PORT -> porta do backend, a mesma do BACKEND_PORT

NEXT_PUBLIC_HOST -> se for no node da propria máquina será localhost, ou o host do servido.

Então com o comando

````npm run start````

ou

````npm start````

Poderá começar a mexer na aplicação.

Para mais detalhes ler o README.md na parte de backend e na parte de frontend.
