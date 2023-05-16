# Backend

Para esse backend foi utilizado:

express;
TypeScript;
MySQL 8;
arquitetura MSC.

controller => aqui tem-se os arquivos Pack.ts e products.ts, ambos são classes, elas são responsáveis por receber a requisição e enviar erro para o próximo middleware, que nesse caso é de erro.

service => envia as requisições tratadas, regra de negócio, para o model. aqui temos PackServices.ts e ProductsServices.ts como sendo suas classes. Em ProductsServices temos um método responsável por gerenciar todos os testes para ver se os dados enviado podem ser usado para um patch no sales_prices de algum produto no banco.

model => nessa pasta temos a comunicação com o banco de dados. connection faz exatamente isso, conectar com o banco. Caso não estaja usando o docker para ter a imagem do banco deve criar um banco de dados no MySQL da seguinte maneira:

````mysql -u root -p````

Para abrir o MySQL no terminal, aqui deve digitar a senha do MySQL da máquina, e usando o seguinte comando:

````CREATE DATABASE market;````

Ainda para que funcione corretamente, deve ser colocado no .env o MYSQL_USER, caso não esteja usando o user padrão e o MYSQL_PASSWORD usado para se conectar com o MySQL. Caso não tenha a variável PORT ela já está configurada como padrão do MySQL. Caso esteja usando docker é de extrema importancia que a variável PORT tenha o mesmo valor que no .env da pasta shop.

No model ainda tem duas classes uma para acessar a tabela produto e outra para acessar a tabela packs.

middleware => possui apenas o middleware de erro.

erro => tem os erros já para bad request e not found, esses que extendem a classe ErrorBase.ts.

db => tem seeders esse que lê o arquivo market.sql e popula o banco de dados market.

schema => testa se os dados são númericos usando o zod.

routes => configura os endpoints, products para os gets da patch tabela products e packs para a tabela packs.

util => possui a classe RulesToUpdate, nela tem as regras para testes se pode haver o update de sales_price, usado no service de products.

app e index => configura o servidor.