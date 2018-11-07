import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';

import GalleryModel from './gallery-model.js';



class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = { currentIndex: null };
    this.closeModal = this.closeModal.bind(this);
    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    this.renderImageContent = this.renderImageContent.bind(this);
    this.images = this.props.images;
  }


  renderImageContent(src, index) {
    return (
      <LazyLoad offsetVertical={200} debounce={false} key={src}>
        <div onClick={(e) => this.openModal(e, index)}>
          <img src={src} key={src} alt='gallery-image' className="gallery__image"/>
        </div>
      </LazyLoad>
    ) ;
  }

  openModal(e, index) {
    this.setState ({ currentIndex: index });
  }

  closeModal(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState ({ currentIndex: null });
  }

  findPrev(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex -1
    }));
  }

  findNext(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  }


  render() {

    return (
      <section className="u-margin-top-huge">
        <h1 className="heading2 u-margin-bottom-small">Galería</h1>
        <div className="gallery">
          {this.images.map(this.renderImageContent)}
        </div>

        <GalleryModel
          closeModal={this.closeModal}
          findPrev={this.findPrev}
          findNext={this.findNext}
          hasPrev={this.state.currentIndex > 0}
          hasNext={this.state.currentIndex + 1 < this.images.length}
          src={this.images[this.state.currentIndex]}
        />
      </section>
    );
  }
}

export default Gallery;
