"use client"

import { useState, useRef, useEffect } from "react"
import "../styles/header.css"
import { ReactComponent as Logotextwhite } from "../assets/logotextwhite.svg";
import { ReactComponent as Logotextblack } from "../assets/logotextwhite.svg";
import { ReactComponent as Logoiconblack } from "../assets/logoiconblack.svg";
import { ReactComponent as Logoiconwhite} from "../assets/logoiconwhite.svg";
import { Search, CircleUserRound, ShoppingCart, Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef(null)
  const mobileSearchInputRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Close search when opening menu
    if (!isMenuOpen) setIsSearchOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    // Close menu when opening search on mobile
    if (!isSearchOpen && window.innerWidth <= 840) {
      setIsMenuOpen(false)
    }
  }

  // Focus the appropriate search input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      if (window.innerWidth <= 840) {
        if (mobileSearchInputRef.current) {
          mobileSearchInputRef.current.focus()
        }
      } else if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }
  }, [isSearchOpen])

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearchOpen &&
        !event.target.closest('.search-container') &&
        !event.target.closest('.mobile-search-overlay') &&
        !event.target.closest('.search-button')
      ) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Handle search submission
    const searchValue = window.innerWidth <= 840 
      ? mobileSearchInputRef.current?.value 
      : searchInputRef.current?.value
    
    console.log("Search submitted:", searchValue)
    setIsSearchOpen(false)
  }

  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="logo">
          <Logotextblack className="logotextsvg"/>
          <Logoiconblack className="logoiconsvg"/>
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
          <div className="search-container">
            <button 
              className="icon-button search-button" 
              onClick={toggleSearch}
              aria-label="Search"
            >
              {isSearchOpen ? <X size={24} /> : <Search size={24} />}
            </button>
            <form 
              className={`search-form ${isSearchOpen ? 'open' : ''}`}
              onSubmit={handleSearchSubmit}
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Szukaj produktów..."
                className="search-input"
              />
            </form>
          </div>
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

      {/* Mobile search overlay */}
      <div className={`mobile-search-overlay ${isSearchOpen ? 'open' : ''}`}>
        <form onSubmit={handleSearchSubmit}>
          <div className="mobile-search-container">
            <input
              ref={mobileSearchInputRef}
              type="text"
              placeholder="Szukaj produktów..."
              className="mobile-search-input"
            />
            <button type="submit" className="mobile-search-button">
              <Search size={20} />
            </button>
            <button 
              type="button" 
              className="mobile-search-close"
              onClick={() => setIsSearchOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </form>
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
