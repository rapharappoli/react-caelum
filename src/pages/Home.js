import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import '../css/novoTweet.css'

import { Cabecalho,
    NavMenu,
    Dashboard,
    Widget,
    TrendsArea,
    Tweet
} from '../components/index.js'

import * as LoginService from '../model/services/LoginService.js'

export function Home() {

    const [ textoTweet, setTextoTweet ] = useState("")
    const [ listaTweets, setListaTweets ] = useState([])

    const isAuthenticated = LoginService.isAuthenticated()

    function tweetValidate(evento) {
        const $textArea = evento.target
        setTextoTweet($textArea.value)
    }

    function onFormSubmit(evento) {
        evento.preventDefault()

        setListaTweets([ textoTweet, ...listaTweets ])
    }

    const isValidTweet = textoTweet.length > 140
    const classeStatus = "novoTweet__status" + (isValidTweet ? " novoTweet__status--invalido" : "")

    const $pagina = (
        <React.Fragment>
            <Cabecalho>
                <NavMenu usuario="@usuario"/>
            </Cabecalho>

            <div className="container">

                <Dashboard>
                    <Widget>
                        <form className="novoTweet" onSubmit={ onFormSubmit }>
                            <div className="novoTweet__editorArea">
                                <span className={ classeStatus }>{ textoTweet.length }/140</span>
                                <textarea className="novoTweet__editor" placeholder="O que está acontecendo?" onChange={ tweetValidate }></textarea>
                            </div>
                            <button disabled={ isValidTweet } type="submit" className="novoTweet__envia">Tweetar</button>
                        </form>
                    </Widget>

                    <Widget>
                        <TrendsArea></TrendsArea>
                    </Widget>
                </Dashboard>

                <Dashboard posicao="centro">
                    <Widget>
                        <div className="tweetsArea">
                            { listaTweets.map(conteudo => (
                                <Tweet qtLikes={2}>
                                    {conteudo}
                                </Tweet>
                            )) }
                        </div>
                    </Widget>
                </Dashboard>

            </div>
        </React.Fragment>
    )

    return (
        <Fragment>
            {
                isAuthenticated
                ? $pagina
                : <Redirect to="/login" />
            }
        </Fragment>
    )
}