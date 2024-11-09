import React, {useEffect, useRef, useState} from 'react';
import Sortable from "sortablejs";
import AppLayout from "@/layouts/AppLayout";


const colors = ['red', 'green', 'blue', 'pink', 'yellow', 'black', 'brown', 'purple', 'violet']


const DraggableTasks = () => {
    const containerRef = useRef(null)
    const [items, setItems] = useState(colors)

    useEffect(() => {
        let sortable = null
        console.log(items.map((item, index) => {
            return {index, item}
        }))
        console.log('\n')
        if (containerRef.current) {
            sortable = Sortable.create(containerRef.current, {
                animation: 150,
                ghostClass: 'ghost',
                chosenClass: 'chosen',
                dragClass: 'drag',
                handle: '.handle',
                forceFallback: true,
                fallbackClass: 'fallback',
                swapThreshold: 0.65,
                onEnd: (evt) => {
                    if (evt.oldIndex === evt.newIndex) return
                    const newItems = [...items]
                    const [reorderedItem] = newItems.splice(evt.oldIndex, 1)
                    newItems.splice(evt.newIndex, 0, reorderedItem)
                    setItems(newItems)
                }
            })
        }

        return () => {
            if (sortable) sortable.destroy()
        }
    }, [items])
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 select-none">
                <h1 className="text-2xl font-bold mb-4">Advanced Draggable Grid</h1>
                <div ref={containerRef}
                     className="grid grid-cols-3 gap-4 w-full max-w-2xl bg-white rounded-lg shadow-lg p-4">
                    {items.map((color, index) => (
                        <div key={color}
                             className="grid-item bg-white rounded-md shadow-md overflow-hidden">
                            <div className={`handle h-8 cursor-move flex items-center justify-center text-white font-bold
                                 ${color === 'yellow' ? 'text-gray-800' : ''}`}
                                 style={{backgroundColor: color}}>
                                {index + 1}
                            </div>
                            <div className="p-4">
                                <p className="text-center capitalize">{color}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-4 text-gray-600">Drag the colored bars to reorder the grid items.</p>
            </div>
        </div>
    );
};

DraggableTasks.layout = page => <AppLayout children={page}/>

export default DraggableTasks;
