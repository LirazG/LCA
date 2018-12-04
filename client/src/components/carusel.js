import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

import Pic1 from '../img/breakfest.jpg';
import Pic2 from '../img/jacuzi2.jpg';
import Pic3 from '../img/paris.jpg';


class Carusel extends Component {

  constructor(props){
    super(props);

    this.caruselClickPlus = this.caruselClickPlus.bind(this);
    this.caruselClickMinus = this.caruselClickMinus.bind(this);
    this.state={
      carusel1:'image__container--img fade-in',
      carusel2:'image__container--img fade-out',
      carusel3:'image__container--img fade-out'
    };
  }

  componentDidMount(){
    this.caruselCurrentActive = 1;
    this.interval = setInterval(()=>{
      if(this.caruselCurrentActive === 3){
        this.caruselCurrentActive = 1;
      } else {
        this.caruselCurrentActive++;
      }

      this.caruselChanger(this.caruselCurrentActive);
    },3000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
    window.removeEventListener('wheel',(e)=>{});
  }

  caruselChanger(caruselCurrentActive){

    if(caruselCurrentActive === 3){
      this.setState(
        {
          carusel1:'image__container--img fade-in',
          carusel2:'image__container--img fade-out',
          carusel3:'image__container--img fade-out'
        }
      );

    } else if(caruselCurrentActive === 2){
      this.setState(
        {
          carusel1:'image__container--img fade-out',
          carusel2:'image__container--img fade-out',
          carusel3:'image__container--img fade-in'
        }
      );

    } else if(caruselCurrentActive === 1){
      this.setState(
        {
          carusel1:'image__container--img fade-out',
          carusel2:'image__container--img fade-in',
          carusel3:'image__container--img fade-out'
        }
      );
    }

  }

  caruselClickPlus(){

    if(this.interval){
      clearInterval(this.interval);
    }

    if(this.timeout){
      clearTimeout(this.timeout);
    }

    if(this.timer){
      clearTimeout(this.timer);
    }

    if(this.caruselCurrentActive === 3){
      this.caruselCurrentActive = 1;
    } else {
      this.caruselCurrentActive++;
    }
    this.caruselChanger(this.caruselCurrentActive);

    this.timer = setTimeout(()=>{
      this.interval = setInterval(()=>{
        if(this.caruselCurrentActive === 3){
          this.caruselCurrentActive = 1;
        } else {
          this.caruselCurrentActive++;
        }

        this.caruselChanger(this.caruselCurrentActive);
      },3000);
    },3000);
  }

  caruselClickMinus(){

    if(this.interval){
      clearInterval(this.interval);
    }

    if(this.timer){
      clearTimeout(this.timer);
    }


    if(this.caruselCurrentActive === 1){
      this.caruselCurrentActive = 3;
    } else {
      this.caruselCurrentActive--;
    }
    this.caruselChanger(this.caruselCurrentActive);

    this.timer = setTimeout(()=>{
      this.interval = setInterval(()=>{
        if(this.caruselCurrentActive === 3){
          this.caruselCurrentActive = 1;
        } else {
          this.caruselCurrentActive++;
        }

        this.caruselChanger(this.caruselCurrentActive);
      },3000);
    },3000);

  }



  render() {
    return (
      <LazyLoad offsetVertical={700} debounce={false} className="image__container">
        <div>
          <div className="image__container--arrow--1" onClick={this.caruselClickPlus}></div>
          <img src={Pic1} alt="breakfest" className={this.state.carusel1}/>
          <img src={Pic2} alt="woman-in-jacuzi" className={this.state.carusel2}/>
          <img src={Pic3} alt="paris" className={this.state.carusel3}/>
          <span className="image__container--arrow--2" onClick={this.caruselClickMinus}></span>
        </div>
      </LazyLoad>
    );
  }
}

export default Carusel;
