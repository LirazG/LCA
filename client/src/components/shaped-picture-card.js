import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import CustomForm from './custom-form.js'

class ShapedCard extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <LazyLoad offsetVertical={700} debounce={false}>
        <div className="row u-margin-bottom-big u-margin-top-big">
          <div className={'shaped-card' + this.props.className}>

            <div className={'shaped-card__text '}>
              <CustomForm />
            </div>

            <div className="shaped-card__shape">

            </div>
          </div>
        </div>
      </LazyLoad>
    );
  }
}

export default ShapedCard;
