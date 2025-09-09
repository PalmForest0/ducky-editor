import {Button, List, Modal} from "antd";
import {useState} from "react";

import objects from "../../data/objects.json";
import { getImage } from "./Object";

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
				<Button onClick={() => setCreateMenuOpen(true)}>Create Object</Button>
				<Button onClick={deleteSelectedObject}>Delete Object</Button>
			</div>

			<Modal 
				title="Add Element" 
				closable={{ 'aria-label': 'Close' }} 
				open={isCreateMenuOpen} 
				footer={null}
				styles={{
    			body: {
      			maxHeight: "70vh",
      			overflowY: "auto",
      			paddingRight: "14px"
    			}
  			}}
				onOk={() => setCreateMenuOpen(false)} 
				onCancel={() => setCreateMenuOpen(false)}
				modalRender={(node) => node}
			>
				<List itemLayout="horizontal" size="small" dataSource={objects} renderItem={obj => (
					<div onClick={() => createNew(obj.name)} className="select-none cursor-pointer gap-0">
						<List.Item>
							<List.Item.Meta
							avatar={<img src={getImage(obj.name)} className="h-5 mt-1" />}
							title={obj.name}
							key={`create_${obj.name}`}
							/>
						</List.Item>
					</div>
				)}/>
			</Modal>
		</>
		
	);
}

export default Controls;