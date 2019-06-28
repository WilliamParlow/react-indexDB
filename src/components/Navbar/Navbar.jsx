import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <div className="navbar-wrapper-item logo-wrapper">
                    <h3 className="logo">TodoAPP</h3>
                </div>
                <div className="navbar-wrapper-item list-menu-itens-wrapper">
                    <ul className="navbar-list">
                        <li><Link to="/">Todo List</Link></li>
                        <li><Link to="/todo-calendar">Todo Calendar</Link></li>
                        <li><Link to="/todo-priority">Todo priority</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar
