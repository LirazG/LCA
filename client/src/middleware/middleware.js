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

export default middlewares;
