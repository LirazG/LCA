import React, { Component } from 'react';


class WelcomePic extends Component {

  constructor(props){
    super(props);

  }

  render() {
    return (
        <section className="welcome">
          <div className={this.props.classProp}></div>
        </section>
    );
  }
}

export default WelcomePic;
