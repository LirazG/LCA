import React, { Component } from 'react';

import WelcomePic from '../welcome-pic.js';
import Info from './info.js';

class Parking extends Component {

  constructor(props){
    super(props);

  }


  render() {
    return (
      <main>
        <WelcomePic classProp={'welcome__img welcome__img--parking'}/>
        <Info />
      </main>
    );
  }
}

export default Parking;
