import React, { Component } from 'react';
import Room from './room.js';
import WelcomePic from '../welcome-pic.js';

//import information about the rooms
import RoomInfo from './room-info';

//import pictures for room components
import testPic from '../../img/hotel-page-img/TESTTTTTT.jpg'


class Hotel extends Component {

  constructor(props){

    super(props);

    this.roomsEven = [];
    this.roomsOdd = [];
    for(let i = 0; i < RoomInfo.length; i++){
      if(i % 2 === 0){
        this.roomsEven.push(<Room key={i} picture={testPic} attributes={RoomInfo[i].attributes} name={RoomInfo[i].name}></Room>)
      } else {
        this.roomsOdd.push(<Room key={i} picture={testPic} attributes={RoomInfo[i].attributes} name={RoomInfo[i].name}></Room>)
      }
    }

  }

  render() {

    return (
      <main>
        <WelcomePic classProp={'welcome__img welcome__img--hotel'}/>
        <div className="row">
          <h2 className="heading2">Avitaciones</h2>
        </div>

        <div className="row">
          <div className="col-1-of-2">
            {this.roomsEven}
          </div>
          <div className="col-1-of-2">
            {this.roomsOdd}
          </div>
        </div>

      </main>

    );
  }
}

export default Hotel;
