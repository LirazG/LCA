import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

class Seperator extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <LazyLoad offsetVertical={700} debounce={false} className="seperator u-margin-top-big u-margin-bottom-big">
        <div className="seperator--img" style={{ backgroundImage: `url(${this.props.bgimage})`,backgroundPosition:`${this.props.bgposition}` }}></div>
      </LazyLoad>
    );
  }
}

export default Seperator;
