import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
//middlewares
import middlewares from '../../middleware/middleware';

class MainHomeComponent extends Component {

  constructor(props){
    super(props);

    this.title = React.createRef();
    this.picture = React.createRef();
    this.state={title:'main-display-component__div--h1',picture:'main-display-component__img'};
  }

  componentDidMount(){
    this.element = this.title.current;
    this.stateHeading = {title:'main-display-component__div--h1 main-display-component__div--h1--activated'};
    this.stateRegularHeading = {title:'main-display-component__div--h1'};
    let passiveSupported = middlewares.checkPassiveOptionBrowser();
    window.addEventListener('scroll',this.fadeInCaller, passiveSupported ? { passive: true } : false);

    if(this.props.img){
      this.element2 = this.picture.current;
      this.statePicture = {picture:'main-display-component__img main-display-component__img--activated'};
      this.stateRegularPicture = {picture:'main-display-component__img'};
      window.addEventListener('scroll',this.fadeInCaller2, passiveSupported ? { passive: true } : false);
    }

  }

  componentWillUnmount(){
    let passiveSupported = false;
    window.removeEventListener('scroll',this.fadeInCaller, passiveSupported ? { passive: true } : false);

    if(this.props.img){
      window.removeEventListener('scroll',this.fadeInCaller2, passiveSupported ? { passive: true } : false);
    }
  }

  // created so can be called in event handler so it can be removed(anonymos functions cant be removed )

  fadeInCaller = () =>{
    this.props.FadeIn.call(this,this.element,this.stateHeading,this.stateRegularHeading)
  }

  fadeInCaller2 = () =>{
    this.props.FadeIn.call(this,this.element2,this.statePicture,this.stateRegularPicture,200)
  }


  render() {
    if(this.props.img){
      return (
        <div>
          <div className="main-display-component">
            <div className="main-display-component__div">
              <p className="main-display-component__div--p">{this.props.PreTitle}</p>
              <h1 className={this.state.title} ref={this.title}>{this.props.Title}</h1>
              <p className="main-display-component__div--p">{this.props.SubTitle}</p>
            </div>

            <div className={this.state.picture} ref={this.picture}>
              <div className="main-display-component__img--curtain"></div>
              <LazyLoad offsetVertical={700} debounce={false}>
                <div className="main-display-component__img--img" style={{ backgroundImage: `url(${this.props.img})`}}></div>
              </LazyLoad>
            </div>

          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="main-display-component">
            <div className="main-display-component__div">
              <p className="main-display-component__div--p">{this.props.PreTitle}</p>
              <h1 className={this.state.title} ref={this.title}>{this.props.Title}</h1>
              <p className="main-display-component__div--p">{this.props.SubTitle}</p>
            </div>

          </div>
        </div>
      );
    }

  }
}

export default MainHomeComponent;
