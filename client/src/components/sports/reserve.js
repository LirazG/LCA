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
      StartTime: moment(),
      EndTime: moment(),
      timeExclude: [],
      minCheckInTime:moment(),
      maxCheckOutTime:moment(),
      select:this.currentField
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



  render() {
    return (
      <main className="sports-reservation-page">
        <WelcomePic classProp={'welcome__img welcome__img--sports'}/>
        <div className="row">
          <h2 className="heading2">Reservar un campo</h2>
          <h4 className="heading5--noborder u-text-center">*Mínimo de una hora</h4>
        </div>

        <form id="fields">
          <select form="fields" defaultValue={this.currentField} onChange={this.selectUrlHandler}>
            <option value="big" >Cancha fútbol grande</option>
            <option value="small" >Cancha fútbol chica</option>
            <option value="other" >Cancha volley / basquet / fronton</option>
          </select>

          <DatePicker
            selected={this.state.Date}
            onChange={this.handleDateChange}
            dateFormat="DD/MM/YYYY"
            timeCaption="time"
            minDate={moment()}
          />

          <DatePicker
            selected={this.state.StartTime}
            onChange={this.handleTimeCheckIn}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={60}
            dateFormat="HH:00"
            timeCaption="Hora"
            timeFormat="HH:00"
            excludeTimes={this.state.timeExclude}
          />
          <DatePicker
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
          />

        </form>
      </main>
    );
  }
}

export default SportsReservation;
