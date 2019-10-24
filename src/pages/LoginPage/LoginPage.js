import React, { useState, useRef, Fragment } from 'react'
import { Cabecalho } from '../../components/Cabecalho/Cabecalho.js'
import { Widget } from '../../components/Widget/Widget.js'

import './loginPage.css'

import * as LoginService from '../../model/services/LoginService.js'

import { Redirect } from 'react-router-dom'

// Custom Hook
function useStateBoolean(valorInicial) {

    const [ valorDaVariavel, setValorDaVariavelReact ] = useState(valorInicial)

    const setValorDaVariavel = function(valorNovo) {
        if (typeof valorNovo !== "boolean"){
            throw Error("Tipo inválido: " + typeof valorNovo)
        }

        setValorDaVariavelReact(valorNovo)
    }

    return [
        valorDaVariavel,
        setValorDaVariavel
    ]
}

export function LoginPage(props) {

    const [ isValidUser, setIsValidUser ] = useStateBoolean(true)
    const [ isValidPass, setIsValidPass ] = useStateBoolean(true)
    const [ isValidLogin, setIsValidLogin ] = useStateBoolean(true)

    const isAuthenticated = LoginService.isAuthenticated()    

    const $inputLogin = useRef(null)
    const $inputSenha = useRef(null)

    function onFormSubmit(evento) {
        evento.preventDefault()
        
        const usuario = $inputLogin.current.value
        const senha = $inputSenha.current.value

        const isValidUser = usuario.length !== 0
        const isValidPass = senha.length !== 0

        setIsValidUser(isValidUser)
        setIsValidPass(isValidPass)

        if(isValidUser && isValidPass) {
            LoginService.logar(usuario, senha)
                .then(() => props.history.push('/'))
                .catch(error => setIsValidLogin(false))
        } else {
            setIsValidLogin(true)
        }
    }

    const $pagina = (
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
                            {
                                !isValidLogin 
                                    ? <div className="loginPage__errorBox">
                                        Usuário e/ou senha incorreto(a).
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

    return (
        <Fragment>
            {
                !isAuthenticated
                ? $pagina
                : <Redirect to="/" />
            }
        </Fragment>
    )
}