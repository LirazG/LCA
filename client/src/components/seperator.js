import React from 'react';
import LazyLoad from 'react-lazy-load';

const Seperator = (props) => {
  return (
    <LazyLoad offsetVertical={700} debounce={false} className="seperator u-margin-top-big u-margin-bottom-big">
      <div className="seperator--img" style={{ backgroundImage: `url(${props.bgimage})`,backgroundPosition:`${props.bgposition}` }}></div>
    </LazyLoad>
  );
}

export default Seperator;
