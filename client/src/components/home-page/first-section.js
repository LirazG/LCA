import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';

import Front from '../../img/front-hotel-big.jpg';



class firstSection extends Component {

  constructor(props){
    super(props);

    this.paragraph = React.createRef();
    this.state={paragraph:'paragraph'};
  }

  componentDidMount(){
    this.element = this.paragraph.current;
    this.stateActive={paragraph:'paragraph paragraph__activated'};
    this.stateRegular={paragraph:'paragraph'};
    window.addEventListener('scroll',this.fadeInCaller);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll',this.fadeInCaller);
  }


  // created so can be called in event handler so it can be removed(anonymos functions cant be removed )

  fadeInCaller = () =>{
    this.props.FadeIn.call(this,this.element,this.stateActive,this.stateRegular)
  }


  render() {
    return (
      <section className="first-section">
        <div className="text-wrapper">
          <h3 className="heading3">Nuestra historia</h3>

          <p className={this.state.paragraph} ref={this.paragraph}>
            La Casa De Algodon es un Hotel Boutique desarrollado en una casa antigua construida netamente de madera
            y quincha aproximadamente a principios del Siglo XX en la cuidad &nbsp;&nbsp; de Huacho,
            se ha mantenido escondida por años dentro de una de las desmotadoras más antiguas
            e importantes del norte chico.
          </p>

          <div className="text-wrapper__img">
            <LazyLoad offsetVertical={1000} debounce={false}>
              <img className="text-wrapper__img--img" src={Front} alt="front_hotel" />
            </LazyLoad>
          </div>

          <Link to="/about"  className="btn btn--gold">más información</Link>
        </div>

      </section>
    );
  }
}

export default firstSection;
