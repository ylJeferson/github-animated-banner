export default SVG;

function SVG(req, res) {
  const bgcolor = req.query.bgcolor || 'transparent'

  const name = req.query.name || 'Jeferson'
  const namefont = req.query.namefont || 'Tangerine'
  const namecolor = req.query.namecolor || '#ff5779'

  const anim = req.query.anim || 'In;search;of;development'
  const animfont = req.query.animfont || 'Varela Round'
  const animcolor = req.query.animcolor || '#6941d3'

  const SVGCode = `
    <svg width="100%" height="211" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css2?family=${namefont.split(' ').join('+')}&#38;family=${animfont.split(' ').join('+')}&#38;display=swap);

        svg {
          // stroke: red;
          // stroke-width: 1px;
          // border-radius: 30px;
          // border: #000 dotted 3px;
          background-color: ${bgcolor};
        }
        
        .name {
          font-size: 7em;
          font-weight: bold;
          fill: ${namecolor};
          font-family: ${namefont};
        }
        
        .anim {
          font-size: 3em;
          fill: ${animcolor};
          font-weight: normal;
          font-family: ${animfont};
        }
      </style>
      
      <text dominant-baseline="middle" text-anchor="middle" x="50%" y="40%" id="name" class="name">${name}</text>
      <text dominant-baseline="middle" text-anchor="middle" x="50%" y="70%" id="anim" class="anim">${anim.split(';').join(' ')}</text>

      <script>
        let EraseSpeed = 50
        let WriteSpeed = 100
        let SliceMaxIndex = 0
        let CharactersInBanner = ''
        let WaitingTimetoRestart = 500
        let WaitingTimetoContinue = 1000
        let CurrentWordSplittedAndInverted = ''
        let ElementToAnimate = document.getElementById('anim')

        var Words = '${anim}'.split(';').filter((a) => a)
        Animation(Words)

        function Animation(Words) {
          var i = -1

          VerifyWords()

          function VerifyWords() {
            if (i &#60; Words.length - 1) {i++} else {i = 0};

            CharactersInBanner = ''
            CurrentWordSplittedAndInverted = Words[i].split('').reverse()
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
    </svg>
  `

  res.setHeader("Content-Type", "image/svg+xml")
  return res.send (SVGCode)
}