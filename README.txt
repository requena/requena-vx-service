Para executar o Server siga os seguintes passos.

-Entre em vxtel-service/src
-Execute "npm install"
-Caso não tenha o mongodb instalado, siga os procedimentos deste site https://docs.mongodb.com/manual/installation/
-Instancie o mongodb, o processo pode ser realizado com o seguinte comando "mongod --dbpath ~/vxtel-service/data/" 
    se necessario substitua o caminho após --dbpath para qualquer diretório da sua maquina
-Após a subida do mongoDB na porta padrão execute o seguinte comando dentro da pasta src "npm run-script config"
    O comando a cima irá executar um script que criará as collections e irá inserir os dados básicos para testes no mongo
-Aguarde a mensagem de conclusão com sucesso, pode demorar uns 5 segundos
-Suba o serviço com o comando "npm start"

Dentro do arquivo .env estão as variaveis utilizadas pelo app, altere se necessário

by Philipe Requena