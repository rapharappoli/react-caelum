import React, { useState, useRef, Fragment } from 'react'
import { Cabecalho } from '../../components/Cabecalho/Cabecalho.js'
import { Widget } from '../../components/Widget/Widget.js'

import './loginPage.css'

export function LoginPage() {

    const [ isValidUser, setIsValidUser ] = useState(true)
    const [ isValidPass, setIsValidPass ] = useState(true)

    const $inputLogin = useRef(null)
    const $inputSenha = useRef(null)

    function onFormSubmit(evento) {
        evento.preventDefault()
        
        const usuario = $inputLogin.current.value
        const senha = $inputSenha.current.value

        const isInvalidUser = usuario.length === 0
        const isInvalidPass = senha.length === 0

        setIsValidUser(!isInvalidUser)
        setIsValidPass(!isInvalidPass)
    }

    return (
        <Fragment>
            <Cabecalho />
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h2 className="loginPage__title">Seja bem vindo!</h2>
                        <form className="loginPage__form" action="/" onSubmit={ onFormSubmit }>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Usuário</label> 
                                <input ref={ $inputLogin } className="loginPage__input" type="text" id="login" name="login"/>
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                <input ref={ $inputSenha } className="loginPage__input" type="password" id="senha" name="senha"/>
                            </div>
                            {
                                !isValidUser 
                                    ? <div className="loginPage__errorBox">
                                        Usuário inválido.
                                      </div>
                                    : ''
                            }
                            {
                                !isValidPass 
                                    ? <div className="loginPage__errorBox">
                                        Senha inválida.
                                        </div>
                                    : ''
                            }
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        </Fragment>
    )
}