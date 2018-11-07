import React, { Component } from 'react';

import WelcomePic from '../welcome-pic.js';
import FirstSection from './first-section.js';
import MenuSection from './menu-section.js';
import EventSection from './event-section.js';
import Seperator from '../seperator.js';
import Gallery from '../gallery.js';

import SeperatorBar1 from '../../img/bar-food-seperator.jpg';


class Bar extends Component {

  constructor(props){
    super(props);

    this.images = this.importAll(require.context('../../img/bar-page-img', false, /\.(png|jpe?g|svg)$/));
  }

  importAll(arr){
    return arr.keys().map(arr);
  }

  handleScroll(element,stateActive,stateRegular,offsetTopAddition = 0){
    let elementPosition = element.offsetParent.offsetTop + element.offsetParent.offsetHeight;
    let viewPosition = window.pageYOffset+window.innerHeight + offsetTopAddition;
    if(elementPosition <= viewPosition){
      this.setState(stateActive);
    } else {
      this.setState(stateRegular);
    }
  }


  render() {
    return (
      <main className="bar">
        <WelcomePic classProp={'welcome__img welcome__img--bar'}/>
        <FirstSection fadeIn={this.handleScroll}/>
        <Seperator bgimage={SeperatorBar1} />
        <MenuSection />
        <EventSection fadeIn={this.handleScroll}/>
        <Gallery images={this.images}/>

      </main>
    );
  }
}

export default Bar;
