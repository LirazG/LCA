import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WelcomePic from '../welcome-pic.js';
import axios from 'axios';

// Date picker dependencies
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";


class SportsReservation extends Component {

  constructor(props) {
    super(props);

    this.currentField = this.props.location.field || window.location.pathname.slice(20);

    this.state={
      // date calender start value to current date
      Date: moment(),
      StartTime: moment().hour(0),
      EndTime: moment().hour(0),
      timeExclude: [],
      minCheckInTime:moment(),
      maxCheckOutTime:moment(),
      firstName:'',
      lastName:'',
      phone:'',
      errors:{},
      select:this.currentField,
      form1:'',
      form2:'',
      form3:'',
      form4:'',
      modal:'form-success ',
      message:"form-success__message ",
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeCheckIn = this.handleTimeCheckIn.bind(this);
    this.handleTimeCheckOut = this.handleTimeCheckOut.bind(this);
  }



  componentDidMount(){
    axios.get('/api/users/reserve/field')
      .then(res =>{
        if(this.currentField === 'small'){
          //save data to component variable
          this.currentDatesForField = res.data[0].dates;
          console.log(this.currentDatesForField)
        } else if(this.currentField === 'other'){
          //save data to component variable
          this.currentDatesForField = res.data[1].dates;
          console.log(this.currentDatesForField)
        } else {
          //save data to component variable
          this.currentDatesForField = res.data[2].dates;
        }
        this.handleDateChange(this.state.Date);
      })
      .catch(err => {console.log(err)});
  }



  //reservation dates functionallty
    handleDateChange(date) {
      this.setState({Date: date,timeExclude: []},()=>{
        const currentDate = {
          year:this.state.Date.format('YYYY'),
          month:this.state.Date.format('MM'),
          day:this.state.Date.format('DD')
        }

        //initialize hour array
        var hourArray = [];
        for(let i in this.currentDatesForField){
          //chack for taken hours in the day
          if(this.currentDatesForField[i].year === Number(currentDate.year) && this.currentDatesForField[i].month === Number(currentDate.month) && this.currentDatesForField[i].day === Number(currentDate.day)){
            // create takes hours array
            hourArray = [...hourArray,...this.currentDatesForField[i].hours];
          }
        }
        //convert array for moment object to fit to Datepicker excludeTimes
        const momentArray = hourArray.map( item =>{
          return moment().hours(item).minutes(0).seconds(0);
        });

        const closedHoursArr = [
          moment().hour(2).minutes(0).seconds(0),
          moment().hour(3).minutes(0).seconds(0),
          moment().hour(4).minutes(0).seconds(0),
          moment().hour(5).minutes(0).seconds(0),
          moment().hour(6).minutes(0).seconds(0),
          moment().hour(7).minutes(0).seconds(0)
        ]
        this.setState({
          timeExclude: [...momentArray,...closedHoursArr]
        },()=>{console.log(this.state.timeExclude)});
      });
    }


    //reservation time functionallty
    handleTimeCheckIn(date){
      let newMinDate = date.hour();
      let hourArray = this.state.timeExclude.map((item)=>{
        return item.hour();
      });
      this.setState({StartTime:date,minCheckInTime:moment().hour(newMinDate)},()=>{
        //calculate the checkout time availible for user dispaly
        let i = this.state.StartTime.hour();
        if(i === 23){
          this.setState({maxCheckOutTime:moment().hour(23).minutes(59),EndTime:moment().hour(23).minutes(59)})
          return;
        }
        for(i ; i < 23 ; i++){
          if(hourArray.includes(i)){
            this.setState({maxCheckOutTime:moment().hour(i)});
            return;
          }
          if(i === 22){
            this.setState({maxCheckOutTime:moment().hour(23).minutes(59)});
            return;
          }
        }
      });
    }


    handleTimeCheckOut(date){
      this.setState({EndTime:date});
    }
//

    // change the url according to field taken
    selectUrlHandler = (e) =>{
       window.location.pathname = `/sports/reservation/${e.target.value}`
    }

    //on change input vaule handlers

    onChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      });
    }


// determine if display minutes or not according to end time choose

    displayFormatCalculator = () =>{
      if(this.state.EndTime.format('HH:mm') === '23:59'){
        return "HH:mm"
      } else {
        return "HH:00"
      }
    }


//submit reservation
    formSubmit = (e) => {
      e.preventDefault();

      let newFieldReservation = {
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        phone:this.state.phone,
        fieldName: this.currentField,
        year: this.state.Date.format('YYYY'),
        month: this.state.Date.format('MM'),
        day: this.state.Date.format('DD'),
        hourCheckin : String(this.state.StartTime.format('HH')),
        hourCheckout : String(this.state.EndTime.format('HH:mm'))
      }


      if(newFieldReservation.hourCheckout === '23:59'){
        newFieldReservation.hourCheckout = '24';
      } else {
        console.log(newFieldReservation.hourCheckout.slice(0, newFieldReservation.hourCheckout.length));
        newFieldReservation.hourCheckout = newFieldReservation.hourCheckout.slice(0, newFieldReservation.hourCheckout.length-3)
      }

        axios.post('/api/users/reserve/field',newFieldReservation)
          .then(res =>{
            this.setState({
              Date: moment(),
              StartTime: moment(),
              EndTime: moment(),
              minCheckInTime:moment(),
              maxCheckOutTime:moment(),
              firstName:'',
              lastName:'',
              phone:'',
              errors:{},
              modal:"form-success form-success--display",
              message:"form-success__message form-success__message--display",
              select:this.currentField
            });
          })
          .catch(err =>{
            this.setState({errors:err.response.data});

            const {errors} = this.state;

            if(errors.phone){
              this.setState({form1:"form-invalid"});
            } else {
              this.setState({form1:"form-valid"});
            }

            if(errors.firstName){
              this.setState({form2:"form-invalid"});
            } else {
              this.setState({form2:"form-valid"});
            }

            if(errors.lastName){
              this.setState({form3:"form-invalid"});
            } else {
              this.setState({form3:"form-valid"});
            }

            if(errors.hourCheckout){
              this.setState({form4:"form-invalid"});
            } else {
              this.setState({form4:"form-valid"});
            }
          });
    }



  render() {

    const {errors} = this.state;
    let calculator,priceCounter = 0;
    let day,night;
    let start = this.state.StartTime.format('HH');
    let end = this.state.EndTime.format('HH:mm');
    if(end === '23:59'){
      end = 24
    } else {
      end = this.state.EndTime.format('HH')
    }
    if(end - this.state.StartTime.format('HH') > 0){
      calculator = end - this.state.StartTime.format('HH');
    }
    if(this.currentField === 'big'){
      day = 80;
      night = 100;
    } else if (this.currentField === 'small'){
      day = 30;
      night = 40;
    } else {
      day = 20;
      night = 25;
    }
    for(let i = start; i < end ; i++){
      if(i < 19){
        priceCounter = priceCounter + day;
      } else {
        priceCounter = priceCounter + night;
      }
    }

    return (
      <main className="sports-reservation-page">
        <WelcomePic classProp={'welcome__img welcome__img--sports'}/>
        <div className="row">
          <h2 className="heading2">Reservar un campo</h2>
          <div className="u-text-center">
            <h5 className="heading5--noborder">Precio día: <b>{day} soles</b> (08:00 - 19:00)</h5>
            <h5 className="heading5--noborder">Precio noche: <b>{night} soles</b> (19:00 - 02:00)</h5>
            <h5 className="heading5--noborder">*Mínimo de una hora</h5>
          </div>
          <hr className="u-margin-top-big"/>
        </div>

        <div className="row">
          <div className="col-1-of-2 u-margin-top-medium">
            <form id="fields" className="form">

              <div className="react-datepicker-wrapper">
              <label htmlFor="type">Tipo de cancha:</label>
              <select id="type" form="fields" defaultValue={this.currentField} onChange={this.selectUrlHandler}>
                <option value="big" >Cancha fútbol grande</option>
                <option value="small" >Cancha fútbol chica</option>
                <option value="other" >Cancha volley / basquet / fronton</option>
              </select>
              </div>

              <label htmlFor="date">Fecha</label>
              <DatePicker
                id="date"
                selected={this.state.Date}
                onChange={this.handleDateChange}
                dateFormat="DD/MM/YYYY"
                timeCaption="time"
                minDate={moment()}
                withPortal
              />

              <label htmlFor="checkin">Hora de entrada:</label>
              <DatePicker
                id="checkin"
                selected={this.state.StartTime}
                onChange={this.handleTimeCheckIn}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                dateFormat="HH:00"
                timeCaption="Hora"
                timeFormat="HH:00"
                className={this.state.form4}
                excludeTimes={this.state.timeExclude}
                withPortal
              />
              {(<div className="form-validation">{errors.Checkout}</div>)}

              <label htmlFor="checkout">Hora de salida:</label>
              <DatePicker
                id="checkout"
                selected={this.state.EndTime}
                onChange={this.handleTimeCheckOut}
                minTime={this.state.minCheckInTime}
                maxTime={this.state.maxCheckOutTime}
                injectTimes={[moment().hour(23).minutes(59)]}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                dateFormat={this.displayFormatCalculator()}
                timeCaption="Hora"
                timeFormat="HH:mm"
                className={this.state.form4}
                withPortal
              />
              {errors.hourCheckout && (<div className="form-validation">{errors.hourCheckout}</div>)}

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

            </form>
          </div>

          <div className="col-1-of-2 u-margin-top-medium">
            <div className="form__assurance u-text-center">
              <h2 className="heading2">Mi reserva</h2>
              <p className="form__assurance--p">Nombre: <b>{this.state.firstName}</b></p>
              <p className="form__assurance--p">Apellido: <b>{this.state.lastName}</b></p>
              <p className="form__assurance--p">Teléfono: <b>{this.state.phone}</b></p>
              <p className="form__assurance--p">Hora de entrada: <b>{this.state.StartTime.format('HH:00')}</b></p>
              <p className="form__assurance--p">Hora de salida: {end === 24 && <b>{this.state.EndTime.format('HH:mm')}</b>}{end !== 24 && <b>{this.state.EndTime.format('HH:00')}</b>}</p>
              <p className="form__assurance--p">Total horas: <b>{calculator}</b></p>
              <p className="form__assurance--p">Precio total : <b>{priceCounter} soles</b></p>
            </div>
          </div>
        </div>

        <div className="row u-text-center">
          <h2 className="heading2">Sección de pago</h2>
          <button onClick={this.formSubmit} type="submit" className="btn btn--gold u-margin-top-medium">Reservar !</button>
        </div>


        <div className={this.state.modal}></div>

        <div className={this.state.message}>
          <div className="form-success__message__success u-block-center">
            <i className="fas fa-check-circle form-success__message__success--icon"></i>
            <p className="form-success__message__success--text">Su reserva registrada con éxito,porfavor disfrute de su estancia!</p>
            <Link to="/sports" className="btn btn--red">Continuar</Link>
          </div>
        </div>

      </main>
    );
  }
}

export default SportsReservation;
