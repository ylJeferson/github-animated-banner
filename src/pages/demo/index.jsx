import {useEffect, useState} from 'react'
import style from '../../styles/demo.module.css'

export default function Demo() {
    const [animation, setAnimation] = useState({index: -1, value: ''})
    const [datafield, setDataField] = useState({bgcolor: '', name: '', namefont: '', namecolor: '', anim: '', animfont: '', animcolor: ''});
    const [banner, setBanner] = useState({bgcolor: 'transparent', name: 'Jeferson', namefont: 'Tangerine', namecolor: '#ff5779', anim: ['In search of development', 'Enjoy!!!'], animfont: 'Varela Round', animcolor: '#6941d3'});

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
    
    function Link() {
        navigator.clipboard.writeText((window.location.origin + '/api' + '?bgcolor=' + banner.bgcolor + '&name=' + banner.name + '&namefont=' + banner.namefont + '&namecolor=' + banner.namecolor + '&anim=' + banner.anim.join(";") + '&animfont=' + banner.animfont + '&animcolor=' + banner.animcolor).replaceAll(' ', '%20').replaceAll('#', '%23'));
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
            <link rel='stylesheet' href={'https://fonts.googleapis.com/css2?family=' + banner.namefont + '&display=swap'}></link>
            <link rel='stylesheet' href={'https://fonts.googleapis.com/css2?family=' + banner.animfont + '&display=swap'}></link>

            <div className={style.form}>
                <div className={style.manual}>
                    <h1 className={style.titles}>Instructions</h1>
                    <ol className={style.list}>
                        <li className={style.topics}>'Name' changes the title.</li>
                        <li className={style.topics}>'Words' must be separated by ';' to change the animated text</li>
                        <li className={style.topics}>'Font 1' changes the title font.</li>
                        <li className={style.topics}>'Font 2' changes the font of the animated text.</li>
                        <li className={style.topics}>Clicking the 'Link' button will copy the URL with the datafield of your modifications to your Clicking.</li>
                    </ol>
                </div>

                <div className={style.inputs}>
                    <h1 className={style.titles}>Data Fields</h1>
                    <input className={style.bgcolor} onChange={ChangeDataField} value={datafield.bgcolor} id='bgcolor' name='bgcolor' placeholder='Background Color'></input>

                    <div className={style.dataarea}>
                        <div className={style.namearea}>
                            <h2 className={style.titles}>Name</h2>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.name} name='name' placeholder='Johnson Kutzniack'></input>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.namefont} name='namefont' placeholder='Google Font Name'></input>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.namecolor} name='namecolor' placeholder='Color'></input>
                        </div>

                        <div className={style.wordsarea}>
                            <h2 className={style.titles}>Words</h2>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.anim} name='anim' placeholder='Word 1;Word2;Word3...'></input>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.animfont} name='animfont' placeholder='Google Font Name'></input>
                            <input className={style.changedata} onChange={ChangeDataField} value={datafield.animcolor} name='animcolor' placeholder='Color'></input>
                        </div>
                    </div>
                </div>

                <button className={style.buttons} onClick={Preview}>Preview</button>
                <button className={style.buttons} onClick={Link}>Link</button>
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