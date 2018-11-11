import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';

class FlipCard extends Component {

  constructor(props){
    super(props);

    this.fieldName = this.props.fieldName;
  }

  render() {
    return (
      <div className="flip-card">
        <div className="flip-card__side flip-card__side--front">

          <div className="flip-card__pic" style={{backgroundImage:`url(${this.props.pic})`}}></div>

          <div className="flip-card__details">
            <ul className="flip-card__details--ul">
              <li className="flip-card__details--li"><b>Descripción:</b>{this.props.list[0]}</li>
              <li className="flip-card__details--li"><b>Incluye:</b>{this.props.list[1]}</li>
              <li className="flip-card__details--li"><b>Tribuna:</b>{this.props.list[2]}</li>
              <li className="flip-card__details--li"><b>Estacionamiento interno:</b>{this.props.list[3]}</li>
              <li className="flip-card__details--li"><b>Servicios higiénicos:</b>{this.props.list[4]}</li>
            </ul>
          </div>

        </div>

        <div className="flip-card__side flip-card__side--back">
          <ul className="flip-card__details--ul flip-card__details--ul--custom-margin u-text-center">
            <li className="flip-card__details--li flip-card__details--li--2 "><b>Precios</b></li>
            <li className="flip-card__details--li flip-card__details--li--2"><b>Día:</b>{this.props.list[5]}</li>
            <li className="flip-card__details--li flip-card__details--li--2"><b>Noche:</b>{this.props.list[6]}</li>
          </ul>
          <Link to={'/sports/reservation/'+this.props.fieldName} className="btn btn--red u-margin-top-medium" params={this.props.fieldName}>Reservar!</Link>
        </div>

      </div>

    );
  }
}

export default FlipCard;
