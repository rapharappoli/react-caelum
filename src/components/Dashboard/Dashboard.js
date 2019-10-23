import React from 'react'
import './dashboard.css'

function Dashboard(props) {
    return (
        <div className={`dashboard ${props.posicao === "centro" ? "dashboard__centro" : ""}`}>
            {props.children}
        </div>
    )
}

export { Dashboard }