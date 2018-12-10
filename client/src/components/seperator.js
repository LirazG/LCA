import React from 'react';
import LazyLoad from 'react-lazy-load';

const Seperator = (props) => {
  const isIE = /*@cc_on!@*/false || !!document.documentMode;
  const isEdge = !isIE && !!window.StyleMedia;
  let className;
  if(isEdge || isIE){
    className = 'seperator seperator__height u-margin-top-big u-margin-bottom-big';
  } else {
    className = 'seperator u-margin-top-big u-margin-bottom-big';
  }
  return (
    <LazyLoad offsetVertical={700} debounce={false} className={className}>
      <div className="seperator--img" style={{ backgroundImage: `url(${props.bgimage})`,backgroundPosition:`${props.bgposition}`}}></div>
    </LazyLoad>
  );
}

export default Seperator;
