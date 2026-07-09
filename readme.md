<p align="center">
  <img src="https://github-animated-banner.vercel.app/api?bgcolor=transparent&name=GitHub%20Animated%20Banner&namefont=Tangerine&namecolor=%23ff5779&anim=SVGs%20animados%20para%20READMEs&animfont=Varela%20Round&animcolor=%236941d3&namefontsize=8rem&animfontsize=4em&v=2" alt="GitHub Animated Banner">
</p>

<h1 align="center">github-animated-banner</h1>

---

Gerador de banners SVG animados e customizaveis para READMEs do GitHub.

<p align="center">
  <a href="https://github.com/ylJeferson/github-animated-banner/issues/new">Reportar Bug</a>
  ·
  <a href="https://github.com/ylJeferson/github-animated-banner/issues/new">Sugerir Ideias</a>
</p>

## funcionalidades

- Gera SVG animado por URL.
- Personaliza textos, cores, fontes e tamanhos.
- Simula escrita, pausa e apagamento em loop.
- Funciona diretamente em READMEs do GitHub.

## estrutura

- `src/pages/api/index.jsx`: endpoint `/api`; recebe parametros por query string, gera um SVG animado e retorna uma imagem.
- `src/pages/demo/index.jsx`: pagina de demo; anima o texto no navegador usando React e `setInterval`.
- `src/pages/index.jsx`: redireciona para outro repositorio.
- `src/styles/demo.module.css`: estilos da pagina de demo.
- `src/styles/globals.css`: estilos globais.
- `public/`: assets estaticos.
- `package.json`: scripts Next.js e dependencias.

## uso no README do GitHub

```md
[![GitHub Banner](https://github-animated-banner.vercel.app/api?bgcolor=transparent&name=Jeferson&namefont=Tangerine&namecolor=%23ff5779&anim=Sempre%20em%20busca%20do%20autodesenvolvimento&animfont=Varela%20Round&animcolor=%236941d3&namefontsize=10rem&animfontsize=5em&v=2)](https://github.com/ylJeferson/github-animated-banner)
```

[![GitHub Banner](https://github-animated-banner.vercel.app/api?bgcolor=transparent&name=Jeferson&namefont=Tangerine&namecolor=%23ff5779&anim=Sempre%20em%20busca%20do%20autodesenvolvimento&animfont=Varela%20Round&animcolor=%236941d3&namefontsize=10rem&animfontsize=5em&v=2)](https://github.com/ylJeferson/github-animated-banner)

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

Requer Node.js 24.x.

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## diretrizes

As diretrizes especificas do projeto estao em [`guideline.md`](guideline.md).

## licença

Consulte [`LICENSE`](LICENSE).

## autor

[Jeferson Hugo da Silva](https://github.com/ylJeferson)
