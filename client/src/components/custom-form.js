import React, { Component } from 'react';
import axios from 'axios';

class CustomForm extends Component {

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
      modal:"form-success",
      message:"form-success__message"
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.modalCancel = this.modalCancel.bind(this);
  }

  modalCancel(){
    this.setState({
      modal:"form-success",
      message:"form-success__message"
    });
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
      .then(res =>{
        this.setState({
          name:"",
          email:"",
          phone:"",
          question:"",
          errors:{},
          form1:"",
          form2:"",
          form3:"",
          form4:"",
          modal:"form-success form-success--display",
          message:"form-success__message form-success__message--display"
        });
      })
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

    const {errors} = this.state;

    return (
      <form onSubmit={this.onSubmit} className="form">

        <label htmlFor="name">Nombre:</label>
        <input className={this.state.form2} id="name" name="name" value={this.state.name} onChange={this.onChange} />
        {(<div className="form-validation">{errors.name}</div>)}

        <label htmlFor="email">Email:</label>
        <input className={this.state.form3} id="email" name="email" value={this.state.email} onChange={this.onChange} />
        {(<div className="form-validation">{errors.email}</div>)}

        <label htmlFor="phone">Phone:</label>
        <input className={this.state.form1} id="phone" name="phone" value={this.state.phone} onChange={this.onChange} />
        {(<div className="form-validation">{errors.phone}</div>)}

        <label htmlFor="question">Tu pregunta:</label>
        <textarea className={this.state.form4} value={this.state.question} onChange={this.onChange} rows="10" cols="30" name="question" id="question" ></textarea>
        {(<div className="form-validation">{errors.question}</div>)}

        <button onClick={this.onClick} type="submit" className="btn btn--gold">Enviar</button>

        <div className={this.state.modal} onClick={this.modalCancel}></div>

        <div className={this.state.message}>
          <div className="form-success__message__success">
            <i className="fas fa-check-circle form-success__message__success--icon"></i>
            <p className="form-success__message__success--text">Gracias por contactarnos, nos pondremos en contacto con usted lo antes posible.</p>
          </div>
          <div className="form-success__message__cancel" onClick={this.modalCancel}>
            <i className="fas fa-times form-success__message__cancel--icon"></i>
          </div>
        </div>

      </form>
    );
  }
}

export default CustomForm;
