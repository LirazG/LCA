import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

class Room extends Component {

  constructor(props){

    super(props);

    this.state = {
      fade: 'no-fade-card'
    }

    this.roomAttributesList = [];

    for(let i = 0; i < this.props.attributes.length; i++){
      this.roomAttributesList.push(<li className="room__info-list--item" key={i}>{this.props.attributes[i]}</li>)
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.room = React.createRef();
  }

  componentDidMount(){
    window.addEventListener('scroll',this.handleScrollCaller);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll',this.handleScrollCaller);
  }

  handleScroll(element,stateActive,stateRegular,offsetTopAddition = 0){
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

  render() {

    return (

        <div className={this.state.fade + ' room u-margin-top-big room'} ref={this.room}>
          <h2 className="heading2">{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}</h2>
          <LazyLoad offsetVertical={700} debounce={false} className="room__image-container">
              <img className="room__image-container__picture" src={this.props.picture} alt="roomPicture"/>
          </LazyLoad>
          <div className="room__info-container">
            <ul className="room__info-list u-margin-top-small">
              {this.roomAttributesList}
            </ul>
            <h3 className="heading3 u-text-center u-margin-bottom-medium">Pricio: <b>{this.props.price}</b> soles por noche</h3>
          </div>
          <Link to={'/hotel/reservation/' + this.props.name} className="btn btn--gold">Reservar !</Link>
        </div>

    );
  }
}

export default Room;