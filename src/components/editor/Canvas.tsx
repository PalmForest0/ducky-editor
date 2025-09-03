import { useState } from "react";
import { Stage, Layer } from 'react-konva';
import Controls from "./Controls.tsx";
import Element from "./Element.tsx";
import Hierarchy from "@/components/editor/Hierarchy.tsx";

import type { ElementData } from "./Element.tsx";
import elements from "../../data/elements.json";

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
	const [idCounter, setIdCounter] = useState<number>(0);

	function createElement(type: string) {
		const data = elements.find(e => e.type === type);

		if(!data) return;

		const newShape: ElementData = {
			id: `element-${idCounter}`,
			type: data.type,
			name: data.name,
			x: 50,
			y: 50,
			width: 100,
			height: 100,
			rotation: 0
		};

		setShapes([...shapes, newShape]);
		setSelectedId(newShape.id)
		setIdCounter(idCounter + 1);
	}

	function deleteElement(id: string | null) {
		if(!id) return;

		setShapes(shapes.filter(shape => shape.id != id));
		setSelectedId(null);
	}

	function updateShape(id: string, newProps: Partial<ShapeData>) {
		setShapes(shapes.map(shape => (shape.id === id ? { ...shape, ...newProps } : shape)));
	}

	return (
		<div className="flex flex-row gap-x-10">
			<Hierarchy elements={shapes} selectedId={selectedId} onSelect={setSelectedId}/>
			<div>
				<Controls createObject={createElement} deleteSelectedObject={() => deleteElement(selectedId)}/>
				<Stage width={1280} height={720} className="bg-slate-900" onMouseDown={e => {
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
		</div>
	);
}

export default Canvas;