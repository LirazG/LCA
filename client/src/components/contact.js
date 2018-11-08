import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

import WelcomePic from './welcome-pic.js';
import CustomForm from './custom-form.js';

class AboutUs extends Component {

  render() {
    return (
      <main className="contact-us">
        <WelcomePic classProp={'welcome__img welcome__img--contact'} />

        <section className="contact-us__first-section">
          <div className="row">
            <h2 className="heading2 heading2--white">Háblanos</h2>
            <div className="col-1-of-4">
              <div className="icon-container">
                <i className="fas fa-phone"></i>
              </div>
              <h5 className="heading5 heading5--noborder">Teléfono</h5>
              <p className="paragraph-sports paragraph-sports--activated"> 01- 2395721</p>
              <p className="paragraph-sports paragraph-sports--activated"> +51 946 443 445</p>
            </div>
            <div className="col-1-of-4">
              <div className="icon-container">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h5 className="heading5 heading5--noborder">Dirección</h5>
              <p className="paragraph-sports paragraph-sports--activated"> Av Mariscal Castilla 276 - Huacho </p>
            </div>
            <div className="col-1-of-4">
              <div className="icon-container">
                <i className="fas fa-at"></i>
              </div>
              <h5 className="heading5 heading5--noborder">Correo electrónico</h5>
              <p className="paragraph-sports paragraph-sports--activated">Casadealgodon@gmail.com</p>
            </div>
            <div className="col-1-of-4">
              <div className="icon-container">
                  <i className="fab fa-facebook-f"></i>
              </div>
              <h5 className="heading5 heading5--noborder">Facebook</h5>
              <p className="paragraph-sports paragraph-sports--activated">La Casa De Algodon</p>
            </div>
          </div>
        </section>

        <section className="contact-us__second-section u-margin-top-big">
          <div className="row">
            <div className="col-1-of-2 u-margin-top-big">
              <h2 className="heading2">¿Cómo podemos ayudar?</h2>
              <p className="paragraph-sports paragraph-sports--activated">
                ¿Tienes una pregunta? ¿necesites ayuda? ¡Contáctanos y te responderemos
                lo antes posible! Por favor llene el formulario o contáctenos de la
                manera que se indica arriba.
              </p>
            </div>
            <div className="col-1-of-2">
              <CustomForm />
            </div>
          </div>
        </section>

        <iframe height="500"
                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Av%20Mariscal%20Castilla%20276%20-%20Huacho+(La%20Casa%20De%20Algodon)&amp;ie=UTF8&amp;t=&amp;z=15&amp;iwloc=B&amp;output=embed"
                className="contact-us__map">
        </iframe>

      </main>
    );
  }
}

export default AboutUs;
