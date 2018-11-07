import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';

class ShapedCard extends Component {

  constructor(props){
    super(props);

    this.state = {
      name:"",
      email:"",
      phone:"",
      question:"",
      errors:{},
      form1:"",
      form2:"",
      form3:"",
      form4:"",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onChange(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }


  onSubmit(e){
    e.preventDefault();

    const newApply = {
      name:this.state.name,
      email:this.state.email,
      phone:this.state.phone,
      question:this.state.question
    }

    axios.post('/api/users/submit',newApply)
      .then(res => console.log(res.data))
      .catch(err =>{
        this.setState({errors:err.response.data});

        const {errors} = this.state;

        if(errors.phone){
          this.setState({form1:"form-invalid"});
        } else {
          this.setState({form1:"form-valid"});
        }

        if(errors.name){
          this.setState({form2:"form-invalid"});
        } else {
          this.setState({form2:"form-valid"});
        }

        if(errors.email){
          this.setState({form3:"form-invalid"});
        } else {
          this.setState({form3:"form-valid"});
        }

        if(errors.question){
          this.setState({form4:"form-invalid"});
        } else {
          this.setState({form4:"form-valid"});
        }
      });
  }

  render() {

    return (
      <LazyLoad offsetVertical={700} debounce={false}>
        <div className="row u-margin-bottom-big u-margin-top-big">
          <div className={'shaped-card' + this.props.className}>

            <div className={'shaped-card__text '}>
              <form onSubmit={this.onSubmit} className="form">

                <label htmlFor="name">Nombre:</label>
                <input className={this.state.form2} id="name" name="name" value={this.state.name} onChange={this.onChange} />

                <label htmlFor="email">Email:</label>
                <input className={this.state.form3} id="email" name="email" value={this.state.email} onChange={this.onChange} />

                <label htmlFor="phone">Phone:</label>
                <input className={this.state.form1} id="phone" name="phone" value={this.state.phone} onChange={this.onChange} />

                <label htmlFor="question">Tu pregunta:</label>
                <textarea className={this.state.form4} name="message" value={this.state.question} onChange={this.onChange} rows="10" cols="30" name="question" id="question" ></textarea>

                <button onClick={this.onClick} type="submit" className="btn btn--gold">Enviar</button>

              </form>
            </div>

            <div className="shaped-card__shape">

            </div>
          </div>
        </div>
      </LazyLoad>
    );
  }
}

export default ShapedCard;
