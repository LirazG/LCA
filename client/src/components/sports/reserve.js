import React, { Component } from 'react';
import WelcomePic from '../welcome-pic.js';
import axios from 'axios';

// Date picker dependencies
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";


class SportsReservation extends Component {

  constructor(props) {
    super(props);

    this.currentField = window.location.pathname.slice(20);

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
      form4:''
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
          console.log(this.currentDatesForField)
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
        var hourArray = [...this.state.timeExclude];
        for(let i in this.currentDatesForField){
          //chack for taken hours in the day
          // console.log(this.currentDatesForField[i].day,Number(currentDate.day))
          if(this.currentDatesForField[i].year === Number(currentDate.year) && this.currentDatesForField[i].month === Number(currentDate.month) && this.currentDatesForField[i].day === Number(currentDate.day)){
            // create takes hours array
            hourArray = [...hourArray,...this.currentDatesForField[i].hours];
            console.log(hourArray)
          }
        }
        //convert array for moment object to fit to Datepicker excludeTimes
        const momentArray = hourArray.map( item =>{
          return moment().hours(item).minutes(0).seconds(0);
        });
        this.setState({
          timeExclude: momentArray
        });
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
          this.setState({maxCheckOutTime:moment().hour(24),EndTime:moment().hour(24)})
          return;
        }
        for(i ; i < 23 ; i++){
          if(hourArray.includes(i)){
            this.setState({maxCheckOutTime:moment().hour(i)});
            return;
          }
          if(i === 22){
            this.setState({maxCheckOutTime:moment().hour(23)});
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
      console.log(e.target.value)
       window.location.pathname = `/sports/reservation/${e.target.value}`
    }

    //on change input vaule handlers

    onChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      });
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
        hourCheckout : String(this.state.EndTime.format('HH'))
      }


      if(newFieldReservation.hourCheckout === '00'){
        newFieldReservation.hourCheckout = '24';
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
              select:this.currentField
            },()=>{
              window.location.pathname = window.location.pathname.slice(0,7)
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

    return (
      <main className="sports-reservation-page">
        <WelcomePic classProp={'welcome__img welcome__img--sports'}/>
        <div className="row">
          <h2 className="heading2">Reservar un campo</h2>
          <h4 className="heading5--noborder u-text-center">*Mínimo de una hora</h4>
          <hr className="u-margin-top-big"/>
        </div>

        <div className="row u-text-center">
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

            <label htmlFor="checkout">Hora de entrada:</label>
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
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              dateFormat="HH:00"
              timeCaption="Hora"
              timeFormat="HH:00"
              className={this.state.form4}
              withPortal
            />
            {(<div className="form-validation">{errors.hourCheckout}</div>)}

            <div className="react-datepicker-wrapper">
              <label htmlFor="name">Nombre:</label>
              <input className={this.state.form2} type="text" id="name" name="firstName" value={this.state.firstName} onChange={this.onChange}/>
              {(<div className="form-validation">{errors.firstName}</div>)}
            </div>

            <div className="react-datepicker-wrapper">
              <label htmlFor="last-name">Apellido:</label>
              <input className={this.state.form3} type="text" id="last-name" name="lastName" value={this.state.lastName} onChange={this.onChange}/>
              {(<div className="form-validation">{errors.lastName}</div>)}
            </div>

            <div className="react-datepicker-wrapper">
              <label htmlFor="phone">Teléfono:</label>
              <input className={this.state.form1} type="text" id="phone" name="phone" value={this.state.phone} onChange={this.onChange}/>
              {(<div className="form-validation">{errors.phone}</div>)}
            </div>

            <button onClick={this.formSubmit} type="submit" className="btn btn--gold u-margin-top-medium">Reservar !</button>

          </form>
        </div>

      </main>
    );
  }
}

export default SportsReservation;
