import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

import FlipCard from '../flip-card.js';

import VideoSrc1 from '../../img/Warming-up.mp4';
import VideoSrc2 from '../../img/Warming-up.webm';
import VideoSrc3 from '../../img/Warming-up.ogv';
import VideoSrcImg from '../../img/Warming-up.jpg';

import Pic1 from '../../img/SStest.jpg';
import Pic2 from '../../img/SStest1.jpg';
import Pic3 from '../../img/seperator2.jpg';
//middlewares
import middlewares from '../../middleware/middleware';

class Info extends Component {

  constructor(props){
    super(props);

    this.state={
      paragraph:'paragraph',
      properties1:[
        ' 6 de 600 metros cuadrados.',
        ' Chalecos, Pelota.',
        ' Para 50 personas.',
        ' Para 6 vehículos.',
        ' Damas y Caballeros.',
        ' 30.00 soles.',
        ' 40.00 soles.'
      ],
      properties2:[
        ' 8 de 1300 metros cuadrados.',
        ' Chalecos, Pelota.',
        ' Para 50 personas.',
        ' Para 6 vehículos.',
        ' Damas y Caballeros.',
        ' 80.00 soles.',
        ' 100.00 soles.'
      ],
      properties3:[
        ' 8 de 1300 metros cuadrados.',
        ' Chalecos, Pelota.',
        ' Para 50 personas.',
        ' Para 6 vehículos.',
        ' Damas y Caballeros.',
        ' 20.00 soles.',
        ' 25.00 soles.'
      ]
    }

    this.paragraph = React.createRef();
  }

  componentDidMount(){
    this.element = this.paragraph.current;
    this.stateActive={paragraph:'paragraph paragraph__activated'};
    this.stateRegular={paragraph:'paragraph'};
    let passiveSupported = middlewares.checkPassiveOptionBrowser();
    window.addEventListener('scroll',this.fadeCaller, passiveSupported ? { passive: true } : false);
  }

  componentWillUnmount(){
    let passiveSupported = false;
    window.removeEventListener('scroll',this.fadeCaller, passiveSupported ? { passive: true } : false);
  }

  fadeCaller = ()=> {
    this.props.fadeIn.call(this,this.element,this.stateActive,this.stateRegular);
  }

  render() {
    return (
      <section className="sports-page__info">

        <div className="row">
          <h2 className="u-block-center u-margin-top-big u-margin-bottom-small heading-cursive-big">“El fútbol nos une y la Casa de Algodón nos reúne”</h2>
          <p className={this.state.paragraph + ' u-block-center u-text-center'} ref={this.paragraph}>
            Contamos con una infraestructura moderna y adecuada para que nuestros clientes
            disfruten jugando al futbol.
            Las canchas han sido colocadas sobre tierra compactada con arena, no sobre cemento,
            lo cual le proporciona más amortiguación a la cancha y evita que sus articulaciones sufran
            le realizamos mantenimiento 2 veces al año de la mejor calidad. Además toda la zona esta
            enmallada para evitar que las pelotas se escapen.
          </p>
        </div>

        <div className="sports-page__description">

          <LazyLoad offsetVertical={700} debounce={false}>
            <div className="sports-page__description__bg-video">
              <video className="sports-page__description__bg-video__content" autoPlay muted loop>
                <source src={VideoSrc1} type="video/mp4" />
                <source src={VideoSrc2} type="video/webm" />
                <source src={VideoSrc3} type="video/ogv" />
                Your browser not supported
              </video>
              <div className="sports-page__description__bg-video__content sports-page__description__bg-video__content--fallback">
                <img src={VideoSrcImg} alt="fallback football"/>
              </div>
            </div>
          </LazyLoad>

          <div className="row sports-page__description__text">
            <h2 className="heading2 heading2--white u-margin-top-small">Nuestras Canchas</h2>

            <div className="col-1-of-3 sports-page__description__text--element">
              <h5 className="heading5 heading5--noborder">I.Cancha chica-fútbol</h5>
              <FlipCard pic={Pic1} list={this.state.properties1} fieldName={'small'} />
            </div>

            <div className="col-1-of-3 sports-page__description__text--element">
              <h5 className="heading5 heading5--noborder">II.Cancha grande-fútbol</h5>
              <FlipCard pic={Pic2} list={this.state.properties2} fieldName={'big'} />
            </div>

            <div className="col-1-of-3 sports-page__description__text--element">
              <h5 className="heading5 heading5--noborder">III.volley – basquet - fronton</h5>
              <FlipCard pic={Pic3} list={this.state.properties3} fieldName={'other'} />
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default Info;
