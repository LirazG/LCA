import React, { Component } from 'react';
import Room from './room.js';
import WelcomePic from '../welcome-pic.js';

//import information about the rooms
import RoomInfo from './room-info';

class Hotel extends Component {

  constructor(props){

    super(props);
    //require all room pictures
    this.images = this.importAll(require.context('../../img/hotel-page-img', false, /\.(png|jpe?g|svg)$/));

    this.roomsEven = [];
    this.roomsOdd = [];
    for(let i = 0; i < RoomInfo.length; i++){
      if(i % 2 === 0){
        this.roomsEven.push(<Room key={i} picture={this.images[i]} attributes={RoomInfo[i].attributes} name={RoomInfo[i].details.name} price={RoomInfo[i].details.price}></Room>)
      } else {
        this.roomsOdd.push(<Room key={i} picture={this.images[i]} attributes={RoomInfo[i].attributes} name={RoomInfo[i].details.name} price={RoomInfo[i].details.price}></Room>)
      }
    }

  }

  importAll(arr){
    return arr.keys().map(arr);
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
