import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
//middlewares
import middlewares from '../../middleware/middleware';

class Room extends Component {

  constructor(props){

    super(props);

    this.state = {
      fade: 'no-fade-card',
      modal:'form-success',
      picture:''
    }

    this.roomAttributesList = [];
    this.numberOfGuests = [];

    for(let i = 0; i < this.props.details.maxGuests; i++){
      this.numberOfGuests.push(<i className="fas fa-user room__info-container__icon--icon" key={i}></i>)
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.room = React.createRef();
  }

  componentDidMount(){
    let passiveSupported = middlewares.checkPassiveOptionBrowser();
    window.addEventListener('scroll',this.handleScrollCaller, passiveSupported ? { passive: true } : false);
  }

  componentWillUnmount(){
    let passiveSupported = false;
    window.removeEventListener('scroll',this.handleScrollCaller, passiveSupported ? { passive: true } : false);
  }

  handleScroll(element,stateActive,stateRegular,offsetTopAddition = 0){
    if(window.innerWidth < 500 || window.innerHeight < 500){
      offsetTopAddition = 600;
    }

    let elementPosition = element.offsetTop + element.offsetHeight;
    let viewPosition = window.pageYOffset + window.innerHeight + offsetTopAddition;
    if(elementPosition <= viewPosition){
      this.setState(stateActive);
    } else {
      this.setState(stateRegular);
    }
  }

  handleScrollCaller = () =>{
    this.handleScroll(this.room.current,{fade:'fade-in-card'},{fade:'no-fade-card'},400);
  }

  modalOpen = () =>{
    this.setState({
      modal:'form-success form-success--display',
      picture:'room__image-container__gallery'
    });
  }

  modalCancel = () =>{
    this.setState({
      modal:'form-success ',
      picture:''
    });
  }

  render() {

    return (
      <div>
        <div className={this.state.modal} onClick={this.modalCancel}>
          <div className={this.state.picture} >
              <img className='room__image-container__picture' src={this.props.picture} alt="roomPicture" onClick={this.modalCancel}/>
          </div>
        </div>

        <div className={this.state.fade + ' room u-margin-top-big'} ref={this.room}>
          <h2 className="heading2">{this.props.details.name.charAt(0).toUpperCase() + this.props.details.name.slice(1)}</h2>
          <LazyLoad offsetVertical={700} debounce={false} className='room__image-container' once>
              <img className='room__image-container__picture' src={this.props.picture} alt="roomPicture" onClick={this.modalOpen}/>
          </LazyLoad>

          <div className="room__info-container">

          <div className="room__info-container__list">
            <div className="room__info-container__icon">
              <h4 className="paragraph-room"><i className="fas fa-bed room__info-container__icon--icon"></i> - {this.props.details.bed}</h4>
            </div>
            <div className="room__info-container__icon">
              <h4 className="paragraph-room"><i className="fas fa-shower room__info-container__icon--icon"></i> - {this.props.details.bathroom}</h4>
            </div>
            <div className="room__info-container__icon">
              <h4 className="paragraph-room"><i className="fas fa-coffee room__info-container__icon--icon"></i> - Desayuno disponible, se paga en el alojamiento</h4>
            </div>
            <div className="room__info-container__icon">
              {this.props.details.other.one ? <h4 className="paragraph-room"><i className="fas fa-info room__info-container__icon--icon"></i> - {this.props.details.other.one}</h4>:null}
            </div>
          </div>

            <div className="room__info-container__icon--guests">
              <p className="paragraph-room paragraph-room--2 u-text-center u-margin-top-medium">Huéspedes</p>
              <div className="u-text-center">{this.numberOfGuests}</div>
            </div>

          </div>

          <div className="room__info-container__icon--price">
            <p className="paragraph-room paragraph-room--2 u-text-center">Precio</p>
            <p className="paragraph-room u-text-center"><b>S/.{this.props.details.price}</b></p>
          </div>
          <Link to={'/hotel/reservation/' + this.props.details.name} className="btn btn--gold room__info-container__icon--button">Reservar !</Link>
        </div>

      </div>
    );
  }
}

export default Room;
