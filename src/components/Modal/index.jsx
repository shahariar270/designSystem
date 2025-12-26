import React from "react";
import './styles.scss';

export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="st-modal-overlay">
            <div className="st-modal">
                <div className="st-modal-header">
                    <h2>{title}</h2>
                    <button className="st-modal-close" onClick={onClose}>&times;</button>
                </div>

                <div className="st-modal-content">{children}</div>

                <div className="st-modal-footer">
                    <button className="st-btn st-btn-close" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};
