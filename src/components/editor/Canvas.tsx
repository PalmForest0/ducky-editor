import { Stage, Layer } from 'react-konva';

import Element from "./Element.tsx";
import type { ElementData } from "./Element.tsx";
import type { ShapeData } from '@/App.tsx';

interface CanvasProps {
	elements: ElementData[];
	setElements: (elements: ElementData[]) => void;
	updateElement: (id: string, newProps: Partial<ShapeData>) => void;
	selectedId: string | null;
	setSelectedId: (id: string | null) => void;
}

function Canvas({ elements, setElements, updateElement, selectedId, setSelectedId }: CanvasProps) {
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
						{elements.map(elem => (
							<Element
								key={elem.id}
								data={elem}
								isSelected={elem.id === selectedId}
								onSelect={() => setSelectedId(elem.id)}
								onModify={(newProps: Partial<ShapeData>) => updateElement(elem.id, newProps)}
							/>
						))}
					</Layer>
				</Stage>
			</div>
		</div>
	);
}

export default Canvas;