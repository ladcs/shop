# frontend

Foi usado react com o framework next. Uma vez que a propria documentação atual do react recomenda usar algum tipo de framework.

components => aqui há os componentes csvTable, responsavel por fazer a tabela dos produtos e valores enviados pelo arquivo csv,header, traz três botões de navegação esse que envia para as três paginas da aplicação, ProductTabel responsável por criar a tabela de produtos, updateTable responsável por trazer a tabela resposta quando os valores são atualizados.

lib => axios.ts é a configuração da biblioteca que faz requisições para o backend e readCSV.ts retorna os valores do arquivo csv.

pages => aqui tem a pagina File onde pode ter interação com o arquivo .csv, index mostra a tabela de produtos e PackTable mostra a tabela dos packs.

util => buttonValidate.ts serve para testar se pode enviar a atualização para o banco, ou seja, se os dados são validos, testPrice.ts é um auxiliar para o arquivo anterior.

styles => onde fica a estilização da aplicação onde até esse momento não pude fazer.