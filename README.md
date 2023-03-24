# Projeto Store Manager

O Store Manager é uma API RESTful para um sistema de gerenciamento de vendas no formato dropshipping. É possível criar, visualizar, deletar e atualizar produtos e vendas. A API foi desenvolvida seguindo a arquitetura em camadas MSC e utiliza o MySQL para o banco de dados.

O projeto foi desenvolvido durante o módulo de back-end na [Trybe](https://www.betrybe.com/).

## Tecnologias e ferramentas utilizadas 

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

## Implementações

- Utilização do Docker para criar o ambiente de desenvolvimento;
- Criação de endpoints utilizando o framework Express.JS e a aplicação do padrão REST;
- Aplicação da arquitetura em camadas MSC (model, service e controller);
- Validações de campos de produtos e vendas utilizando a biblioteca Joi;
- Conexão e gerenciamento do banco de dados MySQL.


## Instalação com Docker:

1. Clone o repositório:

```
git clone git@github.com:andre-usf/store-manager-project.git
```

2. Entre no diretório criado:

```
cd store-manager-project
```

3. Inicie o docker compose:

```
docker-compose up -d
```

4. Acesse o terminal dentro do container:

```
docker exec -it store_manager bash
```

5. Instale as dependências:

```
npm install
```

6. Inicie a aplicação:

```
npm run migration && npm run seed && npm run debug
```

## Instalação local (sem Docker):

### Obs.: Para rodar a aplicação sem Docker, você deverá garantir acesso ao MySQL e configurar as variáveis de ambiente. 

<br>

1. Siga os passos 1 e 2 da seção anterior.
2. Instale as dependências:
```
npm install
```
3. Inicie a aplicação:

```
npm run migration && npm run seed && npm run debug
```

## Sobre mim

[Linkedin](https://www.linkedin.com/in/andrefretta/)

<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto no qual você pode customizar e reutilizar todas as vezes que for executar o trybe-publisher.

Para deixá-lo com a sua cara, basta alterar o seguinte arquivo da sua máquina: ~/.student-repo-publisher/custom/_NEW_README.md

É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->


<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto no qual você pode customizar e reutilizar todas as vezes que for executar o trybe-publisher.

Para deixá-lo com a sua cara, basta alterar o seguinte arquivo da sua máquina: ~/.student-repo-publisher/custom/_NEW_README.md

É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
