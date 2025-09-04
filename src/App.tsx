import Canvas from "@/components/editor/Canvas.tsx";
import { Layout, Menu, type MenuProps } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";

import type { ElementData } from "./components/editor/Element";
import Hierarchy from "./components/editor/Hierarchy";
import Controls from "./components/editor/Controls";

import elementDatas from "./data/elements.json";
import Inspector from "./components/editor/Inspector";

export interface ShapeData {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	fill: string;
}

function App() {
	const [elements, setElements] = useState<ElementData[]>([ ]);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [idCounter, setIdCounter] = useState<number>(0);

	function createElement(type: string) {
		const data = elementDatas.find(e => e.type === type);

		if(!data) return;

		const newElement: ElementData = {
			id: `element-${idCounter}`,
			type: data.type,
			name: data.name,
			x: 50,
			y: 50,
			width: 100,
			height: 100,
			rotation: 0
		};

		setElements([...elements, newElement]);
		setSelectedId(newElement.id)
		setIdCounter(idCounter + 1);
	}

	function deleteElement(id: string | null) {
		if(!id) return;

		setElements(elements.filter(shape => shape.id != id));
		setSelectedId(null);
	}

	function updateElement(id: string, newProps: Partial<ShapeData>) {
		setElements(elements.map(shape => (shape.id === id ? { ...shape, ...newProps } : shape)));
	}

	return (
		<Layout>
	  	<Header style={{ display: 'flex', alignItems: 'center' }}>
				<Controls createObject={createElement} deleteSelectedObject={() => deleteElement(selectedId)}/>
	  	</Header>

	  	<Layout>
				<Sider width={300} theme="light">
		  		<Hierarchy elements={elements} selectedId={selectedId} onSelect={setSelectedId}/>
				</Sider>

				<Layout style={{ padding: '0 24px 24px' }}>
					<Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
						<Canvas elements={elements} setElements={setElements} selectedId={selectedId} setSelectedId={setSelectedId} updateElement={updateElement}/>
		  		</Content>
				</Layout>

				<Sider width={400} theme="light">
					<Inspector elements={elements} setElements={setElements} selectedId={selectedId}/>
				</Sider>
	  	</Layout>

			<a href="https://github.com/PalmForest0/ducky-editor" target="_blank" rel="noopener noreferrer"><img src="/github_tv.png" className="fixed right-12 bottom-10 w-29"/></a>
		</Layout>
	);
}

export default App;