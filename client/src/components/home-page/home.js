import React, { Component } from 'react';

//components for the home page
import WelcomePic from '../welcome-pic.js';
import FirstSection from './first-section.js';
import MainHomeComponent from './main-home-component.js';
import HotelDescription from './hotel-description.js';
import Seperator from '../seperator.js';
import SportsDescription from './sports-description.js';
import BarDescription from './bar-description.js';
import LastSection from './last-section.js';
import Breadcrumbs from './breadcrumbs.js';

//picturs
import ImgHotelSection from '../../img/hotel-page-img/hotel4.jpg';
import ImgSportsSection from '../../img/welcome-pictures/football-big-welcome.jpg';
import ImgBarSection from '../../img/bar-home-section.jpg';
import Soccer from '../../img/small-soccer.png';
import BascketBall from '../../img/small-bascketball.png';
import VolleyBall from '../../img/small-volleyball.png';
import Seperator1 from '../../img/seperator1.jpg';
import Seperator2 from '../../img/seperator2.jpg';
import Seperator3 from '../../img/seperator3.jpg';

//middlewares
import middlewares from '../../middleware/middleware';

class Home extends Component {
  constructor(props){
    super(props);

    this.volley = React.createRef();
    this.soccer = React.createRef();

    this.history = React.createRef();
    this.hotel = React.createRef();
    this.sports = React.createRef();
    this.bar = React.createRef();
    this.more = React.createRef();

    this.state={
      key:0,
      text:['Mas Servicios','Resto bar','Deportes','Hotel','Historia'],
      topass:'Welcome'
    };
  }

  componentDidMount(){
    this.refArr=[this.more.current,this.bar.current,this.sports.current,this.hotel.current,this.history.current];
    let passiveSupported = middlewares.checkPassiveOptionBrowser();
    window.addEventListener('scroll',this.callAll, passiveSupported ? { passive: true } : false);
  }

  componentWillUnmount(){
    let passiveSupported = false;
    window.removeEventListener('scroll',this.callAll, passiveSupported ? { passive: true } : false);
  }

// change breadcrumbs state according to sections position by passing value to props
//of breadcrumbs component
  breadValue(refArr){
    for(var key in refArr){
       let elementPosition = refArr[key].offsetTop ;
       let viewPosition = window.pageYOffset + window.innerHeight ;

       if(elementPosition <= viewPosition){
         this.setState({
           key:key,
           topass:this.state.text[key]
         });
         return;
       }
    }
  }


  handleScroll(element,stateActive,stateRegular,offsetTopAddition = 0){
    let elementPosition = element.offsetTop+element.offsetHeight;
    let viewPosition = window.pageYOffset+window.innerHeight + offsetTopAddition;
    if(elementPosition <= viewPosition){
      this.setState(stateActive);
    } else {
      this.setState(stateRegular);
    }
  }

  verticalScrollTranslate(element){
    if(element){
      let elementPosition = element.offsetTop+element.offsetHeight -100;
      let viewPosition = window.pageYOffset+window.innerHeight;
      if(elementPosition <= viewPosition && window.innerWidth > 450){
        element.style.transform = `translate3d(70vw,${-(elementPosition-viewPosition)/4}px,0)`;
      } else if(elementPosition <= viewPosition && window.innerWidth < 450){
        element.style.transform = `translate3d(80vw,${-(elementPosition-viewPosition)/5}px,0)`;
      }
    }
  }

  horizontalScrollTranslate(element){
    if(element){
      let elementPosition = element.offsetTop + element.offsetHeight;
      let viewPosition = window.pageYOffset + window.innerHeight;
      if(elementPosition-200 <= viewPosition && window.innerWidth > 450){
        element.style.transform = `translate3d(${(elementPosition-viewPosition)}px,-15vh,0) rotate(${(elementPosition-viewPosition)}deg)`;
      } else if(elementPosition-200 <= viewPosition && window.innerWidth < 450){
        element.style.transform = `translate3d(${(elementPosition-viewPosition)}px,-10vh,0) rotate(${(elementPosition-viewPosition)}deg)`;
      }
    }
  }


//functions to call the handlers created so can be removed in  removeeventlistener
  horizonCaller = ()=>{
    this.horizontalScrollTranslate(this.soccer.current)
  }

  verticalCaller = ()=>{
    this.verticalScrollTranslate(this.volley.current);
  }

  breadCaller = ()=>{
    this.breadValue(this.refArr);
  }

  // gathers the scroll functions for the page to one event listener
  callAll = () => {
    this.horizonCaller();
    this.verticalCaller();
    this.breadCaller();
  }


  render() {
    return (
      <main>
        <Breadcrumbs stateobj={{text:this.state.topass,key:this.state.key}} points={{start:this.history.current,end:this.more.current}}/>
        <WelcomePic classProp={'welcome__img welcome__img--home'} />

        <section className="history" ref={this.history}>
          <FirstSection FadeIn={this.handleScroll} />
        </section>

        <Seperator bgimage={Seperator1} bgposition={'50% 30%'}/>

        <section className="hotel" ref={this.hotel}>
          <MainHomeComponent FadeIn={this.handleScroll} img={ImgHotelSection} PreTitle={'Servicios.I'} Title={'Hotel'} SubTitle={'Descubre nuestra hotel boutique'}/>
          <HotelDescription FadeIn={this.handleScroll}/>
        </section>

        <Seperator bgimage={Seperator2} bgposition={'40% 0%'}/>

        <section className="sports" ref={this.sports}>
          <img className="sports__bascket" src={BascketBall} alt="bascket" />
          <img className="sports__volley" src={VolleyBall} alt="volleyball" ref={this.volley} style={this.style}/>
          <MainHomeComponent FadeIn={this.handleScroll} img={ImgSportsSection} PreTitle={'Servicios.II'} Title={'Deportes'} SubTitle={'Ven y juega en nuestros canchas!'}/>
          <img className="sports__soccer" src={Soccer} alt="soccer" ref={this.soccer} />
          <SportsDescription FadeIn={this.handleScroll} />
        </section>

        <Seperator bgimage={Seperator3} bgposition={'60% 15%'}/>

        <section className="bar" ref={this.bar}>
          <MainHomeComponent FadeIn={this.handleScroll} img={ImgBarSection} PreTitle={'Servicios.III'} Title={'Resto bar'} SubTitle={'bebe una cerveza fría en nuestro bar!'}/>
          <BarDescription FadeIn={this.handleScroll}/>
        </section>

        <section className="last-section u-margin-top-huge" ref={this.more} >
          <MainHomeComponent FadeIn={this.handleScroll}  PreTitle={'Servicios.IIII'} Title={'Mas Servicios'} SubTitle={'Estacionamiento & sala de eventos'}/>
          <LastSection FadeIn={this.handleScroll}/>
        </section>
      </main>
    );
  }
}

export default Home;
