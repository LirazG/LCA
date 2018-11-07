import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Breadcrumbs extends Component {

  constructor(props){

    super(props);

    this.state={
      n0:'breadcrumbs__bullet',
      n1:'breadcrumbs__bullet',
      n2:'breadcrumbs__bullet',
      n3:'breadcrumbs__bullet',
      n4:'breadcrumbs__bullet',
      appearance:'breadcrumbs'
    }
  }


   componentWillReceiveProps(){
    if(this.props.points.start && this.props.points.end){

      let startPosition = this.props.points.start.offsetTop ;
      let endPosition = this.props.points.end.offsetTop + this.props.points.end.clientHeight - window.innerHeight;
      let viewPosition = window.pageYOffset;

      if((startPosition-100 <= viewPosition) && (endPosition >= viewPosition)){
        this.setState({appearance:'breadcrumbs breadcrumbs--visible'});
      } else {
        this.setState({appearance:'breadcrumbs'});
      }

    }


    if(this.props.stateobj.key == 4){
      this.setState({
        n0:'breadcrumbs__bullet breadcrumbs__bullet--activated',
        n1:'breadcrumbs__bullet',
        n2:'breadcrumbs__bullet',
        n3:'breadcrumbs__bullet',
        n4:'breadcrumbs__bullet',
      });
    } else if (this.props.stateobj.key == 3){
      this.setState({
        n0:'breadcrumbs__bullet',
        n1:'breadcrumbs__bullet breadcrumbs__bullet--activated',
        n2:'breadcrumbs__bullet',
        n3:'breadcrumbs__bullet',
        n4:'breadcrumbs__bullet',
      });
    } else if (this.props.stateobj.key == 2){
      this.setState({
        n0:'breadcrumbs__bullet',
        n1:'breadcrumbs__bullet',
        n2:'breadcrumbs__bullet breadcrumbs__bullet--activated',
        n3:'breadcrumbs__bullet',
        n4:'breadcrumbs__bullet',
      });
    } else if (this.props.stateobj.key == 1){
      this.setState({
        n0:'breadcrumbs__bullet',
        n1:'breadcrumbs__bullet',
        n2:'breadcrumbs__bullet',
        n3:'breadcrumbs__bullet breadcrumbs__bullet--activated',
        n4:'breadcrumbs__bullet',
      });
    }  else if (this.props.stateobj.key == 0){
      this.setState({
        n0:'breadcrumbs__bullet',
        n1:'breadcrumbs__bullet',
        n2:'breadcrumbs__bullet',
        n3:'breadcrumbs__bullet',
        n4:'breadcrumbs__bullet breadcrumbs__bullet--activated',
      });
    }
  }

  render() {
    return (
      <aside className={this.state.appearance}>
        <span className="breadcrumbs__text">{this.props.stateobj.text}</span>

        <span>
          <span className={this.state.n0}></span>
          <span className={this.state.n1}></span>
          <span className={this.state.n2}></span>
          <span className={this.state.n3}></span>
          <span className={this.state.n4}></span>
        </span>
      </aside>
    );
  }
}

export default Breadcrumbs;
