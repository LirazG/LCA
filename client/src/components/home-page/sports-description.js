import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';

import Pic1 from '../../img/test.jpg';
import Pic2 from '../../img/test1.jpg';

class SportsDescription extends Component {

  constructor(props){
    super(props);

    this.paragraph = React.createRef();
    this.state={
      paragraph:'paragraph-sports'
    };
  }

  componentDidMount(){
    this.element = this.paragraph.current;
    this.stateActive= {paragraph:'paragraph-sports paragraph-sports--activated'};
    this.stateRegular= {paragraph:'paragraph-sports'};
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
      <div className="row sports-description u-margin-top-big">
        <div className="col-1-of-2 sports-description__info">
          <h2 className="heading2">Jugar en nuestros profesional canchas</h2>
          <p className={ this.state.paragraph + ' u-margin-left-medium u-margin-top-small'} ref={this.paragraph}>
            Nuestro país tiene un gran amor por deportes y es una parte inseparable
            de nosotros y nuestras culturas. Apreciamos esto y por eso, hemos construido una amplia
            gama de complejos deportivos, incluidos campos de fútbol, ​​voleibol y más. Ven a jugar
            con nosotros!
          </p>
          <Link to="/sports" className="btn btn--gold  u-margin-top-medium sports-description__button--1">Descubrir</Link>
        </div>

        <div className="col-1-of-2 sports-description__picture">
          <LazyLoad offsetVertical={700} debounce={false}>
            <span>
              <img className="sports-description__picture--1" src={Pic1} alt="sports picture" />
              <img className="sports-description__picture--2" src={Pic2} alt="sports picture2"/>
            </span>
          </LazyLoad>

          <Link to="/sports" className="btn btn--gold  u-margin-top-medium sports-description__button--2">Descubrir</Link>
        </div>
      </div>
    );
  }
}

export default SportsDescription;
