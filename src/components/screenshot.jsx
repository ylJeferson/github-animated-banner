import puppeteer from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

export async function Options() {
  const isDev = !process.env.AWS_REGION
  let options

  const chromeExecPaths = {
    win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    linux: '/usr/bin/google-chrome',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  }
  
  const exePath = chromeExecPaths[process.platform]

  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true
    }
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    }
  }

  return options
}

let _page
async function Page() {
  if (_page) {
    return _page
  }

  const options = await Options()
  const browser = await puppeteer.launch(options)

  _page = await browser.newPage()

  return _page
}

export async function Screenshot(html, {width, height}) {
  const page = await Page()

  await page.setContent(html)
  await page.setViewport({width, height})

  const file = await page.screenshot({type: 'png', omitBackground: true})

  return file
}