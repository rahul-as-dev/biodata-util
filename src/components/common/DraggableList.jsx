// src/components/common/DraggableList.jsx
import React from 'react';
import Sortable from 'react-sortablejs';
import { MenuOutlined } from '@ant-design/icons';

// A lightweight draggable list using react-sortablejs (wrapper around sortablejs).
// Expects props:
// - items: array of objects with a unique `id` property
// - onSortEnd: function(newItems) called with reordered items
// - renderItem: function(item) => ReactNode

const wrapperStyle = {
    backgroundColor: '#fff',
    padding: '8px 16px',
    border: '1px solid #f0f0f0',
    marginBottom: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
};

const DraggableList = ({ items = [], onSortEnd = () => {}, renderItem }) => {
    // Provide an `onChange` handler that receives the new order of item ids
    const handleChange = (order) => {
        // `order` is an array of ids (strings). Map back to items preserving order.
        if (!order) return;
        const newItems = order.map(id => items.find(it => String(it.id) === String(id))).filter(Boolean);
        // If the reordered array length differs, fall back to original items
        if (newItems.length === items.length) {
            onSortEnd(newItems);
        }
    };

    return (
        <Sortable
            tag="div"
            options={{ handle: '.drag-handle' }}
            onChange={handleChange}
        >
            {items.map(item => (
                <div key={item.id} data-id={item.id} style={wrapperStyle}>
                    <span className="drag-handle" style={{ marginRight: 10, cursor: 'grab' }}>
                        <MenuOutlined />
                    </span>
                    <div style={{ flex: 1 }}>{renderItem(item)}</div>
                </div>
            ))}
        </Sortable>
    );
};

export default DraggableList;