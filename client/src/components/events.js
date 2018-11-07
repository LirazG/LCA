import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

import WelcomePic from './welcome-pic.js';
import ShapedCard from './shaped-picture-card.js';

import Pic1 from '../img/events-pink.jpg';
import Pic2 from '../img/salon-outside.jpg';
import Pic3 from '../img/salon-last-section-big.jpg';


class Events extends Component {

  render() {
    return (
      <main className="events">
        <WelcomePic classProp={'welcome__img welcome__img--events'} />

        <div className="row">
          <div className="col-1-of-3 u-margin-bottom-medium">
            <span className="events__first-text">
              <h3 className="heading3 u-margin-top-big">Nuestra Salon De Eventos</h3>
              <p className="paragraph paragraph__activated u-text-center u-block-center">
                Para cualquier evento, desde una boda, aniversario,
                fiesta de cumpleaños hasta una reunión corporativa,
                un taller, una conferencia o un evento comunitario,
                ¡nuestro espacio para eventos y lugar para fiestas seguro lo complacerá!
              </p>
              <p className="paragraph paragraph__activated u-text-center u-block-center">
                <b>Precio</b> - s/. 400.00 - Por dia
              </p>
            </span>
          </div>

          <div className="col-2-of-3">
            <LazyLoad offsetVertical={700} debounce={false} >
              <div className="image-display">
                <img src={Pic3} alt="event-pic" className="image-display__item image-display__item--1"/>
                <img src={Pic2} alt="event-pic" className="image-display__item image-display__item--2"/>
                <img src={Pic1} alt="event-pic" className="image-display__item image-display__item--3"/>
              </div>
            </LazyLoad>
          </div>
        </div>

        <div className="row">
          <h3 className="heading3 u-text-center">Whatsapp/Teléfono</h3>
          <h4 className="heading4 u-text-center">+51 946 443 445</h4>
        </div>

        <ShapedCard className={' shaped-card--2'}/>
      </main>
    );
  }
}

export default Events;
