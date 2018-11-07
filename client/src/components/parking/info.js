import React, { Component } from 'react';
import ShapedCard from '../shaped-picture-card.js';
import ParkingInfoTab from './parking-info-tab.js';

import ParkingImage1 from '../../img/parking-small1.jpg';
import ParkingImage2 from '../../img/parking-small2.jpg';
import ParkingImage3 from '../../img/parking-small3.jpg';
import ParkingImage4 from '../../img/parking-small4.jpg';
import ParkingImage5 from '../../img/parking-small5.jpg';

class Info extends Component {
  constructor(props){
    super(props);

    this.leftClass = 'parking-info__container';
    this.rightClass = 'parking-info__container parking-info__container--right';

    this.leftTextClass = 'parking-info__text';
    this.rightTextClass = 'parking-info__text--right';

    this.state = {
      first:{
        heading:'¿Quiénes somos?',
        text:'Somos una empresa peruana que respalda tu esfuerzo,'+
              'resguardando la seguridad de tu vehículo,'+
              'contamos con el estacionamiento más grande de la zona,'+
              'buscando cada vez mejorar en el servicio y la experiencia de nuestros clientes.'
      },
      second:{
        heading:'¿Qué es?',
        text:'Por una suscripción mensual, podrás tener el beneficio'+
             'de guardar tu vehículo donde te ofreceremos un lugar fijo,'+
             'adaptándonos a tus necesidades.'
      },
      third:{
        heading:'Atención',
        text:'Nuestros estacionamientos están disponibles durante las 24 horas de lunes a domingos.'+
             'Tendrás acceso y disposición de tu vehículo al momento que desees.'
      },
      forth:{
        heading:'Plazo',
        text:	'La suscripción como abonado dura como mínimo de contrato de un mes,'+
              'con opción a renovación según disponibilidad de la playa.'
      },
      fifth:{
        heading:'pago',
        text:'Las cuotas son a modo prepago al inicio de cada mes,'+
             'es decir el mes adelantado a modo de garantía. Además '+
             'el pago se puede realizar mediante transferencia bancaria o con '+
             'facilidad de cancelar en la misma playa.'
      },
      sixth:{
        heading:'Beneficio adicional',
        text:'Puedes congelar como máximo 15 días por semestre y/o solicitar'+
             'el cambio de placa hacia otro vehículo.'
      },
      seventh:{
        heading:'Solicita el servicio',
        text:'Coloca tus datos y solicítalo fácilmente, nos contactaremos contigo'
      }
    }

  }


  handleScroll(element,stateActive,stateRegular,offsetTopAddition = 0){
    let elementPosition = element.offsetTop + element.offsetHeight;
    let viewPosition = window.pageYOffset+window.innerHeight + offsetTopAddition;
    if(elementPosition <= viewPosition){
      this.setState(stateActive);
    } else {
      this.setState(stateRegular);
    }
  }

  render() {
    return (
      <section id="parking-info-section">
        <div className="row u-margin-bottom-medium u-margin-top-medium">
          <h2 className="heading2">nuestros servicios de aparcamiento</h2>
        </div>

        <ParkingInfoTab FadeIn={this.handleScroll} containerclass={this.leftClass} img={ParkingImage1} textclass={this.leftTextClass} heading={this.state.first.heading} text={this.state.first.text} />
        <ParkingInfoTab FadeIn={this.handleScroll} containerclass={this.rightClass} img={ParkingImage2} textclass={this.rightTextClass} heading={this.state.second.heading} text={this.state.second.text} />
        <ParkingInfoTab FadeIn={this.handleScroll} containerclass={this.leftClass} img={ParkingImage3} textclass={this.leftTextClass} heading={this.state.third.heading} text={this.state.third.text} />
        <ParkingInfoTab FadeIn={this.handleScroll} containerclass={this.rightClass} img={ParkingImage4} textclass={this.rightTextClass} heading={this.state.forth.heading} text={this.state.forth.text} />
        <ParkingInfoTab FadeIn={this.handleScroll} containerclass={this.leftClass} img={ParkingImage5} textclass={this.leftTextClass} heading={this.state.fifth.heading} text={this.state.fifth.text} />
        <ParkingInfoTab FadeIn={this.handleScroll} containerclass={this.rightClass} img={ParkingImage5} textclass={this.rightTextClass} heading={this.state.sixth.heading} text={this.state.sixth.text} />
        <ParkingInfoTab FadeIn={this.handleScroll} containerclass={this.leftClass} img={ParkingImage5} textclass={this.leftTextClass} heading={this.state.seventh.heading} text={this.state.seventh.text} />

        <div className="row u-margin-top-big parking-info__phone">
          <h3 className="heading3">ESCRÍBENOS AL WHATSAPP - +51 946 443 445</h3>
          <h4 className="heading4">Atención para informes las 24 horas.</h4>
          <h4 className="heading4 u-text-center u-margin-top-medium">¿Tienes pregunta?</h4>
        </div>

        <ShapedCard className={' shaped-card--1'}/>
      </section>
    );
  }
}

export default Info;
