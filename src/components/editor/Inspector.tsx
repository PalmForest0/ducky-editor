import type { ObjectData } from "@/components/editor/Object";
import { Flex, Input, InputNumber, Space } from "antd";
import { useEffect, useState } from "react";

interface InspectorProps {
	objects: ObjectData[],
	updateObject: (id: string, newProps: Partial<ObjectData>) => void;
	selectedId: string | null
}

function Inspector({ objects, updateObject, selectedId }: InspectorProps) {
	const [selection, setSelection] = useState<ObjectData | null>(null);

	useEffect(() => {
		if (selectedId) {
			const selectedElement = objects.find(obj => obj.id === selectedId);
			setSelection(selectedElement || null);
		} 
		else setSelection(null);
	}, [selectedId, objects]);

	function updateProperty(propName: string, newValue: string) {
  	if (!selectedId || !selection) return;

  	const newProperties = selection.properties?.map((prop) =>
    	prop.name === propName ? { ...prop, value: newValue } : prop
  	);

  	updateObject(selectedId, { properties: newProperties });
	}

	return <>
		{selection && (
			<div className="p-8 flex-col">
				<div className="mb-5 gap-8">
					<div className="flex justify-between">
						<span className="text-muted-foreground">{selection?.id}</span>
						<span className="text-muted-foreground">{selection?.type}</span>
					</div>
					<hr className="mt-2 mb-2"/>

					<h1 className="text-lg font-semibold mb-2 mt-5">Transform</h1>

					<Flex vertical={true} gap={5}>
						<Input 
							size="large" 
							placeholder="Display Name"
							value={selection?.name}
							onChange={(e) => {
								updateObject(selectedId as string, { name: e.target.value })
							}}/>

						<Space.Compact>
      				<InputNumber addonBefore="X" value={selection.x} onChange={(e) => updateObject(selectedId as string, { x: e ?? 0 })}/>
      				<InputNumber addonBefore="Y" value={selection.y} onChange={(e) => updateObject(selectedId as string, { y: e ?? 0 })}/>
    				</Space.Compact>

						<InputNumber addonBefore="Rotation" value={selection.rotation} onChange={(e) => updateObject(selectedId as string, { rotation: e ?? 0 })}/>
					</Flex>
				</div>
				
				{selection.properties.length > 0 && (
					<div>
						<h1 className="text-lg font-semibold mb-2">Properties</h1>
						<Flex vertical={true} gap={5}>
							{selection.properties.map(prop => (
								<Input 
									addonBefore={prop.name}
									value={prop.value}
									onChange={(e) => {
										updateProperty(prop.name, e.target.value);
									}}/>
							))}
						</Flex>
					</div>
				)}
			</div>
		)}
	</>
}

export default Inspector;