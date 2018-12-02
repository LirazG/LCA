import React, { Component } from 'react';
import WelcomePic from '../welcome-pic.js';
import RoomsInfo from './room-info.js';
import axios from 'axios';

// Date picker dependencies
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class HotelReservation extends Component {

  constructor(props){

    super(props);

    this.state = {
      checkIn:this.props.location.checkInDate || moment(),
      checkOut:this.props.location.checkOutDate || moment(),
      dateExclude:[],
      firstName:'',
      lastName:'',
      phone:'',
      email:'',
      errors:{},
      modal:"form-success",
      message:"form-success__message"
    }
  }


  componentWillMount(){
    // check if url is bad and redirect if so
    let routesArray = ['pima','tanguis','mambo tango','cuarto de la luna','cuarto del sol','seul 88','retro room','vichama room','tejidos peruanos','shangai room'];
    if(!routesArray.includes(this.props.match.params.value)){
      window.location.pathname = '/hotel'
    }

    //fetch room data
    this.images = (require.context('../../img/hotel-page-img', false, /\.(png|jpe?g|svg)$/));
    this.images = this.images.keys().map(this.images)

    for(let i in RoomsInfo){
      if(RoomsInfo[i].details.name === this.props.match.params.value){
        this.roomPrice = RoomsInfo[i].details.price;
        this.roomName = RoomsInfo[i].details.name;
        this.roomImage = this.images[i];
      }
    }
  }


  componentDidMount(){

// fetch taken dates from server
    axios.get('/api/users/reserve/room')
      .then(res =>{
        for(let i in res.data){
          if(Object.keys(res.data[i])[0] === this.roomName){
            let obj = res.data[i];
            let key = Object.keys(res.data[i])[0] ;
            this.roomData = obj[key];
            console.log(this.roomData);
          }
        }
        this.setForbiddenDates();
      }).catch(err =>{console.log(err)});
  }

  //disable taken dates to user
  setForbiddenDates = () =>{
    //initialize taken dates array
    let takenDatesArray = [];
    //calc how many days are taken for each reservation
    for(let i in this.roomData){
      let momentCheckIn = moment([this.roomData[i].checkIn.yearCheckin,this.roomData[i].checkIn.monthCheckin -1,this.roomData[i].checkIn.dayCheckin]).startOf('day');
      let momentCheckOut = moment([this.roomData[i].checkOut.yearCheckout,this.roomData[i].checkOut.monthCheckout -1,this.roomData[i].checkOut.dayCheckout]).startOf('day');
      let length = momentCheckOut.diff(momentCheckIn,'days');

      for(let j = 0; j < length; j++){
          takenDatesArray = [...takenDatesArray,momentCheckIn];
          let format = moment(momentCheckIn);
          format = format.add(1, 'days');
          format.format();
          format = moment(format);
          momentCheckIn = format;
      }
    }
    this.setState({dateExclude:takenDatesArray});
  }


  // determines the maximum check out date the user can pick
  setMaximumCheckOutDate = () =>{
    //create and sort milliseconds date array for comparison
    let millisecondsArray = this.state.dateExclude.map(item => {
      return item.valueOf();
    });
    millisecondsArray.sort((a, b) => a - b);
    // check if no max date is needed.
    if(millisecondsArray[millisecondsArray.length -1] < this.state.checkIn.valueOf()){
      this.maximumCheckOutValue = moment([2100]);
    }

    //check max date
    for(let i in millisecondsArray){
      if(this.state.checkIn.valueOf() < millisecondsArray[i] ){
        this.maximumCheckOutValue = moment(millisecondsArray[i]);
        break;
      }
    }
  }

  //on change input vaule handlers
  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  //handle checkin time change
  handleCheckinChange = (date) =>{
    this.setState({checkIn:date,checkOut:date},()=>{
      this.setMaximumCheckOutDate ();
    })
  }

  //handle checkin time change
  handleCheckoutChange = (date) =>{
    this.setState({checkOut:date})
  }

  //submit form
  formSubmit = (e) =>{
    e.preventDefault();

    const newRoomReservation = {
      firstName:this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      email:this.state.email,
      yearCheckin:this.state.checkIn.format('YYYY'),
      monthCheckin:this.state.checkIn.format('MM'),
      dayCheckin:this.state.checkIn.format('DD'),
      yearCheckout:this.state.checkOut.format('YYYY'),
      monthCheckout:this.state.checkOut.format('MM'),
      dayCheckout:this.state.checkOut.format('DD'),
      roomName:this.roomName
    }

    console.log(newRoomReservation);

    axios.post('/api/users/reserve/room',newRoomReservation)
      .then(res =>{
        this.setState({
          checkIn:this.props.checkIn || moment(),
          checkOut:this.props.checkOut || moment(),
          dateExclude:[],
          firstName:'',
          lastName:'',
          phone:'',
          email:'',
          errors:{},
          modal:"form-success form-success--display",
          message:"form-success__message form-success__message--display"
        });
      })
        .catch(err =>{
          this.setState({errors:err.response.data})
        })
  }

  modalCancel = () => {
    this.setState({
      modal:"form-success",
      message:"form-success__message"
    },()=>{
      window.location.pathname = '/hotel';
    });
  }


  render() {

    const {errors} = this.state;
    this.setMaximumCheckOutDate ();
    const maxValue = this.maximumCheckOutValue;

    return (
      <main>
        <WelcomePic classProp={'welcome__img welcome__img--hotel'}/>
        <div className="row">
          <h2 className="heading2">Reservar avitacion - {this.props.match.params.value.charAt(0).toUpperCase() + this.props.match.params.value.slice(1)}</h2>
          <h5 className="heading5--noborder u-text-center u-margin-bottom-medium">Precio: <b>{this.roomPrice} soles</b> por noche</h5>
            <div className="reservation-picture">
              <img className="reservation-picture__image" src={this.roomImage} alt="room picture"/>
            </div>
          <hr className="u-margin-top-big"/>
        </div>

        <div className="row">
          <div className="col-1-of-2 u-margin-top-medium">
            <form id="fields" className="form">

              <label htmlFor="Checkin-date">Check-in</label>
              <DatePicker
                id="Checkin-date"
                selected={this.state.checkIn}
                onChange={this.handleCheckinChange}
                excludeDates={this.state.dateExclude}
                dateFormat="DD/MM/YYYY"
                timeCaption="time"
                minDate={moment()}
                withPortal
              />

              <label htmlFor="Checkout-date">Check-out</label>
              <DatePicker
                id="Checkout-date"
                selected={this.state.checkOut}
                onChange={this.handleCheckoutChange}
                excludeDates={this.state.dateExclude}
                dateFormat="DD/MM/YYYY"
                timeCaption="time"
                minDate={this.state.checkIn}
                maxDate={maxValue}
                withPortal
              />
              {errors.date && (<div className="form-validation">{errors.date}</div>)}

              <div className="react-datepicker-wrapper">
                <label htmlFor="name">Nombre:</label>
                <input maxLength="30"  className={this.state.form2} type="text" id="name" name="firstName" value={this.state.firstName} onChange={this.onChange} />
                {errors.firstName && (<div className="form-validation">{errors.firstName}</div>)}
              </div>

              <div className="react-datepicker-wrapper">
                <label htmlFor="last-name">Apellido:</label>
                <input maxLength="30"  className={this.state.form3} type="text" id="last-name" name="lastName" value={this.state.lastName} onChange={this.onChange} />
                {errors.lastName && (<div className="form-validation">{errors.lastName}</div>)}
              </div>

              <div className="react-datepicker-wrapper">
                <label htmlFor="phone">Teléfono:</label>
                <input maxLength="30"  className={this.state.form1} type="text" id="phone" name="phone" value={this.state.phone} onChange={this.onChange} />
                {errors.phone && (<div className="form-validation">{errors.phone}</div>)}
              </div>

              <div className="react-datepicker-wrapper">
                <label htmlFor="email">Email:</label>
                <input maxLength="30"  className={this.state.form1} type="text" id="email" name="email" value={this.state.email} onChange={this.onChange} />
                {errors.email && (<div className="form-validation">{errors.email}</div>)}
              </div>

            </form>
          </div>

          <div className="col-1-of-2">
            <div className="form__assurance u-text-center">
              <h2 className="heading2">Mi reserva</h2>
              <p className="form__assurance--p">Nombre: <b>{this.state.firstName}</b></p>
              <p className="form__assurance--p">Apellido: <b>{this.state.lastName}</b></p>
              <p className="form__assurance--p">Teléfono: <b>{this.state.phone}</b></p>
              <p className="form__assurance--p">Check-in: <b>{this.state.checkIn.format('DD/MM/YYYY')}</b></p>
              <p className="form__assurance--p">Check-out: <b>{this.state.checkOut.format('DD/MM/YYYY')}</b></p>
              <p className="form__assurance--p">noches total: <b>{this.state.checkOut.startOf('day').diff(this.state.checkIn.startOf('day'), 'days')}</b></p>
              <p className="form__assurance--p">Precio total: <b>{this.state.checkOut.startOf('day').diff(this.state.checkIn.startOf('day'), 'days') * this.roomPrice} soles</b></p>
            </div>
          </div>

        </div>

        <div className="row u-text-center">
          <h2 className="heading2">Sección de pago</h2>
          <button onClick={this.formSubmit} type="submit" className="btn btn--gold u-margin-top-medium">Reservar !</button>
        </div>

        <div className={this.state.modal} onClick={this.modalCancel}></div>

        <div className={this.state.message}>
          <div className="form-success__message__success">
            <i className="fas fa-check-circle form-success__message__success--icon"></i>
            <p className="form-success__message__success--text">Gracias por contactarnos, nos pondremos en contacto con usted lo antes posible.</p>
          </div>
          <div className="form-success__message__cancel" onClick={this.modalCancel}>
            <i className="fas fa-times form-success__message__cancel--icon"></i>
          </div>
        </div>

      </main>
    );
  }
}

export default HotelReservation;
