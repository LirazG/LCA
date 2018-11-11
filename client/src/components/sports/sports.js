import React, { Component } from 'react';
// layout components
import Info from './info.js';
import Gallery from '../gallery.js';
import WelcomePic from '../welcome-pic.js';

//
class Sports extends Component {

  constructor(props) {
    super(props);
    this.images = this.importAll(require.context('../../img/sports-page-img', false, /\.(png|jpe?g|svg)$/));
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

  importAll(arr){
    return arr.keys().map(arr);
  }

  render() {
    return (
      <main className="sports-page">
        <WelcomePic classProp={'welcome__img welcome__img--sports'}/>
        <Info fadeIn={this.handleScroll}/>
        <Gallery images={this.images}/>
      </main>
    );
  }
}

export default Sports;
