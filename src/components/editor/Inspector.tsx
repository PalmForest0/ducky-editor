import type { ElementData } from "@/components/editor/Element.tsx";
import { Input } from "antd";
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
				<div className="mb-5">
					<Input size="large" placeholder="Element Name" onChange={() => updateElement(selectedId, { ...element, name: element?.name })}/>
					<h1 className="text-2xl font-semibold mb-1">{element?.name}</h1>
					<span className="text-muted-foreground">{element?.type}</span>
				</div>
				
				<span className="text-muted-foreground">{element?.id}</span>
			</div>
		)}
	</>
}

export default Inspector;