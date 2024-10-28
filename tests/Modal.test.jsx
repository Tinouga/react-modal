import {render, screen, fireEvent } from '@testing-library/react';
import Modal from '../src/components/Modal';
import { describe, it, expect, beforeEach } from 'vitest';
import {userEvent} from "@testing-library/user-event";

describe('Modal component', () => {
    const onCloseMock = vi.fn();

    beforeEach(() => {
        onCloseMock.mockClear();
    });

    it('renders modal when isOpen is true', () => {
        render(
            <Modal isOpen={true} onClose={onCloseMock}>
                <div>Modal Content</div>
            </Modal>
        );

        expect(screen.getByText('Modal Content')).toBeInTheDocument();
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    })

    it('does not render modal when isOpen is false', () => {
        render(
            <Modal isOpen={false} onClose={onCloseMock}>
                <div>Modal Content</div>
            </Modal>
        );

        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        render(
            <Modal isOpen={true} onClose={onCloseMock}>
                <div>Modal Content</div>
            </Modal>
        );

        const closeButton = screen.getByRole('button', { name: /close modal/i });
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking on overlay', () => {
        render(
            <Modal isOpen={true} onClose={onCloseMock}>
                <div>Modal Content</div>
            </Modal>
        );

        const overlay = screen.getByRole('dialog').parentElement;
        fireEvent.click(overlay);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when clicking inside the modal content', () => {
        render(
            <Modal isOpen={true} onClose={onCloseMock}>
                <div>Modal Content</div>
            </Modal>
        );

        const modalContent = screen.getByText('Modal Content');
        fireEvent.click(modalContent);

        expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('calls onClose when pressing Escape key', () => {
        render(
            <Modal isOpen={true} onClose={onCloseMock}>
                <div>Modal Content</div>
            </Modal>
        );

        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('traps focus within the modal', async () => {
        const user = userEvent.setup();

        render(
            <Modal isOpen={true} onClose={onCloseMock}>
                <button>Button 1</button>
                <button>Button 2</button>
            </Modal>
        );

        const closeButton = screen.getByRole('button', { name: /close modal/i });
        const button1 = screen.getByRole('button', { name: /button 1/i });
        const button2 = screen.getByRole('button', { name: /button 2/i });

        // initial focus on the close button
        closeButton.focus();
        expect(closeButton).toHaveFocus();

        // tab -> should move to Button 1
        await user.tab();
        expect(button1).toHaveFocus();

        // tab -> should move to Button 2
        await user.tab();
        expect(button2).toHaveFocus();

        // tab -> should move back to the close button
        await user.tab();
        expect(closeButton).toHaveFocus();

        // shift + tab -> should move back to Button 2
        await user.tab({ shift: true });
        expect(button2).toHaveFocus();
    });

    it('does not close modal on overlay click if closeOnOverlayClick is false', () => {
        render(
            <Modal isOpen={true} onClose={onCloseMock} closeOnOverlayClick={false}>
                <div>Modal Content</div>
            </Modal>
        );

        const overlay = screen.getByRole('dialog').parentElement;
        fireEvent.click(overlay);

        expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('does not close modal on Escape key press if closeOnEsc is false', () => {
        render(
            <Modal isOpen={true} onClose={onCloseMock} closeOnEsc={false}>
                <div>Modal Content</div>
            </Modal>
        );

        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

        expect(onCloseMock).not.toHaveBeenCalled();
    });
})
