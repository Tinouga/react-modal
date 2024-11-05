# React Modal

## Description

A simple, lightweight, accessible and customizable modal component for React applications.

## Features

- **Accessible**: Complies with ARIA standards and traps focus within the modal.
- **Customizable**: Easily style the modal and overlay via class names or props.
- **Flexible**: Supports closing on overlay click and Escape key.
- **Lightweight**: Minimal dependencies and optimized for performance.
- **Spinner Support**: Display a spinner during loading states.

## Installation

Install the package via npm:

```bash
npm install @angeldevvvv/react-modal
```

## Peer Dependencies
Ensure you have the following peer dependencies installed in your project:
- react (v17 or higher)
- react-dom (v17 or higher)
- prop-types

## Configuration
```js
<Modal
  isOpen={isOpen}                           // Controls the visibility of the modal.
  onClose={onClose}                         // Function called to close the modal.   
  showCloseButton={true}                    // Determines if the close button is displayed.
  closeOnEsc={true}                         // Allows closing the modal with the Escape key.
  closeOnOverlayClick={true}                // Allows closing the modal by clicking on the overlay.
  closeIcon={<CloseIcon />}                 // Custom icon for the close button.
  overlayClass=''                           // Custom class name for the overlay.
  modalClass=''                             // Custom class name for the modal content.
  spinner={<Spinner />}                     // Custom spinner component to show during loading states.
  showSpinner={false}                       // Determines if the spinner is displayed.
  children={null}                           // Content to be displayed inside the modal.
  fadeDuration={300}                        // Duration of the fade animation in milliseconds.
  ariaLabelledby='modal-title'              // ID of the element that labels the modal.
  ariaDescribedby='modal-description'       // ID of the element that describes the modal.
```

You can style it using the following CSS variables:

```css
:root {
    --modal-overlay-bg: rgba(0, 0, 0, 0.75);
    --modal-content-bg: #fff;
    --modal-padding: 15px 30px;
    --modal-border-radius: 8px;
    --modal-box-shadow: 0 0 10px #000;
    --modal-close-btn-size: 30px;
    --modal-close-btn-color: #000;
}
```

## Usage

Import the Modal component and use it in your React application:

```js
import React, { useState } from 'react';
import { Modal } from 'react-modal';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}
      >
        <h2 id="modal-title">Welcome</h2>
        <p id="modal-description">This is a custom modal.</p>
      </Modal>
    </div>
  );
};

export default App;
```

## Accessibility

Ensure that the ariaLabelledby and ariaDescribedby props are correctly set to improve accessibility.

```jsx
<Modal 
  isOpen={isModalOpen} 
  onClose={() => setIsOpen(false)}
  ariaLabelledby="modal-title"
  ariaDescribedby="modal-description"
>
  <h2 id="modal-title">Accessible Modal</h2>
  <p id="modal-description">This modal is fully accessible.</p>
</Modal>
```
