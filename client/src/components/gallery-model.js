import React, { Component } from 'react';

class GalleryModel extends Component {

  constructor(props) {
      super(props);

      this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
      document.body.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnMount() {
      document.body.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e) {
      if (e.keyCode === 27)
        this.props.closeModal();
      if (e.keyCode === 37 && this.props.hasPrev)
        this.props.findPrev();
      if (e.keyCode === 39 && this.props.hasNext)
        this.props.findNext();
    }

  render() {
    const { closeModal, hasNext, hasPrev, findNext, findPrev, src } = this.props;
    if (!src) {
      return null;
    }
    return (
      <div>
        <div className="modal-overlay" onClick={closeModal}></div>

        <div  className="modal">
          <div className="modal__body">
            <a className="modal__icons modal__icons__close" onClick={closeModal} onKeyDown={this.handleKeyDown}>&times;</a>
            {hasPrev && <a className="modal__icons modal__icons__prev" onClick={findPrev} onKeyDown={this.handleKeyDown}>&lsaquo;</a>}
            {hasNext && <a className="modal__icons modal__icons__next" onClick={findNext} onKeyDown={this.handleKeyDown}>&rsaquo;</a>}
            <img src={src} className="modal__image" alt="gallery item"/>
          </div>
        </div>
      </div>
    );
  }

}

export default GalleryModel;
