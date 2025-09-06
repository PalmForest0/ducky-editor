import Canvas from "@/components/editor/Canvas.tsx";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";

import type { ObjectData } from "./components/editor/Object";
import Hierarchy from "./components/editor/Hierarchy";
import Controls from "./components/editor/Controls";

import objectDatas from "./data/objects.json";
import Inspector from "./components/editor/Inspector";

function App() {
	const [objects, setObjects] = useState<ObjectData[]>([ ]);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [idCounter, setIdCounter] = useState<number>(0);

	function createObject(type: string) {
		const data = objectDatas.find(d => d.name === type);

		if(!data) return;

		const newObject: ObjectData = {
			id: `element-${idCounter}`,
			type: data.name,
			name: data.name,
			x: 50,
			y: 50,
			width: 100,
			height: 100,
			rotation: 0,
			properties: data.defaultProperties ?? []
		};

		setObjects([...objects, newObject]);
		setSelectedId(newObject.id)
		setIdCounter(idCounter + 1);
	}

	function deleteObject(id: string | null) {
		if(!id) return;

		setObjects(objects.filter(shape => shape.id != id));
		setSelectedId(null);
	}

	function updateObject(id: string, newProps: Partial<ObjectData>) {
		setObjects(objects.map(shape => (shape.id === id ? { ...shape, ...newProps } : shape)));
	}

	return (
		<Layout>
	  	<Header style={{ display: 'flex', alignItems: 'center' }}>
				<Controls createObject={createObject} deleteSelectedObject={() => deleteObject(selectedId)}/>
	  	</Header>

	  	<Layout>
				<Sider width={300} theme="light">
		  		<Hierarchy objects={objects} selectedId={selectedId} onSelect={setSelectedId}/>
				</Sider>

				<Layout style={{ padding: '0 24px 24px' }}>
					<Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
						<Canvas objects={objects} updateObject={updateObject} selectedId={selectedId} setSelectedId={setSelectedId}/>
		  		</Content>
				</Layout>

				<Sider width={400} theme="light">
					<Inspector objects={objects} updateObject={updateObject} selectedId={selectedId}/>
				</Sider>
	  	</Layout>

			<a href="https://github.com/PalmForest0/ducky-editor" target="_blank" rel="noopener noreferrer"><img src="/github_tv.png" className="fixed right-12 bottom-10 w-29"/></a>
		</Layout>
	);
}

export default App;