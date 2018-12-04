import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as Scroll from 'react-scroll';

import ScrollToTop from './components/scroll-top-router.js';

import AboutUs from './components/about.js';
import ContactUs from './components/contact.js';
import Home from './components/home-page/home.js';
import Hotel from './components/hotel/hotel.js';
import RoomsInfo from './components/hotel/room-info.js';
import HotelReservation from './components/hotel/reserve.js';
import Sports from './components/sports/sports.js';
import Parking from './components/parking/parking.js';
import Bar from './components/bar/bar.js';
import Events from './components/events.js';
import Navbar from './components/navbar.js';
import Footer from './components/footer.js';
import SportsReservation from './components/sports/reserve.js';

class App extends Component {
  constructor(){
    super();

    this.counter = 0;
    this.routes = [];
    for(let i in RoomsInfo){
      this.routes.push(RoomsInfo[i].details.name);
    }
  }


  componentDidMount(){
    if(document.getElementsByClassName('loader')[0]){
      document.getElementsByClassName('loader')[0].style.display = 'none';
    }
    window.addEventListener('wheel',(e)=>{ this.handleScroll(e) });
  }

  componentWillUnmount(){
    window.removeEventListener('wheel',(e)=>{ this.handleScroll(e) });
  }


  handleScroll(e){
    setTimeout(()=>{this.counter = 0},1000);
    e.stopPropagation();
    e.preventDefault();

    if(e.wheelDelta < 0){
      this.counter = this.counter+200;
      Scroll.animateScroll.scrollMore(this.counter,{smooth:'easeOutQuad'});
    } else {
      this.counter = this.counter-200;
      Scroll.animateScroll.scrollMore(this.counter,{smooth:'easeOutQuad'});
    }
  }



  render() {

    return (
      <Router>
        <ScrollToTop>
          <div>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/about' component={AboutUs}/>
              <Route exact path={'/hotel/reservation/:value'} component={HotelReservation} />

              <Route path='/hotel' component={Hotel}/>

              <Route exact path='/sports/reservation/big' component={SportsReservation}/>
              <Route exact path='/sports/reservation/small' component={SportsReservation}/>
              <Route exact path='/sports/reservation/other' component={SportsReservation}/>
              <Route path="/sports/reservation/*" component={Sports} />

              <Route path='/sports' component={Sports}/>
              <Route path='/bar' component={Bar}/>
              <Route path='/parking' component={Parking}/>
              <Route path='/events' component={Events}/>
              <Route path='/contact' component={ContactUs}/>
            </Switch>
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
