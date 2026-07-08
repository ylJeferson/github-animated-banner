# github-animated-banner

Projeto Next.js para gerar banners animados customizaveis para READMEs do GitHub via URL.

## diretrizes do projeto

- Seja extremamente conciso e foque apenas na resolucao do problema. Responda diretamente com o codigo, comando ou solucao necessaria, evitando rodeios, saudacoes formais e explicacoes longas, salvo quando forem solicitadas.
- Este arquivo deve se chamar `readme.md`, totalmente em letras minusculas.
- O `readme.md` deve documentar a estrutura do projeto, seu funcionamento e todas as diretrizes aplicaveis ao projeto.
- Toda nova diretriz definida durante a conversa deve ser registrada no `readme.md` antes de qualquer implementacao relacionada.
- Antes de alterar comportamento, entender o fluxo atual lendo `readme.md` e `src/pages/api/index.jsx`.
- As mensagens de commit devem seguir o padrao `-m "[Tipo da Alteracao]: [Breve resumo referente a alteracao realizada]"`, usando um tipo derivado de verbo, como `Adicao`, `Correcao`, `Modificacao`, `Exclusao` ou `Ajuste`.
- Antes de publicar alteracoes no banner, validar o build de producao, o tipo `image/svg+xml` do endpoint publicado e a mudanca visual da animacao em instantes diferentes.

## estrutura

- `src/pages/api/index.jsx`: endpoint `/api`; recebe parametros por query string, gera um SVG animado e retorna uma imagem.
- `src/pages/demo/index.jsx`: pagina de demo; anima o texto no navegador usando React e `setInterval`.
- `src/pages/index.jsx`: redireciona para outro repositorio.
- `src/styles/demo.module.css`: estilos da pagina de demo.
- `src/styles/globals.css`: estilos globais.
- `public/`: favicons e assets estaticos.
- `package.json`: scripts Next.js e dependencias.

## uso no README do GitHub

```md
[![GitHub Banner](https://github-animated-banner.vercel.app/api?bgcolor=transparent&name=Jeferson&namefont=Tangerine&namecolor=%23ff5779&anim=Sempre%20em%20busca%20do%20autodesenvolvimento&animfont=Varela%20Round&animcolor=%236941d3&namefontsize=10rem&animfontsize=5em&v=2)](https://github.com/ylJeferson/github-animated-banner)
```

## parametros aceitos

- `bgcolor`: cor de fundo.
- `name`: titulo fixo.
- `namecolor`: cor do titulo.
- `namefont`: fonte Google do titulo.
- `namefontsize`: tamanho do titulo.
- `anim`: textos animados separados por `;`.
- `animcolor`: cor dos textos animados.
- `animfont`: fonte Google dos textos animados.
- `animfontsize`: tamanho dos textos animados.

## funcionamento atual

1. `/api` recebe os parametros por query string.
2. O endpoint aplica valores padrao, limites de tamanho, sanitizacao simples e escape XML.
3. `anim` e separado por `;`.
4. Cada texto vira uma sequencia de frames com substrings progressivas.
5. O SVG usa CSS interno para alternar os frames em loop, simulando escrita, pausa e apagamento.
6. A resposta e enviada com `Content-Type: image/svg+xml; charset=utf-8`.

O endpoint nao usa JavaScript no cliente, pagina HTML, Chromium, Puppeteer, GIF ou APNG. A animacao fica declarada dentro do proprio SVG, entao o link pode ser usado diretamente como imagem em um README do GitHub.

## detalhes da animacao

- Tamanho do SVG: `1920x333`.
- Fundo: `<rect>` com `bgcolor`.
- Titulo: `<text>` fixo com `name`.
- Texto animado: varios `<text>` sobrepostos, cada um visivel apenas no seu intervalo.
- Velocidade de escrita: `100ms` por caractere.
- Velocidade de apagamento: `50ms` por caractere.
- Pausa com texto completo: `1000ms`.
- Intervalo entre textos: `500ms`.
- Limites: `name` ate 120 caracteres, ate 12 textos em `anim`, cada texto de `anim` ate 80 caracteres.

## scripts

Requer Node.js 18.17 ou superior.

```bash
npm run dev
npm run build
npm run start
npm run lint
```
