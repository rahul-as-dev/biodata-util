// src/components/common/DraggableList.jsx
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
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

    // Pass a shallow-cloned list to ReactSortable so it can safely add internal
    // properties (ReactSortable mutates the provided list items). We map back
    // to the original `items` when reporting order changes via `onSortEnd`.
    const listCopy = items.map(it => ({ ...it }));

    return (
        <ReactSortable
            list={listCopy}
            setList={(newList) => {
                // newList contains shallow-cloned item objects with the same `id`.
                const ordered = newList.map(n => {
                    const nid = n && (n.id ?? n);
                    return items.find(it => String(it.id) === String(nid));
                }).filter(Boolean);
                if (ordered.length === items.length) onSortEnd(ordered);
            }}
            tag="div"
            options={{ handle: '.drag-handle' }}
        >
            {items.map(item => (
                <div key={item.id} data-id={item.id} style={wrapperStyle}>
                    <span className="drag-handle" style={{ marginRight: 10, cursor: 'grab' }}>
                        <MenuOutlined />
                    </span>
                    <div style={{ flex: 1 }}>{renderItem(item)}</div>
                </div>
            ))}
        </ReactSortable>
    );
};

export default DraggableList;