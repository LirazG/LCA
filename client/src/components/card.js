import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

import { Link } from 'react-router-dom';

class Card extends Component {

  constructor(props){
    super(props);

    this.state={
      st:' no-fade',
    }

    this.element = React.createRef();
  }

  componentDidMount(){
    //classes fadein and nofade are in utillty.scss
    this.elem = this.element.current;
    this.activeState = {st:' fade-in-card'} ;
    this.regularState= {st:' no-fade-card' };
    window.addEventListener('scroll',this.fadeInCaller);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll',this.fadeInCaller);
  }

  // created so can be called in event handler so it can be removed(anonymos functions cant be removed )

  fadeInCaller = () =>{
    this.props.FadeIn.call(this,this.elem,this.activeState,this.regularState,350)
  }

  render() {
    return (
      <div className="row u-margin-top-big" ref={this.element}>
        <div className={'card' + this.state.st}>

            <div className="card__pic">
              <img src={this.props.pic1} alt="card-img" className="card__pic--img--1"/>
            </div>

          <div className="card__text">
            <h3 className="heading5">{this.props.heading}</h3>
            <p className="u-margin-bottom-medium">
              {this.props.text}
            </p>
            <Link to={this.props.link} className="btn btn--white">Mas Informacion</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
