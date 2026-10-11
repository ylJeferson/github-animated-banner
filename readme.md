<p align="center">
  <img src="https://github-animated-banner.vercel.app/api?bgcolor=transparent&name=GitHub%20Animated%20Banner&namefont=Tangerine&namecolor=%23ff5779&anim=Animated%20SVG%20banners%20for%20GitHub%20READMEs&animfont=Varela%20Round&animcolor=%236941d3&namefontsize=8rem&animfontsize=4em&v=3" alt="GitHub Animated Banner">
</p>

<h1 align="center">GitHub Animated Banner</h1>

---

A customizable SVG banner generator that types and erases your text in a loop, ready to embed in a GitHub README with a single image URL.

<p align="center">
  <a href="https://github.com/ylJeferson/github-animated-banner/archive/refs/heads/main.zip">Download</a>
  ·
  <a href="https://github.com/ylJeferson/github-animated-banner/issues/new">Report a Bug</a>
  ·
  <a href="https://github.com/ylJeferson/github-animated-banner/issues/new">Suggest an Idea</a>
</p>

Support the project with a [donation](https://www.paypal.me/yljeferson).

## Features

- Generate an animated SVG from URL parameters.
- Customize the title, phrases, colors, font families, and font sizes.
- Cycle through phrases with typing, pause, and erasing effects.
- Embed the animation directly in GitHub READMEs.
- Preview a banner and copy its image URL or Markdown from the [demo](https://github-animated-banner.vercel.app/demo).

### URL Parameters

| Parameter | Description | Default |
| --- | --- | --- |
| `bgcolor` | Background color | `transparent` |
| `name` | Fixed title, up to 120 characters | `Jeferson` |
| `namecolor` | Title color | `#ff5779` |
| `namefont` | Title font family | `Tangerine` |
| `namefontsize` | Title font size | `7em` |
| `anim` | Up to 12 phrases separated by `;`, each up to 80 characters | `Learning;Building;Improving` |
| `animcolor` | Animated text color | `#6941d3` |
| `animfont` | Animated text font family | `Varela Round` |
| `animfontsize` | Animated text font size | `3em` |

URL-encode special characters, including spaces (`%20`), `#` (`%23`), and `&` (`%26`). Font sizes accept CSS units such as `px`, `em`, and `rem`. Unavailable fonts fall back to `sans-serif`.

### Animation

The `/api` endpoint validates query parameters, applies defaults and text limits, and escapes XML. Each phrase becomes a sequence of progressively longer and shorter text frames. CSS keyframes inside the SVG control when each frame appears.

The response uses `Content-Type: image/svg+xml; charset=utf-8`. The animation runs inside the image without client-side JavaScript, Chromium, or screenshot generation.

- Canvas: `1920 x 333` pixels.
- Typing: `100 ms` per character.
- Erasing: `50 ms` per character.
- Pause after a complete phrase: `1000 ms`.
- Gap before the next phrase: `500 ms`.
- A fixed title, transparent or colored background, and blinking cursor.

## Project Structure

- `src/pages/api/index.jsx`: `/api` endpoint that generates and returns the animated SVG.
- `src/pages/demo/index.jsx`: browser demo with a React text animation and link controls.
- `src/pages/_document.jsx`: HTML document with English language metadata.
- `src/pages/index.jsx`: redirect to the author's `github-banner` repository.
- `src/styles/demo.module.css`: demo styles.
- `src/styles/globals.css`: global styles.
- `public/`: static assets.
- `package.json`: scripts and dependencies.
- [`guideline.md`](guideline.md): permanent project guidelines, including the English language requirement.

## Installation and Usage

### Local Development

Requires Node.js `24.x` and npm.

```bash
git clone https://github.com/ylJeferson/github-animated-banner.git
cd github-animated-banner
npm ci
npm run dev
```

Open `http://localhost:3000/demo` for the demo or `http://localhost:3000/api` for the SVG. The root URL redirects to the author's repository.

Validate and run a production build with:

```bash
npm run lint
npm run build
npm run start
```

### GitHub README

Add this Markdown to your profile or repository README, then replace `name` and the phrases in `anim` with your own text:

```md
[![GitHub Banner](https://github-animated-banner.vercel.app/api?bgcolor=transparent&name=Jeferson&namefont=Tangerine&namecolor=%23ff5779&anim=Learning;Building;Improving&animfont=Varela%20Round&animcolor=%236941d3&namefontsize=7em&animfontsize=3em&v=3)](https://github.com/ylJeferson/github-animated-banner)
```

[![GitHub Banner](https://github-animated-banner.vercel.app/api?bgcolor=transparent&name=Jeferson&namefont=Tangerine&namecolor=%23ff5779&anim=Learning;Building;Improving&animfont=Varela%20Round&animcolor=%236941d3&namefontsize=7em&animfontsize=3em&v=3)](https://github.com/ylJeferson/github-animated-banner)

For multi-word phrases, use `anim=Open%20source;Always%20learning;Building%20useful%20tools`. The optional `v` query parameter changes the image URL to refresh cached README images; it does not change the animation.

## Technologies

- Node.js 24.
- Next.js 14 and React 18.
- SVG and CSS keyframes.
- ESLint.
- Vercel hosting.

## License

Released under the [MIT License](LICENSE).

## Author

[Jeferson Hugo da Silva](https://github.com/ylJeferson)
