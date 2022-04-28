import { useEffect } from "react"


const Attributions = () => {

    useEffect(() =>{
        document.title ="Attributions"
    })

    return(
        <div>
            <h3>Resources Used</h3>
            <ul>
                <li><a href="https://pages.github.com/" target="_blank" rel="noreferrer">Github Pages</a></li>
                <li><a href="https://github.com/gitname/react-gh-pages" target="_blank" rel="noreferrer">react-gh-pages</a></li>
                <li><a href="https://fonts.google.com/specimen/Fira+Sans" target="_blank" rel="noreferrer">Fira Sans</a></li>
                <li><a href="https://favicon.io/" target="_blank" rel="noreferrer">favicon.io</a></li>
            </ul>
            <h3>Favico Emoji</h3>
            <p>Copyright 2020 Twitter, Inc and other contributors</p>
            <p>Code licensed under the MIT License: <a href="http://opensource.org/licenses/MIT" target="_blank" rel="noreferrer">http://opensource.org/licenses/MIT</a></p>
            <p>Graphics licensed under CC-BY 4.0: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">https://creativecommons.org/licenses/by/4.0/</a></p>
        </div>
    )
}

export default Attributions