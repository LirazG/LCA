import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';
import LogoSmall from '../img/logo-small.png';
//middlewares
import middlewares from '../middleware/middleware';

class Navbar extends Component {

  constructor(){
    super();

    this.state = {
      navbar:'navbar',
      modal:"form-success",
      message:"form-success__message"
    };

    this.navbarChanger = this.navbarChanger.bind(this);
    this.navbarDeactivateSmallScreens = this.navbarDeactivateSmallScreens.bind(this);
    this.checkbox = React.createRef();
  }

  componentDidMount(){
    this.deactivate = (e)=>{this.navbarDeactivateSmallScreens(e)};
    this.clearOnResize = (e)=> this.checkbox.current.checked = false;

    let passiveSupported = middlewares.checkPassiveOptionBrowser();
    window.addEventListener('scroll',this.navbarChanger, passiveSupported ? { passive: true } : false);
    window.addEventListener('click',this.deactivate);
    window.addEventListener('resize',this.clearOnResize);
  }

  componentWillUnmount(){
    let passiveSupported = false;
    window.removeEventListener('scroll',this.navbarChanger, passiveSupported ? { passive: true } : false);
    window.removeEventListener('click',this.deactivate);
    window.removeEventListener('resize',this.clearOnResize);
  }

  navbarChanger(){
    let trigger = window.innerHeight * 0.8;
    if(window.scrollY > trigger - 100){
      this.setState({navbar:'navbar navbar__activated'});
    } else {
      this.setState({navbar:'navbar'});
    }
  }

  navbarDeactivateSmallScreens(e){

    if( (e.target.parentElement && e.target.parentElement.id === 'nav1') || (e.target.parentElement && e.target.parentElement.id === 'nav2') ){
      e.preventDefault();
      e.stopPropagation();
      if(this.checkbox.current.checked){
        this.checkbox.current.checked = false;
      } else {
        this.checkbox.current.checked = true;
      }
    } else {
      this.checkbox.current.checked = false;
    }
  }

  reserveButtonAction = (e) => {
    this.setState({
      modal:"form-success form-success--display",
      message:"form-success__message form-success__message--display"
    })
  }

  modalCancel = () =>{
    this.setState({
      modal:"form-success",
      message:"form-success__message"
    });
  }


  render() {
    return (
      <nav className={this.state.navbar}>
      <div className="navbar__black-bg"></div>

        <div className={this.state.modal} onClick={this.modalCancel}></div>
        <div className={this.state.message}>
          <div className="form-success__message__success">
            <div className="form-success__message__success--field-reserve">
              <h3 className="heading3">Canchas</h3>
              <Link onClick={this.modalCancel} to={{pathname:'/sports/reservation/big',field:'big'}} className="btn btn--red">Grande</Link>
              <Link onClick={this.modalCancel} to={{pathname:'/sports/reservation/small',field:'small'}} className="btn btn--red">Chica</Link>
              <Link onClick={this.modalCancel} to={{pathname:'/sports/reservation/other',field:'other'}} className="btn btn--red">Otros</Link>
            </div>
            <div className="form-success__message__success--hotel-reserve">
              <h4 className="heading3">Hotel</h4>
              <Link onClick={this.modalCancel} to='/hotel' className="btn btn--red">Avitaciones</Link>
            </div>
          </div>
          <div className="form-success__message__cancel" onClick={this.modalCancel}>
            <i className="fas fa-times form-success__message__cancel--icon"></i>
          </div>
        </div>

        <Link to="/" className="navbar__left">
          <img alt="logo" className="navbar__left__img--1" src={Logo} />
          <img alt="logo-small" className="navbar__left__img--2" src={LogoSmall} />
        </Link>

        <input type="checkbox" className="navbar__checkbox" id="navi-toggle" ref={this.checkbox}/>
        <div className="navbar__background">&nbsp;</div>

        <label htmlFor="navi-toggle" className="navbar__button">

          <div className="navbar__hamburger" id="nav1">
            <div className="navbar__hamburger__holder" id="nav2">
              <p className="navbar__button--text">Menu</p>
              <span className="navbar__hamburger__holder--item navbar__hamburger__holder--item--1">&nbsp;</span>
              <span className="navbar__hamburger__holder--item ">&nbsp;</span>
              <span className="navbar__hamburger__holder--item navbar__hamburger__holder--item--3">&nbsp;</span>
            </div>
          </div>
        </label>

        <ul className="navbar__itemlist">
          <li className="navbar__itemlist__item"><Link className="navbar__itemlist__item__link" to="/hotel">Hotel</Link></li>
          <li className="navbar__itemlist__item"><Link className="navbar__itemlist__item__link" to="/sports">Deportes</Link></li>
          <li className="navbar__itemlist__item"><Link className="navbar__itemlist__item__link" to="/bar">Resto Bar</Link></li>
          <li className="navbar__itemlist__item"><Link className="navbar__itemlist__item__link" to="/parking">Estacionamiento</Link></li>
          <li className="navbar__itemlist__item"><Link className="navbar__itemlist__item__link" to="/events">Eventos</Link></li>
          <li className="navbar__itemlist__item"><Link className="navbar__itemlist__item__link" to="/contact">Contacto</Link></li>
        </ul>

        <div className="navbar__rightsection">
          <div className="navbar__rightsection__content">
            <a className="navbar__languagelink">English</a>
            <a className="navbar__languagelink">Español</a>
            <a onClick={this.reserveButtonAction} className="btn btn--white">Reservar</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
