import { Stage, Layer } from 'react-konva';

import Object from "./Object.tsx";
import type { ObjectData } from "./Object.tsx";

interface CanvasProps {
	objects: ObjectData[];
	updateObject: (id: string, newProps: Partial<ObjectData>) => void;
	selectedId: string | null;
	setSelectedId: (id: string | null) => void;
}

export interface Rectangle {
	x: number;
	y: number;
	width: number;
	height: number;
}

const bounds : Rectangle = { x: 0, y: 0, width: 90, height: 120 };
const displayBounds: Rectangle = { x: 0, y: 0, width: bounds.width * 5, height: bounds.height * 5};

function Canvas({ objects, updateObject, selectedId, setSelectedId }: CanvasProps) {
	return (
		<div className="flex flex-row gap-x-10 justify-center align-middle">
			<Stage width={displayBounds.width} height={displayBounds.height} className="bg-slate-900" onMouseDown={e => {
					// Deselect on an empty click
					if (e.target === e.target.getStage()) {
						setSelectedId(null);
					}
				}}>
				<Layer>
					{objects.map(obj => (
						<Object
							key={obj.id}
							data={obj}
							isSelected={obj.id === selectedId}
							displayBounds={displayBounds}
							onSelect={() => setSelectedId(obj.id)}
							onModify={(newProps: Partial<ObjectData>) => updateObject(obj.id, newProps)}
						/>
					))}
				</Layer>
			</Stage>
		</div>
	);
}

export default Canvas;