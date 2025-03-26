"use client";

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <h3 className="footer-title">Produkty</h3>
            <ul className="footer-links">
              <li><a href="/buty">Buty</a></li>
              <li><a href="/odziez">Odzież</a></li>
              <li><a href="/akcesoria">Akcesoria</a></li>
              <li><a href="/nowosci">Nowości</a></li>
              <li><a href="/wyprzedaz">Wyprzedaż</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Kolekcje</h3>
            <ul className="footer-links">
              <li><a href="/jordan">Jordan</a></li>
              <li><a href="/dunk">Dunk</a></li>
              <li><a href="/airforce">Air Force</a></li>
              <li><a href="/airmax">Air Max</a></li>
              <li><a href="/blazer">Blazer</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Pomoc</h3>
            <ul className="footer-links">
              <li><a href="/status-zamowienia">Status zamówienia</a></li>
              <li><a href="/dostawa">Dostawa i śledzenie</a></li>
              <li><a href="/zwroty">Zwroty</a></li>
              <li><a href="/platnosci">Metody płatności</a></li>
              <li><a href="/kontakt">Kontakt</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">O nas</h3>
            <ul className="footer-links">
              <li><a href="/o-firmie">O firmie</a></li>
              <li><a href="/kariera">Kariera</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="footer-title">Dołącz do nas</h3>
            <div className="social-icons">
              <a href="https://facebook.com" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
            <div className="newsletter">
              <h4>Newsletter</h4>
              <p>Zapisz się, aby otrzymywać informacje o nowościach i promocjach</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Twój adres email" />
                <button type="submit">Zapisz się</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} Silent Runners. Wszelkie prawa zastrzeżone.</p>
          </div>
          <div className="footer-legal">
            <a href="/polityka-prywatnosci">Polityka prywatności</a>
            <a href="/regulamin">Regulamin</a>
            <a href="/cookies">Polityka cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
