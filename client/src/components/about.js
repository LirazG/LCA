import React from 'react';
import WelcomePic from './welcome-pic.js';

const AboutUs = () => {
    return (
      <main className="about-us">
        <WelcomePic classProp={'welcome__img welcome__img--about'} />
        <div className="row">
          <h3 className="heading-cursive-big u-block-center u-margin-top-medium">"Eres diferente, mereces lo inolvidable."</h3>
          <p className="paragraph-sports paragraph-sports--activated u-margin-top-medium">
            Es un Hotel Boutique desarrollado en una casa antigua construida
            netamente de madera y quincha aproximadamente a principios del Siglo XX
            en la cuidad de Huacho, se ha mantenido escondida por años dentro de una
            de las desmotadoras más antiguas e importantes del norte chico.
          </p>

          <p className="paragraph-sports paragraph-sports--activated">
            Por muchos años durante el auge del algodón Tangüis sirvió de morada
            para los propietarios y administradores de la desmotadora hasta el año 1999,
            año en que luego de la caída de la industria algodonera en nuestro país,
            fue abandonada por más de 10 años esperando ser abierta y sentir
            una vez más los pasos de la gente en sus pisos de pino Oregón y cerámicas
            clásicas de aquella época importadas desde Europa.
          </p>

          <p className="paragraph-sports paragraph-sports--activated">
            Convertimos aquella casa en el único hotel boutique en la cuidad de Huacho,
            contando con diez habitaciones equipadas con baños en cada una de ellas para
            hacer más confortable la comodidad de los huéspedes, a sí mismo posee una amplia cocina,
            una sala de estar, un exclusivo bar, dos piscinas para adultos y niños,
            una terraza donde se aprecia una hermosa puesta del sol de la cuidad
            de Huacho y dos áticos en lo alto del techo de madera.
          </p>

          <p className="paragraph-sports paragraph-sports--activated">
            Es así como luego de sentir la magia descrita anteriormente decidimos en el año 2012
            poner en valor esta maravillosa casa y permitir sentir esa magia a las personas que
            aprecien y deseen volver a vivir o experimentar como era la vida a principios del Siglo XX,
            en un ambiente que se ha conservado intacto desde su construcción hasta nuestros días.
          </p>

        </div>
      </main>
    );
}

export default AboutUs;
