## About

A criação deste projeto foi feita planejamento um ambiente em nodejs + mongodb disponibilizando microservições.

Cada diretório vx-nome, irá conter uma API e um possível repository, no cenário atual todas as APIs são independentes e são instanciadas em uma unica instancia "express", porém, pela arquitetura, é possível subir cada uma das APIs utilizando um server a parte, possibilitando uma utilização mais agressiva de microserviços.

Como pode ser visto no fonte, todos os .js possuem ao seu lado o seu respectivo test.js, essas classes de testes podem ser executadas de maneira isolada, ou integrada, conforme pode se analisado no arquivo index.test.js.

## Getting Started

Esse projeto utiliza o mongodb como repositório de dados, caso não o tenha instalado siga os procedimentos do site abaixo conforme o seu SO.

https://docs.mongodb.com/manual/installation/

Abra uma instancia do mongodb, o seguinte comando pode ser utilizado:

```sh
mongod --dbpath ~/data/
```

A variável --dbpath corresponde ao local onde o mongodb irá utilizar par armazenar os dados do banco.

O arquivo ./src/.env possuí as variáveis utilizadas pela aplicação, o projeto original já está configurado para utilizar as variáveis padrões, caso seja necessário customizar uma url ou porta, o faça nesse arquivo.

Com o banco rodando e as configurações deitas, a sequencia de comando a seguir irá instalar a aplicação, inicializar o banco de dados com os valores padròes para testes e carga básica,

```sh
cd requena-vx-service
npm install
npm run-script config
```

Para subir o serviço basta executar:
```sh
npm start
```

O arquivo ./src/index.test.js contém as chamadas para os testes automatizados, o arquivo é separado em "Testes isolados" e "Testes integrados".

Para executar o teste uso o seguinte comando:

```sh
npm test
```


by Philipe Requena