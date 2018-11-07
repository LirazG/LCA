import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';

import LogoBar from '../../img/logo-bar.png';
import BarView from '../../img/bar-flags-min.jpg';
import BarPeople from '../../img/bar-people-min.jpg';
import BarBeers from '../../img/bar-beers-min.jpg';


class BarDescription extends Component {

  constructor(props){
    super(props);

  }


  render() {
    return (
      <div className="bar-description u-margin-top-big">

      <LazyLoad offsetVertical={700} debounce={false} >
        <img src={LogoBar} alt="logo-bar" className="u-margin-bottom-big bar-description__logo"/>
      </LazyLoad>

        <div className="row">

          <div className="col-1-of-3">
            <figure className="real-life-photo">
            <img src={BarView} alt="real-photo-component" className="real-life-photo__image"/>
              <figcaption>
                <h3 className="real-life-photo--header">Disfrutar gran vista</h3>
                <p className="real-life-photo--text">
                  disfrute de bebidas, bocadillos y
                  aperitivos mientras mira un partido de fútbol
                  en nuestro gran campo de fútbol.
                </p>
              </figcaption>
            </figure>
          </div>

          <div className="col-1-of-3">
            <figure className="real-life-photo u-margin-top-big">
            <img src={BarBeers} alt="real-photo-component" className="real-life-photo__image"/>
              <figcaption>
                <h3 className="real-life-photo--header">Transmisiones en vivo</h3>
                <p className="real-life-photo--text">
                  estamos transmitiendo juegos en vivo
                  todo el año, únete a nosotros para la mejor experiencia deportiva
                </p>
              </figcaption>
            </figure>
            <Link to="/bar" className="btn btn--gold u-margin-top-huge sports-description__button--1">menú & galería</Link>
          </div>

          <div className="col-1-of-3">
            <figure className="real-life-photo u-margin-top-huge">
            <img src={BarPeople} alt="real-photo-component" className="real-life-photo__image"/>
              <figcaption>
                <h3 className="real-life-photo--header">Relájate con amigos</h3>
                <p className="real-life-photo--text">
                  Si solo quieres relajarte y tomar una cerveza con amigos,
                  ofrecemos un ambiente tranquilo y buena comida para llevar
                  bien con este
                </p>
              </figcaption>
            </figure>
          </div>

        </div>
        <Link to="/bar" className="btn btn--gold u-margin-top-huge sports-description__button--2">menú & galería</Link>
      </div>
    );
  }
}

export default BarDescription;
