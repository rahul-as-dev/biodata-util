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
    // Note: ReactSortable mutates the list we pass; we avoid mutating `items` by
    // passing a shallow copy (`listCopy`) and mapping reordered clones back to
    // the original `items` when calling `onSortEnd`.

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