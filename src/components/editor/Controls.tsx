import {Button, List, Modal} from "antd";
import {useState} from "react";

import elements from "../../data/elements.json";
import { getImage } from "./Element";

interface ControlsProps {
	createObject: (type: string) => void,
	deleteSelectedObject: () => void
}

function Controls({ createObject, deleteSelectedObject } : ControlsProps) {
	const [isCreateMenuOpen, setCreateMenuOpen] = useState(false);

	function createNew(type: string) {
		createObject(type);
		setCreateMenuOpen(false);
	}

	return (
		<>
			<div className="flex flex-row gap-x-3 py-4">
				<Button onClick={() => setCreateMenuOpen(true)}>Add Element</Button>
				<Button onClick={deleteSelectedObject}>Delete Element</Button>
			</div>

			<Modal 
			title="Add Element" 
			closable={{ 'aria-label': 'Close' }} 
			open={isCreateMenuOpen} 
			footer={null}
			onOk={() => setCreateMenuOpen(false)} 
			onCancel={() => setCreateMenuOpen(false)}
			modalRender={(node) => node}
			>
				<List itemLayout="horizontal" size="small" dataSource={elements} renderItem={elem => (
					<div onClick={() => createNew(elem.type)} className="select-none cursor-pointer gap-0">
						<List.Item>
							<List.Item.Meta
							avatar={<img src={getImage(elem.type)} className="h-5 mt-1" />}
							title={elem.name}
							key={`create_${elem.type}`}
							/>
							<h2 className="text-muted-foreground">{elem.type}</h2>
						</List.Item>
					</div>
				)}/>
			</Modal>
		</>
		
	);
}

export default Controls;