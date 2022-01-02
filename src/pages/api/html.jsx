import {getScreenshot} from '../../components/getScreenshot'

const HTMLCode = ({bgcolor, name, namefont, namecolor, anim, animfont, animcolor}) => `
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=${namefont.split(" ").join("+")}&#38;family=${animfont.split(" ").join("+")}">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${namefont.split(" ").join("+")}&#38;family=${animfont.split(" ").join("+")}">

      <style>
        html {
          width: 100%;
          height: 333px;
        }

        .container {
          width: 100%;
          height: 333px;

          background-color: ${bgcolor};
        
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
        }
        
        .name {
          font-size: 7em;
          font-weight: bold;
          color: ${namecolor};
          font-family: ${namefont};
        }
        
        .anim {
          font-size: 3em;
          font-weight: normal;
          color: ${animcolor};
          font-family: ${animfont};
        }
      </style>
    </head>

    <body>
      <div class="container">
        <div class="box">
          <div id="name" class="name">${name}</div>
          <div id="anim" class="anim">&#160;${anim.split(";").join(" ")}</div>
        </div>
      </div>
    </body>
  </html>
`

export default async (req, res) => {
  const isHTMLDebugMode = false
  const html = HTMLCode({
    bgcolor: req.query.bgcolor || "transparent",
  
    name: req.query.name || "Jeferson",
    namefont: req.query.namefont || "Tangerine",
    namecolor: req.query.namecolor || "#ff5779",
  
    anim: req.query.anim || "In;search;of;development",
    animfont: req.query.animfont || "Varela Round",
    animcolor: req.query.animcolor || "#6941d3"
  })
  
  if (isHTMLDebugMode) {
    res.setHeader('Content-Type', 'text/html')
    return res.end(html)
  }

  const file = await getScreenshot(html, {width: 1920, height: 333})

  res.setHeader('Content-Type', 'image/gif')
  res.end(file)
}

/*
<script>
  let EraseSpeed = 50
  let WriteSpeed = 100
  let SliceMaxIndex = 6
  let CharactersInBanner = ""
  let WaitingTimetoRestart = 500
  let WaitingTimetoContinue = 1000
  let CurrentWordSplittedAndInverted = ""
  let ElementToAnimate = document.getElementById("anim")

  var Words = "${anim}".split(";").filter((a) => a)
  Animation(Words)

  function Animation(Words) {
    var i = -1
    VerifyWords()

    function VerifyWords() {
      if (i < Words.length - 1) {i++} else {i = 0};

      CharactersInBanner = "&#160;"
      CurrentWordSplittedAndInverted = Words[i].split("").reverse()
      return Write()
    }
  
    function Write() {
        var writing = setInterval(function() {
          CharactersInBanner += CurrentWordSplittedAndInverted.pop()
          ElementToAnimate.innerHTML = CharactersInBanner

          if (!CurrentWordSplittedAndInverted.length) {
              clearInterval(writing)
              return setTimeout(Erase, WaitingTimetoContinue)
          }
        }, WriteSpeed);
    }

    function Erase() {
        var sliceIndex = CharactersInBanner.length;

        var erasing = setInterval(function() {
          ElementToAnimate.innerHTML = CharactersInBanner.slice(0, sliceIndex)

          if (sliceIndex-- == SliceMaxIndex) {
              clearInterval(erasing)
              return setTimeout(VerifyWords, WaitingTimetoRestart)
          }
        }, EraseSpeed);
    }
  }
</script>
*/