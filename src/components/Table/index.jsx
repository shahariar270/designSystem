import React, { useState } from 'react';

const Table = ({
    columns = [],
    data = [],
    onRowClick,
    sortable = false,
    striped = true,
    bordered = false,
    compact = false,
    responsive = true,
    loading = false,
    emptyMessage = 'No data available',
    className = '',
    ...props
}) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
        if (!sortable) return;

        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortConfig]);

    const getSortClass = (key) => {
        if (sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? 'table__header-cell--sortable--asc' : 'table__header-cell--sortable--desc';
    };

    const tableClasses = [
        'table',
        striped && 'table--striped',
        bordered && 'table--bordered',
        compact && 'table--compact',
        loading && 'table--loading',
        className
    ].filter(Boolean).join(' ');

    const tableContent = (
        <table className={tableClasses} {...props}>
            <thead className="table__header">
                <tr className="table__header-row">
                    {columns.map((column) => (
                        <th
                            key={column.key}
                            className={`table__header-cell ${sortable ? `table__header-cell--sortable ${getSortClass(column.key)}` : ''
                                }`}
                            onClick={() => handleSort(column.key)}
                            style={{ width: column.width, textAlign: column.align || 'left' }}
                        >
                            {column.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="table__body">
                {sortedData.length > 0 ? (
                    sortedData.map((row, index) => (
                        <tr
                            key={index}
                            className={`table__body-row ${onRowClick ? 'table__body-row--clickable' : ''}`}
                            onClick={() => onRowClick?.(row)}
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className="table__body-cell"
                                    style={{ textAlign: column.align || 'left' }}
                                >
                                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} className="table__empty">
                            <div className="table__empty-icon">📊</div>
                            <p className="table__empty-message">{emptyMessage}</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );

    if (responsive) {
        return <div className="table--responsive">{tableContent}</div>;
    }

    return tableContent;
};

export default Table;