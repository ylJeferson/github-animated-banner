import {useEffect, useState} from 'react'
import Head from 'next/head'
import style from '../../styles/demo.module.css'

export default function Demo() {
    const [animation, setAnimation] = useState({index: -1, value: ''})
    const [datafield, setDataField] = useState({bgcolor: '', name: '', namefont: '', namecolor: '', anim: '', animfont: '', animcolor: ''});
    const [banner, setBanner] = useState({bgcolor: 'transparent', name: 'Hello, I\'m Jeferson', namefont: 'Tangerine', namecolor: '#ff5779', anim: ['Create your own banner', 'Add it to your GitHub profile', 'Make it your own', 'Star the project on GitHub', 'Thanks for stopping by'], animfont: 'Varela Round', animcolor: '#6941d3'});

    function ChangeDataField(e) {
        setDataField({...datafield, [e.target.name]: e.target.value})
    }

    function CapitalizeString(string) 
    {
        const arrString = string.split(' ')
        
        for (var i = 0; i < arrString.length; i++) {
            arrString[i] = arrString[i].charAt(0).toUpperCase() + arrString[i].slice(1)
        }

        return arrString.join(' ');
    }
    
    function Preview() {
        if (datafield.bgcolor == '') {datafield.bgcolor = banner.bgcolor}

        if (datafield.name == '') {datafield.name = banner.name}
        if (datafield.namefont == '') {datafield.namefont = banner.namefont}
        if (datafield.namecolor == '') {datafield.namecolor = banner.namecolor}
        
        if (datafield.anim == '') {datafield.anim = banner.anim.join(";")}
        if (datafield.animfont == '') {datafield.animfont = banner.animfont}
        if (datafield.animcolor == '') {datafield.animcolor = banner.animcolor}

        setBanner({bgcolor: datafield.bgcolor, name: datafield.name, namefont: CapitalizeString(datafield.namefont), namecolor: datafield.namecolor, anim: datafield.anim.split(";").filter((a) => a), animfont: CapitalizeString(datafield.animfont), animcolor: datafield.animcolor})
        setDataField({bgcolor: '', name: '', namefont: '', namecolor: '', anim: '', animfont: '', animcolor: ''})
        setAnimation({...animation, index: -1})
    }
    
    function TestLink() {
        navigator.clipboard.writeText((window.location.origin + '/api' + '?bgcolor=' + banner.bgcolor + '&name=' + banner.name + '&namefont=' + banner.namefont + '&namecolor=' + banner.namecolor + '&anim=' + banner.anim.join(";") + '&animfont=' + banner.animfont + '&animcolor=' + banner.animcolor).replaceAll(' ', '%20').replaceAll('#', '%23'));
    }
    
    function GitHubLink() {
        let Link = ((window.location.origin + '/api' + '?bgcolor=' + banner.bgcolor + '&name=' + banner.name + '&namefont=' + banner.namefont + '&namecolor=' + banner.namecolor + '&anim=' + banner.anim.join(";") + '&animfont=' + banner.animfont + '&animcolor=' + banner.animcolor).replaceAll(' ', '%20').replaceAll('#', '%23'))
        navigator.clipboard.writeText('[![' + banner.name + '\'s GitHub Banner](' + Link + ')](https://github.com/ylJeferson/github-animated-banner)')
    }

    function WriteONOFFAnimation() {
        let EraseSpeed = 50
        let WriteSpeed = 100
        let SliceMaxIndex = 0
        let charactersInBanner = ''
        let WaitingTimetoRestart = 500
        let WaitingTimetoContinue = 1000
        let currentSplitWordInverted = ''

        VerifyWords()

        function VerifyWords() {
            if (animation.idxWords < banner.anim.length - 1) {animation.idxWords++} else {animation.idxWords = 0}

            charactersInBanner = ''
            currentSplitWordInverted = banner.anim[animation.idxWords].split('').reverse()
            return setTimeout(Write, WaitingTimetoRestart)
        }
        
        function Write() {
            var writing = setInterval(function() {
                charactersInBanner += currentSplitWordInverted.pop()
                setAnimation({...animation, value: charactersInBanner})

                if (!currentSplitWordInverted.length) {
                    clearInterval(writing)
                    return setTimeout(Erase, WaitingTimetoContinue)
                }
            }, WriteSpeed);
        }
    
        function Erase() {
            var sliceIndex = charactersInBanner.length;
    
            var erasing = setInterval(function() {
                setAnimation({...animation, value: charactersInBanner.slice(0, sliceIndex)})

                if (sliceIndex-- == SliceMaxIndex) {
                    clearInterval(erasing)
                }
            }, EraseSpeed);
        }
    }
    
    useEffect(() => {
        if (!animation.value) {
            WriteONOFFAnimation()
        }
    }, [animation.value])

    return (
        <div className={style.window}>
            <Head>
                <title>GitHub Animated Banner</title>
                <meta name='description' content='Create a customizable animated SVG banner for your GitHub README.' />
            </Head>
            <link rel='stylesheet' href={'https://fonts.googleapis.com/css2?family=' + banner.namefont + '&display=swap'}></link>
            <link rel='stylesheet' href={'https://fonts.googleapis.com/css2?family=' + banner.animfont + '&display=swap'}></link>

            <div className={style.form}>
                <div className={style.manual}>
                    <h1 className={style.titles}>Instructions</h1>
                    <ol className={style.list}>
                        <li className={style.topics}>&#39;Title&#39; sets the fixed text.</li>
                        <li className={style.topics}>Separate animated phrases with &#39;;&#39;.</li>
                        <li className={style.topics}>Each section has its own font and text color.</li>
                        <li className={style.topics}>&#39;Preview&#39; applies your changes.</li>
                        <li className={style.topics}>&#39;Copy Image URL&#39; copies the image link; &#39;Copy Markdown&#39; copies the README snippet.</li>
                    </ol>
                </div>

                <div className={style.inputs}>
                    <h1 className={style.titles}>Banner Settings</h1>
                    <input className={style.bgcolor} onChange={ChangeDataField} value={datafield.bgcolor} id='bgcolor' name='bgcolor' placeholder='Background color'></input>

                    <div className={style.dataarea}>
                        <div className={style.namearea}>
                            <h2 className={style.titles}>Title</h2>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.name} name='name' placeholder='Johnson Kutzniack'></input>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.namefont} name='namefont' placeholder='Google Fonts family'></input>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.namecolor} name='namecolor' placeholder='Text color'></input>
                        </div>

                        <div className={style.wordsarea}>
                            <h2 className={style.titles}>Animated Phrases</h2>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.anim} name='anim' placeholder='Learning;Building;Improving'></input>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.animfont} name='animfont' placeholder='Google Fonts family'></input>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.animcolor} name='animcolor' placeholder='Text color'></input>
                        </div>
                    </div>
                </div>

                <button className={style.buttons} onClick={Preview}>Preview</button>
                <button className={style.buttons} onClick={TestLink}>Copy Image URL</button>
                <button className={style.buttons} onClick={GitHubLink}>Copy Markdown</button>
            </div>

            <div className={style.container} style={{backgroundColor: banner.bgcolor}}>
                <div className={style.box}>
                    <div className={style.name} style={{fontFamily: banner.namefont, color: banner.namecolor}}>{banner.name}</div>
                    <div className={style.anim} style={{fontFamily: banner.animfont, color: banner.animcolor}}>&#160;{animation.value}</div>
                </div>
            </div>
        </div>
    )
}
