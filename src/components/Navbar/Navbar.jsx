import React, { Component } from 'react'
import './Navbar.css'

export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <div className="navbar-wrapper-item logo-wrapper">
                    <h3 className="logo">My React APP</h3>
                </div>
                <div className="navbar-wrapper-item list-menu-itens-wrapper">
                    <ul className="navbar-list">
                    <li><a href="#">Person</a></li>
                        <li><a href="#">Car</a></li>
                        <li><a href="#">Nothing</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar
