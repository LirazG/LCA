import React from 'react';
import Logo from '../../img/logo-bar.png';

const Bar = () => {

    return (
      <section className="row u-margin-top-medium bar__first-section u-margin-bottom-huge">
        <h3 className="heading3">El V.A.R resto bar</h3>
          <p className={"paragraph paragraph__activated u-block-center u-text-center"} >
            Nos encontramos dentro de La casa de Algodón, inspirado en un bar futbolístico,
            el nombre que nos identifica aquí es el V.A.R y nuestro lema a modo de sátira
            es "Porque aquí no se ve ninguna falta".
          </p>
          <p className={"paragraph paragraph__activated u-block-center u-text-center"} >
            Pero todo se debe a una razón y esta idea nace ya que a unos pocos metros
            tenemos una vista impresionante de nuestras canchas de grass sintético.
            El V.A.R es un espacio para juntarse con los amigos en un ambiente agradable,
            degustar nuestros sabrosos piqueos, comerse una rica hamburguesa o una deliciosa pizza
            recién salida de nuestro horno artesanal y tomar unas cervezas bien heladas.
          </p>
          <p className={"paragraph paragraph__activated u-block-center u-text-center"} >
            Disponemos de una amplia vista para poder disfrutar de los partidos,
            tv´s dónde puedes disfrutar el deporte nacional e internacional,
            donde sentirás la verdadera pasión y amor al fútbol.
          </p>

          <img src={Logo} alt="logo" className="bar__first-section__logo"/>
      </section>
    );

}

export default Bar;
