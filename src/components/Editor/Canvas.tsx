import { useState } from "react";
import { Stage, Layer } from 'react-konva';
import EditableRect from './EditableRect.tsx';

interface ShapeData {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    fill: string;
}

interface EditorCanvasProps {
    addObject: () => void;
}

function Canvas() {
    const [shapes, setShapes] = useState<ShapeData[]>([ ]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    function createObject() {
        const newShape: ShapeData = {
            id: `rect-${shapes.length}`,
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            rotation: 0,
            fill: 'skyblue',
        };

        setShapes([...shapes, newShape]);
    }

    function updateShape(id: string, newProps: Partial<ShapeData>) {
        setShapes(shapes.map(shape => (shape.id === id ? { ...shape, ...newProps } : shape)));
    }

    return (
        <div className="bg-slate-900">
            <button onClick={createObject}>Add Object</button>
            <Stage width={1280} height={720}  onMouseDown={e => {
                // Deselect on an empty click
                if (e.target === e.target.getStage()) {
                    setSelectedId(null);
                }
            }}>
                <Layer>
                    {shapes.map(shape => (
                        <EditableRect
                            key={shape.id}
                            shapeProps={shape}
                            isSelected={shape.id === selectedId}
                            onSelect={() => setSelectedId(shape.id)}
                            onChange={(newProps: Partial<ShapeData>) => updateShape(shape.id, newProps)}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
}

export default Canvas;