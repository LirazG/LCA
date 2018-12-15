import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
//middlewares
import middlewares from '../../middleware/middleware';

class ParkingInfoTab extends Component {
  constructor(props){
    super(props);

    this.parentElement = React.createRef();

    this.state = {

    };
  }

  componentDidMount(){
    if(this.props.containerclass.indexOf('right') !== -1){
      this.setState({activated:'transform-from-left'});
      this.stateRegular = {activated:'transform-from-left'};
    } else {
      this.setState({activated:'transform-from-right'});
      this.stateRegular = {activated:'transform-from-right'};
    }
    this.stateActive = {activated:'transform-disactivated'}

    let passiveSupported = middlewares.checkPassiveOptionBrowser();
    window.addEventListener('scroll',this.fadeInCaller, passiveSupported ? { passive: true } : false);
  }

  componentWillUnmount(){
    let passiveSupported = false;
    window.removeEventListener('scroll',this.fadeInCaller, passiveSupported ? { passive: true } : false);
  }

  fadeInCaller = ()=>{
    this.props.FadeIn.call(this,this.parentElement.current,this.stateActive,this.stateRegular);
  }

  render() {

    return (
      <div className={"parking-info " + this.state.activated } ref={this.parentElement}>
        <LazyLoad offsetVertical={700} debounce={false} className={this.props.containerclass}>
          <img src={this.props.img} alt="parkingpicture" className="parking-info__container--img"/>
        </LazyLoad>

        <div className={this.props.textclass}>
            <h5 className="heading5--noborder">{this.props.heading}</h5>
            <p className="paragraph-sports paragraph-sports--activated">{this.props.text}</p>
        </div>
      </div>
    );
  }
}

export default ParkingInfoTab;
