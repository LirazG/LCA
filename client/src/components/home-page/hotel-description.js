import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Carusel from '../carusel.js';
//middlewares
import middlewares from '../../middleware/middleware';

class HotelDescription extends Component {

  constructor(props){
    super(props);

    this.state={
      feature1:'description__feature',
      feature2:'description__feature',
      feature3:'description__feature',
      feature4:'description__feature',
      willChange:' no-will-change'
    };

    this.feature1 = React.createRef();
    this.feature2 = React.createRef();
    this.feature3 = React.createRef();
    this.feature4 = React.createRef();
  }

  componentDidMount(){
    this.element1 = this.feature1.current;
    this.element3 = this.feature3.current;
    this.activeState1 = {feature1:'description__feature description__feature--active',feature2:'description__feature description__feature--active description__feature description__feature--active--delay'};
    this.regularState1 = {feature1:'description__feature',feature2:'description__feature'};
    this.activeState2 = {feature3:'description__feature description__feature--active',feature4:'description__feature description__feature--active description__feature description__feature--active--delay'};
    this.regularState2 = {feature3:'description__feature',feature4:'description__feature'};

    let passiveSupported = middlewares.checkPassiveOptionBrowser();
    window.addEventListener('scroll',this.fadeInCaller, passiveSupported ? { passive: true } : false);
    window.addEventListener('scroll',this.fadeInCaller2, passiveSupported ? { passive: true } : false);
  }

  componentWillUnmount(){
    let passiveSupported = false;
    window.removeEventListener('scroll',this.fadeInCaller, passiveSupported ? { passive: true } : false);
    window.removeEventListener('scroll',this.fadeInCaller2, passiveSupported ? { passive: true } : false);
  }

  // created so can be called in event handler so it can be removed(anonymos functions cant be removed )

  fadeInCaller = () =>{
    this.props.FadeIn.call(this,this.element1,this.activeState1,this.regularState1,50,true);
  }

  fadeInCaller2 = () =>{
    this.props.FadeIn.call(this,this.element3,this.activeState2,this.regularState2,50,true);
  }

  render() {
    return (
      <div className="row description">
        <div className="col-1-of-2 description__image">
          <Carusel/>
        </div>

        <div className="col-1-of-2">
          <div className="row">
            <div className={this.state.feature1 + this.state.willChange} ref={this.feature1}>
              <i className="fas fa-swimmer description__feature--icon"></i>
              <h4 className="heading4">Piscina</h4>
              <p className="paragraph-details">Disfruta de nuestra piscina en los calurosos días de verano!</p>
            </div>
            <div className={this.state.feature2 + this.state.willChange} ref={this.feature2}>
              <i className="fas fa-utensils description__feature--icon"></i>
              <h4 className="heading4">Desayuno</h4>
              <p className="paragraph-details">Desayuno fresco incluido en su estancia para cada tipo de habitación</p>
            </div>
          </div>

          <div className="row">
            <div className={this.state.feature3 + this.state.willChange} ref={this.feature3}>
              <i className="fas fa-wifi description__feature--icon"></i>
              <h4 className="heading4">Wifi incluido</h4>
              <p className="paragraph-details">Acceso inalámbrico a Internet incluido en todas partes del hotel para tu comodidad</p>
            </div>

            <div className={this.state.feature4 + this.state.willChange} ref={this.feature4}>
              <i className="fas fa-paw description__feature--icon"></i>
              <h4 className="heading4">Animal Amigable</h4>
              <p className="paragraph-details">Nuestro hotel es amigable con los animales y ofrece la mejor experiencia para usted</p>
            </div>
          </div>
          <Link to="/hotel" className="btn btn--gold u-margin-top-big">Avitaciones</Link>
        </div>

      </div>
    );
  }
}

export default HotelDescription;
