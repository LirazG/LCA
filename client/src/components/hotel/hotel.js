import React, { Component } from 'react';
import Room from './room.js';
import WelcomePic from '../welcome-pic.js';
import Seperator from '../seperator.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
// image
import SeperatorImg from '../../img/seperator-hotel-reserve.jpg';
//import information about the rooms
import RoomInfo from './room-info';

// Date picker dependencies
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";


class Hotel extends Component {

  constructor(props){

    super(props);

    this.state = {
      checkIn:moment(),
      checkOut:moment().add(1, 'days'),
      display:' display-off',
      //list of availible rooms by user picked dates - array of display
      arrayOfAvailibleRooms:['pima','tanguis','mambo tango','cuarto de la luna','cuarto del sol','seul 88','retro room','vichama room','tejidos peruanos','shangai room']
    }

    //require all room pictures
    this.images = this.importAll(require.context('../../img/hotel-page-img', false, /\.(png|jpe?g|svg)$/));
    //devide room to 2 columns
    this.roomsEven = [];
    this.roomsOdd = [];
    for(let i = 0; i < RoomInfo.length; i++){
      if(i % 2 === 0){
        this.roomsEven.push(<Room key={RoomInfo[i].details.name} picture={this.images[i]} attributes={RoomInfo[i].attributes} name={RoomInfo[i].details.name} price={RoomInfo[i].details.price}></Room>)
      } else {
        this.roomsOdd.push(<Room key={RoomInfo[i].details.name} picture={this.images[i]} attributes={RoomInfo[i].attributes} name={RoomInfo[i].details.name} price={RoomInfo[i].details.price}></Room>)
      }
    }

  }

  componentDidMount(){
    // fetch taken dates from server
    axios.get('/api/users/reserve/room')
      .then(res =>{
        this.roomDatesData = res.data;
      }).catch(err =>{console.log(err)});
  }


  importAll(arr){
    return arr.keys().map(arr);
  }

  handleCheckinChange = (data) =>{
    let holder = data.format();
    this.setState({
      checkIn:data,
      checkOut:moment(holder).add(1, 'days')
    });
  }

  handleCheckoutChange = (data) =>{
    this.setState({
      checkOut:data
    });
  }

  checkAvailabillity = () =>{
    this.setState({
      arrayOfAvailibleRooms:['pima','tanguis','mambo tango','cuarto de la luna','cuarto del sol','seul 88','retro room','vichama room','tejidos peruanos','shangai room']
    },()=>{
      let length = this.state.checkOut.startOf('day').diff(this.state.checkIn.startOf('day'), 'days');
      let userInputDatesArray = [];
      let holder = this.state.checkIn;
      for(let i = 0; i < length; i++){
        userInputDatesArray.push(holder);
        let holderFormat = holder.format();
        holder = moment(holderFormat).add(1, 'days');
      }

      for(let i in this.roomDatesData){
        console.log(this.roomDatesData[i][Object.keys(this.roomDatesData[i])[0]])
        let dateArray = this.roomDatesData[i][Object.keys(this.roomDatesData[i])[0]];
        for(let j in dateArray){
          let checkIn = moment([dateArray[j].checkIn.yearCheckin,dateArray[j].checkIn.monthCheckin-1,dateArray[j].checkIn.dayCheckin]);
          let checkOut = moment([dateArray[j].checkOut.yearCheckout,dateArray[j].checkOut.monthCheckout-1,dateArray[j].checkOut.dayCheckout]);
          for(let k in userInputDatesArray){
            if(userInputDatesArray[k].isBetween(checkIn,checkOut,'days', '[)') === true){
              let index = this.state.arrayOfAvailibleRooms.indexOf(Object.keys(this.roomDatesData[i])[0]);
              let newArr =  this.state.arrayOfAvailibleRooms;
              newArr.splice(index,1);
              this.setState({arrayOfAvailibleRooms:newArr})
              break;
            }
          }
        }
      }
    });
    this.setState({display:' display-on'});
  }



  render() {

    let newMinDateFormat = this.state.checkIn.format()
    let newMinDate = moment(newMinDateFormat).add(1,'days');

    return (
      <main>
        <WelcomePic classProp={'welcome__img welcome__img--hotel'}/>

        <div className="row u-text-center">
          <h3 className="heading3 u-margin-top-medium u-margin-bottom-medium">Verifique la fecha disponible.</h3>
          <DatePicker
            selected={this.state.checkIn}
            onChange={this.handleCheckinChange}
            dateFormat="DD/MM/YYYY"
            timeCaption="time"
            minDate={moment()}
            withPortal
          />
          <DatePicker
            selected={this.state.checkOut}
            onChange={this.handleCheckoutChange}
            dateFormat="DD/MM/YYYY"
            timeCaption="time"
            minDate={newMinDate}
            withPortal
          />

          <button className="btn btn--gold u-margin-top-medium" onClick={this.checkAvailabillity}>Buscar</button>
        </div>


        <div className={'row u-margin-top-medium u-margin-bottom-medium' + this.state.display}>
          <h3 className="heading3">disponible para ti:</h3>
          <div className="u-text-center">
          {this.state.arrayOfAvailibleRooms.length === 0 ? (<div style={{width:'100%'}} className="heading4 u-margin-top-medium">Perdon, no hay espacio disponible para esta fecha</div>):null}
            {this.state.arrayOfAvailibleRooms.map((item,i) =>{
              let newTo = {
                pathname:'/hotel/reservation/' + item,
                checkInDate:this.state.checkIn,
                checkOutDate:this.state.checkOut
              }
              return (
                <div className='reservation-list' key={i}>
                  <Link to={newTo} className="btn btn--gold">{item}</Link>
                </div>
              )
            })}
          </div>
        </div>

        <div className="row u-text-center u-margin-top-medium u-margin-bottom-medium">
          <h2 className="heading2">Más información</h2>
          <div>
            <i className="arrow arrow--down arrow--down--1"></i>
          </div>
          <div>
            <i className="arrow arrow--down arrow--down--2"></i>
          </div>
          <div>
            <i className="arrow arrow--down arrow--down--3"></i>
          </div>
        </div>

        <Seperator bgimage={SeperatorImg}/>

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
