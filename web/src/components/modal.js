import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styled from '@emotion/styled';

// Use a ternary operator to make sure that the document object is defined
const modalRoot = typeof document !== `undefined` ? document.getElementById('portal') : null

const isDocument = typeof document !== `undefined`;
const isWindow = typeof window !== `undefined`;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = isDocument ? document.createElement('div') : null;

    this.state = {
      scrollY: window.scrollY
    }
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);

    // console.log("Scroll top", this.state.scrollY);
    if (isDocument) {
      document.body.classList.add('modal-open');
      document.body.style.top = `-${this.state.scrollY}px`;
    }
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);

    if (isDocument) {
      document.body.classList.remove('modal-open');
      document.body.style.top = "";
    }

    // console.log("Scrolling to...", parseInt(this.state.scrollY || '0') * 1);
    if (isWindow) {
      window.scrollTo(0, parseInt(this.state.scrollY || '0') * 1);
    }
  }

  render() {
    return ReactDOM.createPortal(
      <ModalContainer>
        <ModalOverlay onClick={this.props.closeModal} />
        <Content className={this.props.className}>
          { this.props.children }
          { this.props.closeModal &&
            <CloseModal onClick={this.props.closeModal}>
              <div>Close</div>
            </CloseModal>
          }
        </Content>
      </ModalContainer>,
      this.el
    );
  }
}

const ModalContainer = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalOverlay = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0,0,0,.9);
`;

const Content = styled('div')`
  width: 400px;
  min-height: 240px;
  max-height: 90vh;
  overflow-y: scroll;
  padding: 1rem;
  position: relative;
  background-color: #fff;
  z-index: 2;

  @media screen and (max-width: 600px) {
    width: 86vw;
    min-height: 30vh;
    max-height: 75vh;
  }

  &, a {
    color: #000;
  }
`;

const CloseModal = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  cursor: pointer;
`;

export default Modal;
