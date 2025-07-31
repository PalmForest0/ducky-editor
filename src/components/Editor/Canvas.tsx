import { useState } from "react";
import { Stage, Layer } from 'react-konva';
import EditableRect from './EditableRect.tsx';
import Controls from "./Controls.tsx";
import type { ElementData } from "./Element.tsx";
import Element from "./Element.tsx";

interface ShapeData {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    fill: string;
}

function Canvas() {
    const [shapes, setShapes] = useState<ElementData[]>([ ]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    function createObject() {
        const newShape: ElementData = {
            id: `element-${shapes.length}`,
            type: "duck",
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            rotation: 0
        };

        setShapes([...shapes, newShape]);
    }

    function deleteObject(id: string | null) {
        if(!id) return;

        setShapes(shapes.filter(shape => shape.id != id));
    }

    function updateShape(id: string, newProps: Partial<ShapeData>) {
        setShapes(shapes.map(shape => (shape.id === id ? { ...shape, ...newProps } : shape)));
    }

    return (
        <>
            <Controls createObject={createObject} deleteSelectedObject={() => deleteObject(selectedId)}/>

            <div className="bg-slate-900">
                <Stage width={1280} height={720}  onMouseDown={e => {
                    // Deselect on an empty click
                    if (e.target === e.target.getStage()) {
                        setSelectedId(null);
                    }
                }}>
                    <Layer>
                        {shapes.map(shape => (
                            <Element
                                key={shape.id}
                                data={shape}
                                isSelected={shape.id === selectedId}
                                onSelect={() => setSelectedId(shape.id)}
                                onModify={(newProps: Partial<ShapeData>) => updateShape(shape.id, newProps)}
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
        </>
    );
}

export default Canvas;