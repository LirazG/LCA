import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

import EventsGirl from '../../img/bar-girl-events.jpg';



class EventSection extends Component {

  constructor(props){
    super(props);

  }


  render() {
    return (
      <section className="bar__events u-margin-top-huge">
        <div className="row">
          <div className="col-1-of-3 u-margin-bottom-medium">
            <h3 className="heading3 u-margin-top-big">Organiza un evento en nuestro bar</h3>
            <p className="paragraph paragraph__activated u-block-center u-text-center">
              ¿Necesitas un lugar para organizar tu evento? El V.A.R resto bar está acostumbrado
              a organizar eventos y espectáculos en vivo de cualquier tipo.
            </p>
            <h4 className="heading4 u-text-center">Whatsapp/Teléfono</h4>
            <h4 className="heading4 u-text-center">+51 946 443 445</h4>
          </div>
          <div className="col-2-of-3">
            <LazyLoad offsetVertical={700} debounce={false} >
              <div className="image-display">
                <img src={EventsGirl} alt="event-bar-girl" className="image-display__item image-display__item--1"/>
                <img src={EventsGirl} alt="event-bar-girl" className="image-display__item image-display__item--2"/>
                <img src={EventsGirl} alt="event-bar-girl" className="image-display__item image-display__item--3"/>
              </div>
            </LazyLoad>
          </div>
        </div>
      </section>
    );
  }
}

export default EventSection;
