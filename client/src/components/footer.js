import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo-footer.png';

import * as Scroll from 'react-scroll';

const Footer = () => {

  const scrollToTop = () =>{
    Scroll.animateScroll.scrollToTop({smooth:'easeOutQuad'});
  }

    return (
      <footer className="footer u-margin-top-big">
        <div className="row">
          <div className="col-1-of-3 footer__logo">
            <img src={Logo} alt="logo" className="footer__img"/>
            <p className="footer__text">Dirección (adress) : Av Mariscal Castilla 276 - Huacho </p>
            <p className="footer__text">Reservas: 01- 2395721</p>
          </div>

          <div className="col-1-of-3 u-margin-right-small footer__second">
            <h5 className="heading5">Contacto</h5>
            <ul className="footer__ul">
              <li><Link to="/about" className="footer__ul__link">Sobre Nosotros</Link></li>
              <li><Link to="/contact" className="footer__ul__link">Contacto</Link></li>
            </ul>

            <div className=" footer__follow u-margin-top-big ">
            <h5 className="heading5">Síguenos en Facebook</h5>
              <a href='https://www.facebook.com/casadealgodon' className="footer__icon">
                <i className="fab fa-facebook-square"></i>
              </a>
            </div>

          </div>

          <div className="col-1-of-3 footer__third">
            <h5 className="heading5">Servicios</h5>
            <ul className="footer__ul">
              <li><Link to="/hotel" className="footer__ul__link">Hotel</Link></li>
              <li><Link to="/sports" className="footer__ul__link">Deportes</Link></li>
              <li><Link to="/bar" className="footer__ul__link">Resto Bar</Link></li>
              <li><Link to="/parking" className="footer__ul__link">Estacionamiento</Link></li>
              <li><Link to="/events" className="footer__ul__link">Salon de Eventos</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer__forth">
          <hr className=""/>
          <p className="footer__text">©{new Date().getFullYear()} La Casa De Algodon Todos los derechos reservados.</p>
          <p className="footer__text">© Website built by Liraz Gur Arie</p>
        </div>

          <span className="footer__scroll">
            <span className="footer__scroll--text">scroll top</span>
            <span className="footer__scroll--arrow" onClick={scrollToTop}></span>
          </span>

      </footer>
    );
}

export default Footer;
