import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import styles from './Modal.module.css';
import Spinner from "./Spinner.jsx";
import CloseIcon from "./CloseIcon.jsx";

const Modal = ({
    isOpen,
    onClose,
    showCloseButton = true,
    closeOnEsc = true,
    closeOnOverlayClick = true,
    closeIcon = <CloseIcon />,
    overlayClass ='',
    modalClass = '',
    spinner = <Spinner />,
    showSpinner = false,
    children,
    fadeDuration = 300,
    ariaLabelledby = 'modal-title',
    ariaDescribedby = 'modal-description',
}) => {
    const modalRef = useRef(null);

    const getFocusableElements = (element) => {
        return element.querySelectorAll(
            'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if(e.key === 'Escape' && closeOnEsc) {
                onClose();
            }
            if(e.key === 'Tab') {
                // we trap the focus inside the modal, to prevent the user from tabbing out of it
                const focusableElements = getFocusableElements(modalRef.current);

                // if there are no focusable elements, do nothing
                if(focusableElements.length === 0) {
                    e.preventDefault();
                    return;
                }

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if(!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }

                if(e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            }
        };

        if(isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // prevent scrolling

            // focus the modal when it opens, and waiting for the animation to finish
            setTimeout(() => {
                if(modalRef.current) {
                    const focusableElements = getFocusableElements(modalRef.current);
                    if(focusableElements.length) {
                        focusableElements[0].focus();
                    } else {
                        modalRef.current.focus();
                    }
                }
            }, fadeDuration);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, closeOnEsc, fadeDuration]);

    const handleOverlayClick = (e) => {
        if(e.target === e.currentTarget && closeOnOverlayClick) {
            onClose();
        }
    }

    if(!isOpen) return null;

    return createPortal(
        <div
            className={`${styles.modalOverlay} ${overlayClass} ${isOpen ? styles.visible : ""}`}
            style={{transitionDuration: `${fadeDuration}ms`}}
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className={`${styles.modalContent} ${modalClass} ${isOpen ? styles.visible : ""}`}
                style={{transitionDuration: `${fadeDuration}ms`}}
                role="dialog"
                aria-modal="true"
                aria-labelledby={ariaLabelledby || undefined}
                aria-describedby={ariaDescribedby || undefined}
                tabIndex="-1"
            >
                {showCloseButton && (
                    <button
                        className={styles.modalCloseBtn}
                        onClick={onClose}
                        aria-label="Close Modal"
                    >
                        {closeIcon}
                        <span className={styles.srOnly}>Close Modal</span>
                    </button>
                )}
                {showSpinner ? spinner : children}
            </div>
        </div>,
        document.body
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    showCloseButton: PropTypes.bool,
    closeOnEsc: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    children: PropTypes.node.isRequired,
    fadeDuration: PropTypes.number,
    closeIcon: PropTypes.node,
    modalClass: PropTypes.string,
    overlayClass: PropTypes.string,
    showSpinner: PropTypes.bool,
    spinner: PropTypes.node,
    ariaLabelledby: PropTypes.string,
    ariaDescribedby: PropTypes.string,
};

export default Modal;
