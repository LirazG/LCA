import React, { Component } from 'react';
import WelcomePic from '../welcome-pic.js';


class Hotel extends Component {


  render() {
    return (
      <main>
        <WelcomePic classProp={'welcome__img welcome__img--sports'}/>
        <div className="row">
          <h2 className="heading2">Avitaciones</h2>
        </div>
      </main>

    );
  }
}

export default Hotel;
