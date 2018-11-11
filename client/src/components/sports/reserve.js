import React, { Component } from 'react';
import WelcomePic from '../welcome-pic.js';

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
      startDate: moment(),
      startDate2: moment(),
      select:this.currentField
    }

    this.handleDateChangeCheckin = this.handleDateChangeCheckin.bind(this);
    this.handleDateChangeCheckout = this.handleDateChangeCheckout.bind(this);
  }


  //reservation dates functionallty
    handleDateChangeCheckin(date) {
      this.setState({
        startDate: date
      });
    }

    handleDateChangeCheckout(date) {
      this.setState({
        startDate2: date
      });
    }

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
            selected={this.state.startDate}
            onChange={this.handleDateChangeCheckin}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="LLL"
            timeCaption="time"
          />

          <DatePicker
            selected={this.state.startDate2}
            onChange={this.handleDateChangeCheckout}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="LLL"
            timeCaption="time"
          />
        </form>
      </main>
    );
  }
}

export default SportsReservation;
