const WIDTH = 1920
const HEIGHT = 333
const NAME_Y = 120
const ANIM_Y = 245

const WRITE_SPEED = 100
const ERASE_SPEED = 50
const WORD_PAUSE = 1000
const WORD_GAP = 500

const DEFAULTS = {
  bgcolor: 'transparent',
  name: 'Jeferson',
  namecolor: '#ff5779',
  namefont: 'Tangerine',
  namefontsize: '7em',
  anim: 'In;search;of;development',
  animcolor: '#6941d3',
  animfont: 'Varela Round',
  animfontsize: '3em'
}

function queryValue(value, fallback) {
  const normalizedValue = Array.isArray(value) ? value[0] : value

  if (typeof normalizedValue !== 'string' || normalizedValue.trim() === '') {
    return fallback
  }

  return normalizedValue.trim()
}

function limitText(value, maxLength) {
  return Array.from(value).slice(0, maxLength).join('')
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function sanitizeColor(value, fallback) {
  const color = String(value).trim()
  const isHex = /^#[0-9a-f]{3,8}$/i.test(color)
  const isNamed = /^[a-z]+$/i.test(color)
  const isRgb = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i.test(color)
  const isHsl = /^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i.test(color)

  return isHex || isNamed || isRgb || isHsl ? color : fallback
}

function sanitizeFontFamily(value, fallback) {
  const fontFamily = String(value)
    .replace(/[^a-z0-9\s,_-]/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

  return fontFamily || fallback
}

function sanitizeFontSize(value, fallback) {
  const fontSize = String(value).trim()
  const isValidSize = /^\d+(?:\.\d+)?(?:px|em|rem|%|pt|pc|in|cm|mm|vh|vw|vmin|vmax)?$/i.test(fontSize)

  return isValidSize ? fontSize : fallback
}

function googleFontFamily(fontFamily) {
  return fontFamily.split(',')[0].trim().replace(/\s+/g, '+')
}

function getBannerOptions(query) {
  return {
    bgcolor: sanitizeColor(queryValue(query.bgcolor, DEFAULTS.bgcolor), DEFAULTS.bgcolor),
    name: limitText(queryValue(query.name, DEFAULTS.name), 120),
    namecolor: sanitizeColor(queryValue(query.namecolor, DEFAULTS.namecolor), DEFAULTS.namecolor),
    namefont: sanitizeFontFamily(queryValue(query.namefont, DEFAULTS.namefont), DEFAULTS.namefont),
    namefontsize: sanitizeFontSize(queryValue(query.namefontsize, DEFAULTS.namefontsize), DEFAULTS.namefontsize),
    anim: queryValue(query.anim, DEFAULTS.anim),
    animcolor: sanitizeColor(queryValue(query.animcolor, DEFAULTS.animcolor), DEFAULTS.animcolor),
    animfont: sanitizeFontFamily(queryValue(query.animfont, DEFAULTS.animfont), DEFAULTS.animfont),
    animfontsize: sanitizeFontSize(queryValue(query.animfontsize, DEFAULTS.animfontsize), DEFAULTS.animfontsize)
  }
}

function getWords(anim) {
  const words = anim
    .split(';')
    .map((word) => limitText(word.trim(), 80))
    .filter(Boolean)
    .slice(0, 12)

  return words.length ? words : DEFAULTS.anim.split(';')
}

function getAnimationFrames(words) {
  return words.flatMap((word) => {
    const chars = Array.from(word)
    const writeFrames = chars.map((_, index) => ({
      text: chars.slice(0, index + 1).join(''),
      duration: WRITE_SPEED
    }))
    const eraseFrames = chars.slice(0, -1).map((_, index) => ({
      text: chars.slice(0, chars.length - index - 1).join(''),
      duration: ERASE_SPEED
    }))

    return [
      {text: '', duration: WORD_GAP},
      ...writeFrames,
      {text: word, duration: WORD_PAUSE},
      ...eraseFrames,
      {text: '', duration: ERASE_SPEED}
    ]
  })
}

function formatPercent(value) {
  return Number(value.toFixed(4))
}

function frameKeyframes(index, start, end, total) {
  const startPercent = formatPercent((start / total) * 100)
  const endPercent = formatPercent((end / total) * 100)
  const beforeStart = formatPercent(Math.max(startPercent - 0.001, 0))
  const afterEnd = formatPercent(Math.min(endPercent + 0.001, 100))

  if (startPercent === 0) {
    return `
@keyframes frame-${index} {
  0%, ${endPercent}% { opacity: 1; }
  ${afterEnd}%, 100% { opacity: 0; }
}`
  }

  if (endPercent === 100) {
    return `
@keyframes frame-${index} {
  0%, ${beforeStart}% { opacity: 0; }
  ${startPercent}%, 100% { opacity: 1; }
}`
  }

  return `
@keyframes frame-${index} {
  0%, ${beforeStart}% { opacity: 0; }
  ${startPercent}%, ${endPercent}% { opacity: 1; }
  ${afterEnd}%, 100% { opacity: 0; }
}`
}

function getAnimatedText(frames, totalDuration) {
  let elapsed = 0
  const visibleFrames = []

  frames.forEach((frame) => {
    const start = elapsed
    const end = elapsed + frame.duration

    if (frame.text) {
      visibleFrames.push({...frame, start, end})
    }

    elapsed = end
  })

  const keyframes = visibleFrames
    .map((frame, index) => frameKeyframes(index, frame.start, frame.end, totalDuration))
    .join('\n')
  const classRules = visibleFrames
    .map((_, index) => `.frame-${index} { animation-name: frame-${index}; }`)
    .join('\n')

  const textElements = visibleFrames
    .map((frame, index) => `
    <text class="animated-text frame-${index}" x="${WIDTH / 2}" y="${ANIM_Y}" text-anchor="middle" dominant-baseline="middle" xml:space="preserve">${escapeXml(frame.text)}<tspan class="cursor">|</tspan></text>`)
    .join('')

  return {classRules, keyframes, textElements}
}

function generateAnimatedSvg(query) {
  const options = getBannerOptions(query)
  const words = getWords(options.anim)
  const frames = getAnimationFrames(words)
  const totalDuration = frames.reduce((total, frame) => total + frame.duration, 0)
  const {classRules, keyframes, textElements} = getAnimatedText(frames, totalDuration)
  const fontImport = [
    googleFontFamily(options.namefont),
    googleFontFamily(options.animfont)
  ].filter(Boolean).map((font) => `family=${font}`).join('&')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(options.name)} animated GitHub banner</title>
  <desc id="desc">Animated banner that types and erases: ${escapeXml(words.join(', '))}</desc>
  <style><![CDATA[
    @import url('https://fonts.googleapis.com/css2?${fontImport}&display=swap');

    .name {
      fill: ${options.namecolor};
      font-family: "${options.namefont}", sans-serif;
      font-size: ${options.namefontsize};
      font-weight: 700;
    }

    .animated-text {
      animation-duration: ${totalDuration}ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      fill: ${options.animcolor};
      font-family: "${options.animfont}", sans-serif;
      font-size: ${options.animfontsize};
      font-weight: 400;
      opacity: 0;
    }

    .cursor {
      animation: cursor-blink 700ms steps(1) infinite;
    }

    @keyframes cursor-blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }

${keyframes}
${classRules}
  ]]></style>
  <rect width="100%" height="100%" fill="${escapeXml(options.bgcolor)}"/>
  <text class="name" x="${WIDTH / 2}" y="${NAME_Y}" text-anchor="middle" dominant-baseline="middle">${escapeXml(options.name)}</text>${textElements}
</svg>`
}

export default function handler(req, res) {
  const svg = generateAnimatedSvg(req.query)

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400')
  res.status(200).send(svg)
}
