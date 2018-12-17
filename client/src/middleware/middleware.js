 var middlewares = {};

 middlewares.checkPassiveOptionBrowser = function (passiveSupported = false){
  try {
    var options = {
      get passive() { // This function will be called when the browser
                      //     attempts to access the passive property.
        passiveSupported = true;
      }
    };

    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch(err) {
    passiveSupported = false;
  }
  return passiveSupported;
}

middlewares.handleScroll = function (element, stateActive, stateRegular, offsetTopAddition = 0, activateWillChange = false) {

  let elementPosition = element.offsetTop + element.offsetHeight;
  let viewPosition = window.pageYOffset + window.innerHeight + offsetTopAddition;
  if(activateWillChange){

    if( (elementPosition - element.offsetHeight - 200 <= viewPosition + element.offsetHeight) && (elementPosition >= viewPosition)){
      this.setState({willChange:' will-change'});
    } else {
      this.setState({willChange:' no-will-change'});
    }
  }
  if(elementPosition <= viewPosition){
    this.setState(stateActive);
  } else {
    this.setState(stateRegular);
  }
}

export default middlewares;
