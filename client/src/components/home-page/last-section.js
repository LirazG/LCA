import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import Card from '../card.js';

// card pics
import Pic1 from '../../img/parking-icon.jpg';
import Pic2 from '../../img/salon-icon.jpg';
//middlewares
import middlewares from '../../middleware/middleware';


class LastSection extends Component {

  constructor(props){
    super(props);

    this.right = React.createRef();
    this.left = React.createRef();
    this.card1 = {
      heading:'Estacionamiento',
      text:   'Descubra nuestros servicios,'+
              'nuestro estacionamiento es el más grande de la zona'+
              'y le ofrece una experiencia segura y cómoda'
    }

    this.card2 = {
      heading:'salón de eventos',
      text:'¡Alquila nuestro hermoso lugar para tu ocasión especial!'+
           'nuestro lugar capaz de albergar bodas, reuniones de cumpleaños'+
            'y eventos especiales y se ajustará a todas sus necesidades'

    }
  }

  componentDidMount(){
    let passiveSupported = middlewares.checkPassiveOptionBrowser();
    window.addEventListener('scroll',this.imageFunctionCaller, passiveSupported ? { passive: true } : false);
  }

  componentWillUnmount(){
    let passiveSupported = false;
    window.removeEventListener('scroll',this.imageFunctionCaller, passiveSupported ? { passive: true } : false);
  }

  imageAnimations(){
    if(this.left.current){
      let element = this.left.current;
      let elementPosition = element.offsetParent.offsetTop;
      let viewPosition = window.pageYOffset+window.innerHeight;
      //
      let sidePosition = window.innerWidth > 600 ? 'transform:translate3d(-65%,0,0);' : 'transform:translate3d(-55%,0,0);';

      const isIE = /*@cc_on!@*/false || !!document.documentMode;
      const isEdge = !isIE && !!window.StyleMedia;
      if(isEdge || isIE){
        sidePosition = 'transform:translate3d(-45%,0,0);'
      }

      if(elementPosition < viewPosition-200 ){
        this.left.current.style = 'transform:translate3d(90%,0,0); transition:all .3s;';
        this.right.current.style = `${sidePosition} transition:all .3s;`
      } else {
        this.left.current.style = ' transition:all .3s;';
        this.right.current.style = ' transition:all .3s;';
      }
    }
  }

  imageFunctionCaller = ()=>{
    this.imageAnimations();
  }

  render() {
    return (
      <div className="more-services-description">
        <LazyLoad offsetVertical={700} debounce={false}>
          <div className="clip u-margin-top-huge">
            <div className="clip--left" ref={this.left}></div>
            <div className="clip--right" ref={this.right}></div>
          </div>
        </LazyLoad>

        <Card heading={this.card1.heading} text={this.card1.text} pic1={Pic1}  FadeIn={this.props.FadeIn} link="/parking"/>
        <Card heading={this.card2.heading} text={this.card2.text} pic1={Pic2}  FadeIn={this.props.FadeIn} link="/events"/>
      </div>
    );
  }
}

export default LastSection;
