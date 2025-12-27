import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { GripVertical } from 'lucide-react';
import { cn } from '../../utils/cn';

const DraggableList = ({ items = [], onSortEnd = () => {}, renderItem, className, itemClassName }) => {
    // Clone to avoid mutating props directly via sortablejs
    const listCopy = items.map(it => ({ ...it }));

    return (
        <ReactSortable
            list={listCopy}
            setList={(newList) => {
                const ordered = newList.map(n => {
                    const nid = n && (n.id ?? n);
                    return items.find(it => String(it.id) === String(nid));
                }).filter(Boolean);
                if (ordered.length === items.length) onSortEnd(ordered);
            }}
            animation={200}
            className={className}
            handle=".drag-handle"
            ghostClass="sortable-ghost" // Add this to your css if you want ghost styles
        >
            {items.map(item => (
                <div 
                    key={item.id} 
                    data-id={item.id} 
                    className={cn(
                        "group relative flex items-start gap-2 mb-2",
                        itemClassName
                    )}
                >
                    <button 
                        className="drag-handle mt-3 cursor-grab active:cursor-grabbing text-slate-400 hover:text-brand-500 transition-colors"
                        title="Drag to reorder"
                    >
                        <GripVertical size={20} />
                    </button>
                    <div className="flex-1 min-w-0">
                        {renderItem(item)}
                    </div>
                </div>
            ))}
        </ReactSortable>
    );
};

export default DraggableList;