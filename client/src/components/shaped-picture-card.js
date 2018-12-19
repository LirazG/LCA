import React from 'react';
import LazyLoad from 'react-lazy-load';
import CustomForm from './custom-form.js'

const ShapedCard = (props) => {
    return (
      <LazyLoad offsetVertical={700} debounce={false} once>
        <div className="row u-margin-bottom-big u-margin-top-big">
          <div className={'shaped-card' + props.className}>
            <div className={'shaped-card__text '}>
              <CustomForm />
            </div>
            <div className="shaped-card__shape"></div>
          </div>
        </div>
      </LazyLoad>
    );
}

export default ShapedCard;
