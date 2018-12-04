import React from 'react';

import WelcomePic from '../welcome-pic.js';
import Info from './info.js';

const Parking = () => {
  return (
    <main>
      <WelcomePic classProp={'welcome__img welcome__img--parking'}/>
      <Info />
    </main>
  );
}

export default Parking;
