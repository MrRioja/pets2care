# Pets2Care API

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Pets&message=2Care&color=blueviolet&style=for-the-badge"/>
  <img src="https://img.shields.io/github/license/MrRioja/pets2care?color=blueviolet&logo=License&style=for-the-badge"/>
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/MrRioja/pets2care?color=blueviolet&logo=TypeScript&logoColor=white&style=for-the-badge">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/MrRioja/pets2care?color=blueviolet&style=for-the-badge">
</p>
<br>

<p align="center">
  <a href="#sobre">Sobre</a> •
  <a href="#pets2care">Pets2Care</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#autor">Autor</a>  
</p>

<br>

## Sobre

Esse projeto foi meu trabalho de conclusão de curso da minha graduação em Sistemas de Informação cursado de janeiro de 2018 até dezembro de 2021.

> Esse repositório contem somente o backend do projeto Pets2Care

## Pets2Care

O Pets2Care é uma plataforma cujo objetivo é servir de vitrine para que seus usuários possam reportar e adotar animais que estão em condições vulneráveis. Aqui temos o backend da plataforma construído com NodeJS e ele possui diversos recursos para que as funcionalidades propostas pelo projeto sejam satisfeitas.

Essa API possui as funcionalidades abaixo:

- [x] Refresh token.
- [x] Upload de imagens.
- [x] Autenticação com JWT.
- [x] Criptografia de senha.
- [x] Envio de e-mail para alteração de senha.

E possui operações de cadastro, listagem, exclusão e edição para a grande maioria das entidades da aplicação, entidades essas que são:

- User: Usuários da aplicação.
- Advert: Anúncios de animais cadastrados por usuários.
- Donations: Registro de doações realizadas dentro da plataforma podendo ser de animais, alimentos, medicamentos e entre outros.
- Spotlights: Anúncios em destaques na plataforma e com maior probabilidade de serem exibidos para os usuários.
- Highlights: Usuários com perfil em destaque na plataforma.
- Favorites: Anúncios favoritados pelos usuários.

Para baixar o JSON com a coleção das requisições do Insomnia basta clicar no botão abaixo

[![Run in Insomnia](https://insomnia.rest/images/run.svg)](./readme/endpoints.json)

## Instalação

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### 🎲 Rodando a API

```bash
# Clone este repositório
$ git clone git@github.com:MrRioja/pets2care.git

# Acesse a pasta do projeto no terminal/cmd
$ cd pets2care

# Instale as dependências
$ npm install
# Caso prefira usar o Yarn execute o comando abaixo
$ yarn

# Executar as migrations e criar o banco SQLite
$ yarn typeorm migration:run

# Execute a aplicação em modo de desenvolvimento
$ npm run dev
# Caso prefira usar o Yarn execute o comando abaixo
$ yarn dev

# O servidor inciará na porta 3333 ou na porta definida no arquivo .env na variável APP_PORT - acesse <http://localhost:3333>
```

## Tecnologias

<img align="left" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="75" />

<img align="left" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" height="75" />

<br><br><br>

## Autor

<div align="center">
<img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/55336456?v=4&h=100&w=100&fit=cover&mask=circle&maxage=7d" />
<h1>Luiz Rioja</h1>
<strong>Backend Developer</strong>
<br/>
<br/>

<a href="https://linkedin.com/in/luizrioja" target="_blank">
<img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

<a href="https://github.com/mrrioja" target="_blank">
<img alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="mailto:lulyrioja@gmail.com?subject=Fala%20Dev" target="_blank">
<img alt="Gmail" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
</a>

<a href="https://api.whatsapp.com/send?phone=5511933572652" target="_blank">
<img alt="WhatsApp" src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/>
</a>

<a href="https://join.skype.com/invite/tvBbOq03j5Uu" target="_blank">
<img alt="Skype" src="https://img.shields.io/badge/SKYPE-%2300AFF0.svg?style=for-the-badge&logo=Skype&logoColor=white"/>
</a>

<br/>
<br/>
</div>
