// src/components/Common/DraggableList.jsx
import React from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move'; // Or arrayMove from 'react-sortable-hoc' if you prefer

// Drag Handle for react-sortable-hoc
const DragHandle = SortableHandle(() => <MenuOutlined style={{ marginRight: '10px', cursor: 'grab' }} />);

const SortableItem = SortableElement(({ value, renderItem }) => (
    <div style={{
        backgroundColor: '#fff',
        padding: '8px 16px',
        border: '1px solid #f0f0f0',
        marginBottom: '4px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
    }}>
        <DragHandle />
        {renderItem(value)}
    </div>
));

const SortableList = SortableContainer(({ items, renderItem }) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem key={`item-${value.id}`} index={index} value={value} renderItem={renderItem} />
            ))}
        </div>
    );
});

const DraggableList = ({ items, onSortEnd, renderItem }) => {
    const handleSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            const newItems = arrayMoveImmutable(items, oldIndex, newIndex);
            onSortEnd(newItems);
        }
    };

    return (
        <SortableList items={items} onSortEnd={handleSortEnd} renderItem={renderItem} useDragHandle />
    );
};

export default DraggableList;