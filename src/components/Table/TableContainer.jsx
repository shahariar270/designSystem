import React from 'react';
import Table from '.';

const TableContainer = ({
    title,
    description,
    children,
    className = '',
    ...props
}) => {
    return (
        <div className={`table-container ${className}`}>
            {(title || description) && (
                <div className="table-container__header">
                    {title && <h3 className="table-container__title">{title}</h3>}
                    {description && <p className="table-container__description">{description}</p>}
                </div>
            )}
            {children || <Table {...props} />}
        </div>
    );
};

export default TableContainer;