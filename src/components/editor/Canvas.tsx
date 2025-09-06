import { Stage, Layer } from 'react-konva';

import Element from "./Object.tsx";
import type { ObjectData } from "./Object.tsx";

interface CanvasProps {
	objects: ObjectData[];
	updateObject: (id: string, newProps: Partial<ObjectData>) => void;
	selectedId: string | null;
	setSelectedId: (id: string | null) => void;
}

function Canvas({ objects, updateObject, selectedId, setSelectedId }: CanvasProps) {
	return (
		<div className="flex flex-row gap-x-10">
			<div>
				<Stage width={960} height={720} className="bg-slate-900" onMouseDown={e => {
					// Deselect on an empty click
					if (e.target === e.target.getStage()) {
						setSelectedId(null);
					}
				}}>
					<Layer>
						{objects.map(obj => (
							<Element
								key={obj.id}
								data={obj}
								isSelected={obj.id === selectedId}
								onSelect={() => setSelectedId(obj.id)}
								onModify={(newProps: Partial<ObjectData>) => updateObject(obj.id, newProps)}
							/>
						))}
					</Layer>
				</Stage>
			</div>
		</div>
	);
}

export default Canvas;