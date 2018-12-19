import React from 'react';
import LazyLoad from 'react-lazy-load';

import MenuFront from '../../img/menu1.jpg';
import MenuBack from '../../img/menu2.jpg';

const MenuSection = () => {

    return (
      <section className="bar__menu">
        <h3 className="heading2">Menu</h3>
        <LazyLoad offsetVertical={700} debounce={false} once>
          <div className="flip-card">
            <div className="flip-card__side flip-card__side--front">
              <img src={MenuFront} alt="menu" className="bar__menu--pic"/>
            </div>

            <div className="flip-card__side flip-card__side--back">
              <img src={MenuBack} alt="menu" className="bar__menu--pic"/>
            </div>
          </div>
        </LazyLoad>
      </section>
    );
}

export default MenuSection;
