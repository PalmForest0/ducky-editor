import type { ElementData } from "@/components/editor/Element.tsx";
import { Flex, Input, InputNumber, Space } from "antd";
import { useEffect, useState } from "react";

interface InspectorProps {
	elements: ElementData[],
	setElements: (elements: ElementData[]) => void,
	selectedId: string | null
}

function Inspector({ elements, setElements, selectedId }: InspectorProps) {
	const [element, setElement] = useState<ElementData | null>(null);

	useEffect(() => {
		if (selectedId) {
			const selectedElement = elements.find(element => element.id === selectedId);
			setElement(selectedElement || null);
		} else setElement(null);
	}, [selectedId, elements]);

	function updateElement(id: string | null, newData: ElementData) {
		if (!id) return;

		// Update an element with the given id
		setElements(elements.map(element => (element.id === id ? { ...element, ...newData } : element)));
	}

	return <>
		{element && (
			<div className="p-8 flex-col">
				<div className="mb-5 gap-8">
					<div className="flex justify-between">
						<span className="text-muted-foreground">{element?.id}</span>
						<span className="text-muted-foreground">{element?.type}</span>
					</div>
					<hr className="mt-2 mb-2"/>

					<Flex vertical={true} gap={5}>
						<Input 
							size="large" 
							placeholder="Element Name"
							value={element?.name}
							onChange={(e) => {
								updateElement(selectedId, { ...element, name: e.target.value })
							}}/>

						<Space.Compact>
      				<InputNumber addonBefore="X" value={element.x} onChange={(e) => updateElement(selectedId, { ...element, x: e ?? 0 })}/>
      				<InputNumber addonBefore="Y" value={element.y} onChange={(e) => updateElement(selectedId, { ...element, y: e ?? 0 })}/>
    				</Space.Compact>

						{/* <Space.Compact size="large">
      				<InputNumber addonBefore="Width" value={element.width} onChange={(e) => updateElement(selectedId, { ...element, width: e ?? 0 })}/>
      				<InputNumber addonBefore="Height" value={element.height} onChange={(e) => updateElement(selectedId, { ...element, height: e ?? 0 })}/>
    				</Space.Compact> */}

						<InputNumber addonBefore="Rotation" value={element.rotation} onChange={(e) => updateElement(selectedId, { ...element, rotation: e ?? 0 })}/>
					</Flex>
				</div>
				
				<div>
					<h1 className="text-lg font-semibold mb-5">Properties</h1>
				</div>
			</div>
		)}
	</>
}

export default Inspector;