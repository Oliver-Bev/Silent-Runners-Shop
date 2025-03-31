"use client"
import { useState, useRef, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "../styles/header.css"
import Men from "../pages/men"
import { ReactComponent as Logotextwhite } from "../assets/logotextwhite.svg";
import { ReactComponent as Logotextblack } from "../assets/logotextwhite.svg";
import { ReactComponent as Logoiconblack } from "../assets/logoiconblack.svg";
import { ReactComponent as Logoiconwhite} from "../assets/logoiconwhite.svg";
import { Search, CircleUserRound, ShoppingCart, Menu, X, ChevronRight, ChevronLeft } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef(null)
  const mobileSearchInputRef = useRef(null)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileNavHistory, setMobileNavHistory] = useState([])
  const [currentMobileCategory, setCurrentMobileCategory] = useState(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      setIsSearchOpen(false)
      // Reset mobile navigation when opening menu
      setMobileNavHistory([])
      setCurrentMobileCategory(null)
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen && window.innerWidth <= 840) {
      setIsMenuOpen(false)
    }
  }

  const handleMouseEnter = (category) => {
    setActiveDropdown(category)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  // Mobile navigation handlers
  const navigateToMobileCategory = (category) => {
    setMobileNavHistory([...mobileNavHistory, currentMobileCategory || 'main'])
    setCurrentMobileCategory(category)
  }

  const navigateBackMobile = () => {
    if (mobileNavHistory.length > 0) {
      const previousCategory = mobileNavHistory[mobileNavHistory.length - 1]
      setCurrentMobileCategory(previousCategory === 'main' ? null : previousCategory)
      setMobileNavHistory(mobileNavHistory.slice(0, -1))
    } else {
      setCurrentMobileCategory(null)
    }
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setMobileNavHistory([])
    setCurrentMobileCategory(null)
  }

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

    const searchValue = window.innerWidth <= 840 
      ? mobileSearchInputRef.current?.value 
      : searchInputRef.current?.value
    
    console.log("Search submitted:", searchValue)
    setIsSearchOpen(false)
  }

  // Dropdown menu content
  const menuStructure = {
    main: {
      title: "Wszystko",
      items: [
        { label: "Nowe i polecane", id: "nowe" },
        { label: "Mężczyzna", id: "men" },
        { label: "Kobieta", id: "kobieta" },
        { label: "Dziecko", id: "dziecko" },
        { label: "Wyprzedaż", id: "wyprzedaz" }
      ]
    },
    nowe: {
      title: "Nowe i polecane",
      items: [
        { label: "Polecane", id: "polecane" },
        { label: "Przeglądaj kultowe modele", id: "kultowe-modele" },
        { label: "Jordan", id: "jordan" },
        { label: "Odkryj dyscypliny sportu", id: "dyscypliny-sportu" }
      ]
    },
    polecane: {
      title: "Polecane",
      items: [
        { label: "Przeglądaj wszystkie nowości", link: "/nowe/nowosci" },
        { label: "Bestsellery", link: "/nowe/bestsellery" },
        { label: "Kalendarz premier SNKRS", link: "/nowe/kalendarz-premier" },
        { label: "Strona główna Air Max", link: "/nowe/air-max" }
      ]
    },
    "kultowe-modele": {
      title: "Przeglądaj kultowe modele",
      items: [
        { label: "Air Force 1", link: "/nowe/air-force-1" },
        { label: "Air Jordan 1", link: "/nowe/air-jordan-1" },
        { label: "Air Max", link: "/nowe/air-max" },
        { label: "Dunk", link: "/nowe/dunk" }
      ]
    },
    jordan: {
      title: "Jordan",
      items: [
        { label: "Nowości Jordan", link: "/jordan/nowosci" },
        { label: "Buty Jordan", link: "/jordan/buty" },
        { label: "Ubrania Jordan", link: "/jordan/ubrania" }
      ]
    },
    "dyscypliny-sportu": {
      title: "Odkryj dyscypliny sportu",
      items: [
        { label: "Bieganie", link: "/sport/bieganie" },
        { label: "Piłka nożna", link: "/sport/pilka-nozna" },
        { label: "Koszykówka", link: "/sport/koszykowka" },
        { label: "Trening i siłownia", link: "/sport/trening" }
      ]
    },
    men: {
      title: "Mężczyzna",
      items: [
        { label: "Buty", id: "men-buty" },
        { label: "Ubrania", id: "men-ubrania" },
        { label: "Odkryj dyscypliny sportu", id: "men-sport" },
        { label: "Dodatki/akcesoria i sprzęt", id: "men-dodatki" }
      ]
    },
    "men-buty": {
      title: "Buty",
      items: [
        { label: "Wszystkie buty", link: "/men/buty" },
        { label: "Lifestyle", link: "/men/buty/lifestyle" },
        { label: "Jordan", link: "/men/buty/jordan" },
        { label: "Bieganie", link: "/men/buty/bieganie" },
        { label: "Piłka nożna", link: "/men/buty/pilka-nozna" },
        { label: "Koszykówka", link: "/men/buty/koszykowka" },
        { label: "Trening i siłownia", link: "/men/buty/trening" },
        { label: "Skateboarding", link: "/men/buty/skateboarding" },
        { label: "Nike By You", link: "/men/buty/nike-by-you" }
      ]
    },
    "men-ubrania": {
      title: "Ubrania",
      items: [
        { label: "Wszystkie ubrania", link: "/men/ubrania" },
        { label: "Bluzy z kapturem i dresowe", link: "/men/ubrania/bluzy" },
        { label: "Kurtki", link: "/men/ubrania/kurtki" },
        { label: "Spodnie i legginsy", link: "/men/ubrania/spodnie" },
        { label: "Dresy", link: "/men/ubrania/dresy" },
        { label: "Koszulki i T-shirty", link: "/men/ubrania/koszulki" },
        { label: "Spodenki", link: "/men/ubrania/spodenki" },
        { label: "Stroje i koszulki", link: "/men/ubrania/stroje" }
      ]
    },
    "men-sport": {
      title: "Odkryj dyscypliny sportu",
      items: [
        { label: "Bieganie", link: "/men/sport/bieganie" },
        { label: "Piłka nożna", link: "/men/sport/pilka-nozna" },
        { label: "Koszykówka", link: "/men/sport/koszykowka" },
        { label: "Trening i siłownia", link: "/men/sport/trening" },
        { label: "Tenis", link: "/men/sport/tenis" },
        { label: "Golf", link: "/men/sport/golf" }
      ]
    },
    "men-dodatki": {
      title: "Dodatki/akcesoria i sprzęt",
      items: [
        { label: "Wszystkie dodatki/akcesoria i sprzęt", link: "/men/dodatki" },
        { label: "Torby i plecaki", link: "/men/dodatki/torby" },
        { label: "Nakrycia głowy", link: "/men/dodatki/nakrycia-glowy" },
        { label: "Skarpety", link: "/men/dodatki/skarpety" }
      ]
    },
    kobieta: {
      title: "Kobieta",
      items: [
        { label: "Buty", id: "kobieta-buty" },
        { label: "Ubrania", id: "kobieta-ubrania" },
        { label: "Odkryj dyscypliny sportu", id: "kobieta-sport" },
        { label: "Dodatki/akcesoria i sprzęt", id: "kobieta-dodatki" }
      ]
    },
    dziecko: {
      title: "Dziecko",
      items: [
        { label: "Buty", id: "dziecko-buty" },
        { label: "Ubrania", id: "dziecko-ubrania" }
      ]
    },
    wyprzedaz: {
      title: "Wyprzedaż",
      items: [
        { label: "Buty w promocji", link: "/wyprzedaz/buty" },
        { label: "Ubrania w promocji", link: "/wyprzedaz/ubrania" },
        { label: "Akcesoria w promocji", link: "/wyprzedaz/akcesoria" }
      ]
    }
  };

  // Desktop dropdown content
  const dropdownContent = {
    nowe: {
      columns: [
        {
          title: "Polecane",
          items: [
            { label: "Nowości", link: "/nowe/nowosci" },
            { label: "Bestsellery", link: "/nowe/bestsellery" },
            { label: "Sneakersy w biegowym stylu retro", link: "/nowe/sneakersy-retro" },
            { label: "Strona główna Air Max", link: "/nowe/air-max" }
          ]
        },
        {
          title: "Przeglądaj kultowe modele",
          items: [
            { label: "Air Force 1", link: "/nowe/air-force-1" },
            { label: "Air Jordan 1", link: "/nowe/air-jordan-1" },
            { label: "Air Max", link: "/nowe/air-max" },
            { label: "Dunk", link: "/nowe/dunk" }
          ]
        },
        {
          title: "Jordan",
          items: [
            { label: "Nowości Jordan", link: "/jordan/nowosci" },
            { label: "Buty Jordan", link: "/jordan/buty" },
            { label: "Ubrania Jordan", link: "/jordan/ubrania" }
          ]
        },
        {
          title: "Odkryj dyscypliny sportu",
          items: [
            { label: "Bieganie", link: "/sport/bieganie" },
            { label: "Piłka nożna", link: "/sport/pilka-nozna" },
            { label: "Koszykówka", link: "/sport/koszykowka" },
            { label: "Trening i siłownia", link: "/sport/trening" }
          ]
        }
      ]
    },
    men: {
      columns: [
        {
          title: "Buty",
          items: [
            { label: "Wszystkie buty", link: "/men/buty" },
            { label: "Lifestyle", link: "/men/buty/lifestyle" },
            { label: "Jordan", link: "/men/buty/jordan" },
            { label: "Bieganie", link: "/men/buty/bieganie" },
            { label: "Piłka nożna", link: "/men/buty/pilka-nozna" },
            { label: "Koszykówka", link: "/men/buty/koszykowka" },
            { label: "Trening i siłownia", link: "/men/buty/trening" },
            { label: "Skateboarding", link: "/men/buty/skateboarding" },
            { label: "Nike By You", link: "/men/buty/nike-by-you" }
          ]
        },
        {
          title: "Ubrania",
          items: [
            { label: "Wszystkie ubrania", link: "/men/ubrania" },
            { label: "Bluzy z kapturem i dresowe", link: "/men/ubrania/bluzy" },
            { label: "Kurtki", link: "/men/ubrania/kurtki" },
            { label: "Spodnie i legginsy", link: "/men/ubrania/spodnie" },
            { label: "Dresy", link: "/men/ubrania/dresy" },
            { label: "Koszulki i T-shirty", link: "/men/ubrania/koszulki" },
            { label: "Spodenki", link: "/men/ubrania/spodenki" },
            { label: "Stroje i koszulki", link: "/men/ubrania/stroje" }
          ]
        },
        {
          title: "Odkryj dyscypliny sportu",
          items: [
            { label: "Bieganie", link: "/men/sport/bieganie" },
            { label: "Piłka nożna", link: "/men/sport/pilka-nozna" },
            { label: "Koszykówka", link: "/men/sport/koszykowka" },
            { label: "Trening i siłownia", link: "/men/sport/trening" },
            { label: "Tenis", link: "/men/sport/tenis" },
            { label: "Golf", link: "/men/sport/golf" }
          ]
        },
        {
          title: "Dodatki/akcesoria i sprzęt",
          items: [
            { label: "Wszystkie dodatki/akcesoria i sprzęt", link: "/men/dodatki" },
            { label: "Torby i plecaki", link: "/men/dodatki/torby" },
            { label: "Nakrycia głowy", link: "/men/dodatki/nakrycia-glowy" },
            { label: "Skarpety", link: "/men/dodatki/skarpety" }
          ]
        }
      ]
    },
    kobieta: {
      columns: [
        {
          title: "Buty",
          items: [
            { label: "Wszystkie buty", link: "/kobieta/buty" },
            { label: "Lifestyle", link: "/kobieta/buty/lifestyle" },
            { label: "Bieganie", link: "/kobieta/buty/bieganie" },
            { label: "Trening i siłownia", link: "/kobieta/buty/trening" }
          ]
        },
        {
          title: "Ubrania",
          items: [
            { label: "Wszystkie ubrania", link: "/kobieta/ubrania" },
            { label: "Bluzy z kapturem i dresowe", link: "/kobieta/ubrania/bluzy" },
            { label: "Kurtki", link: "/kobieta/ubrania/kurtki" },
            { label: "Spodnie i legginsy", link: "/kobieta/ubrania/spodnie" }
          ]
        },
        {
          title: "Odkryj dyscypliny sportu",
          items: [
            { label: "Bieganie", link: "/kobieta/sport/bieganie" },
            { label: "Trening i siłownia", link: "/kobieta/sport/trening" },
            { label: "Tenis", link: "/kobieta/sport/tenis" }
          ]
        },
        {
          title: "Dodatki/akcesoria i sprzęt",
          items: [
            { label: "Wszystkie dodatki/akcesoria i sprzęt", link: "/kobieta/dodatki" },
            { label: "Torby i plecaki", link: "/kobieta/dodatki/torby" },
            { label: "Nakrycia głowy", link: "/kobieta/dodatki/nakrycia-glowy" }
          ]
        }
      ]
    },
    dziecko: {
      columns: [
        {
          title: "Buty",
          items: [
            { label: "Wszystkie buty", link: "/dziecko/buty" },
            { label: "Lifestyle", link: "/dziecko/buty/lifestyle" },
            { label: "Bieganie", link: "/dziecko/buty/bieganie" }
          ]
        },
        {
          title: "Ubrania",
          items: [
            { label: "Wszystkie ubrania", link: "/dziecko/ubrania" },
            { label: "Bluzy z kapturem i dresowe", link: "/dziecko/ubrania/bluzy" },
            { label: "Kurtki", link: "/dziecko/ubrania/kurtki" }
          ]
        }
      ]
    },
    wyprzedaz: {
      columns: [
        {
          title: "Wyprzedaż",
          items: [
            { label: "Buty w promocji", link: "/wyprzedaz/buty" },
            { label: "Ubrania w promocji", link: "/wyprzedaz/ubrania" },
            { label: "Akcesoria w promocji", link: "/wyprzedaz/akcesoria" }
          ]
        }
      ]
    }
  };

  // Render dropdown menu for a specific category (desktop)
  const renderDropdown = (category) => {
    const content = dropdownContent[category];
    
    if (!content) return null;
    
    if (content.columns) {
      // Multi-column dropdown
      return (
        <div className="dropdown-menu multi-column">
          {content.columns.map((column, colIndex) => (
            <div className="dropdown-column" key={colIndex}>
              <h3>{column.title}</h3>
              <ul>
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link to={item.link} onClick={() => setActiveDropdown(null)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
    
    return null;
  };

  // Render mobile menu content based on current category
  const renderMobileMenuContent = () => {
    if (!isMenuOpen) return null;

    const currentMenu = currentMobileCategory ? menuStructure[currentMobileCategory] : menuStructure.main;
    if (!currentMenu) return null;

    return (
      <div className="mobile-menu-content">
        <div className="mobile-menu-header">
          {(currentMobileCategory || mobileNavHistory.length > 0) && (
            <button className="mobile-back-button" onClick={navigateBackMobile}>
              <ChevronLeft size={20} />
              {mobileNavHistory.length > 0 ? 
                (mobileNavHistory[mobileNavHistory.length - 1] === 'main' ? 
                  'Wszystko' : 
                  menuStructure[mobileNavHistory[mobileNavHistory.length - 1]]?.title) : 
                'Wszystko'}
            </button>
          )}
          <h2>{currentMenu.title}</h2>
          <button className="mobile-close-button" onClick={closeMobileMenu}>
            <X size={20} />
          </button>
        </div>
        <ul className="mobile-menu-items">
          {currentMenu.items.map((item, index) => (
            <li key={index} className="mobile-menu-item">
              {item.id ? (
                <button 
                  className="mobile-menu-button" 
                  onClick={() => navigateToMobileCategory(item.id)}
                >
                  {item.label}
                  <ChevronRight size={20} />
                </button>
              ) : (
                <Link 
                  to={item.link} 
                  className="mobile-menu-link"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="header-wrapper">
      <div className="header">
        <Link to="/" className="logo-link">
          <div className="logo">
            <Logotextblack className="logotextsvg" />
            <Logoiconblack className="logoiconsvg" />
          </div>
        </Link>
        <div className="content">
          <ul>
            <li 
              onMouseEnter={() => handleMouseEnter('nowe')} 
              onMouseLeave={handleMouseLeave}
              className={activeDropdown === 'nowe' ? 'active' : ''}
            >
              <Link to="/nowe">Nowe</Link>
              {activeDropdown === 'nowe' && renderDropdown('nowe')}
            </li>
            <li 
              onMouseEnter={() => handleMouseEnter('men')} 
              onMouseLeave={handleMouseLeave}
              className={activeDropdown === 'men' ? 'active' : ''}
            >
              <Link to="/men">Mężczyzna</Link>
              {activeDropdown === 'men' && renderDropdown('men')}
            </li>
            <li 
              onMouseEnter={() => handleMouseEnter('kobieta')} 
              onMouseLeave={handleMouseLeave}
              className={activeDropdown === 'kobieta' ? 'active' : ''}
            >
              <Link to="/kobieta">Kobieta</Link>
              {activeDropdown === 'kobieta' && renderDropdown('kobieta')}
            </li>
            <li 
              onMouseEnter={() => handleMouseEnter('dziecko')} 
              onMouseLeave={handleMouseLeave}
              className={activeDropdown === 'dziecko' ? 'active' : ''}
            >
              <Link to="/dziecko">Dziecko</Link>
              {activeDropdown === 'dziecko' && renderDropdown('dziecko')}
            </li>
            <li 
              onMouseEnter={() => handleMouseEnter('wyprzedaz')} 
              onMouseLeave={handleMouseLeave}
              className={activeDropdown === 'wyprzedaz' ? 'active' : ''}
            >
              <Link to="/wyprzedaz">Wyprzedaż</Link>
              {activeDropdown === 'wyprzedaz' && renderDropdown('wyprzedaz')}
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

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        {renderMobileMenuContent()}
      </div>
    </div>
  )
}

export default Header
