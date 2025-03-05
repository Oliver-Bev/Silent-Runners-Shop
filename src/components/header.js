"use client"

import { useState } from "react"
import "../styles/header.css"
import { Search, CircleUserRound, ShoppingCart, Menu, X } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="logo">
          <img src="/path-to-your-logo.png" alt="Logo" />
        </div>
        <div className="content">
          <ul>
            <li>
              <a href="#nowe">Nowe</a>
            </li>
            <li>
              <a href="#mezczyzna">Mężczyzna</a>
            </li>
            <li>
              <a href="#kobieta">Kobieta</a>
            </li>
            <li>
              <a href="#dziecko">Dziecko</a>
            </li>
            <li>
              <a href="#wyprzedaz">Wyprzedaż</a>
            </li>
          </ul>
        </div>
        <div className="icons">
          <button className="icon-button">
            <Search />
          </button>
          <button className="icon-button">
            <CircleUserRound />
          </button>
          <button className="icon-button">
            <ShoppingCart />
          </button>
          <button className="icon-button menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#nowe" onClick={toggleMenu}>
              Nowe
            </a>
          </li>
          <li>
            <a href="#mezczyzna" onClick={toggleMenu}>
              Mężczyzna
            </a>
          </li>
          <li>
            <a href="#kobieta" onClick={toggleMenu}>
              Kobieta
            </a>
          </li>
          <li>
            <a href="#dziecko" onClick={toggleMenu}>
              Dziecko
            </a>
          </li>
          <li>
            <a href="#wyprzedaz" onClick={toggleMenu}>
              Wyprzedaż
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header

