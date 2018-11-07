import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';
import LogoSmall from '../img/logo-small.png';



class Navbar extends Component {

  constructor(){

    super();

    this.state = {navbar:'navbar'};
    this.navbarChanger = this.navbarChanger.bind(this);
    this.navbarDeactivateSmallScreens = this.navbarDeactivateSmallScreens.bind(this);

    this.checkbox = React.createRef();
  }

  componentDidMount(){
    this.deactivate = (e)=>{this.navbarDeactivateSmallScreens(e)};
    this.clearOnResize = (e)=> this.checkbox.current.checked = false;

    window.addEventListener('scroll',this.navbarChanger);
    window.addEventListener('click',this.deactivate);
    window.addEventListener('resize',this.clearOnResize);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll',this.navbarChanger);
    window.removeEventListener('click',this.deactivate);
    window.removeEventListener('resize',this.clearOnResize);
  }

  navbarChanger(){
    let trigger = window.innerHeight;
    //if user uses phone then nav activated earlyer because of smaller welcome section
    if(window.innerWidth < 600){
      trigger = trigger * 0.7;
    }
    if(window.scrollY > trigger - 50){
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


  render() {
    return (
      <nav className={this.state.navbar}>
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
          <a href="#" className="navbar__languagelink">English</a>
          <a href="#" className="navbar__languagelink">Español</a>
          <a href="#" className="btn btn--white">Reservar</a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
