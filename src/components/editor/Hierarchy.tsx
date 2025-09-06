import { getImage, type ObjectData } from "@/components/editor/Object";
import { List } from "antd";

interface HierarchyProps {
	objects: ObjectData[]
	selectedId: string | null
	onSelect: (newId: string | null) => void
}

function Hierarchy({ objects, selectedId, onSelect }: HierarchyProps) {
	return (
		<div className="select-none m-3">
			<List itemLayout="horizontal" size="small" dataSource={objects} renderItem={obj => (
					<div onClick={() => onSelect(obj.id)} className={`cursor-pointer gap-0 mb-1 rounded ${obj.id === selectedId ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
						<List.Item>
							<List.Item.Meta
							avatar={<img src={getImage(obj.name)} className="h-5 mt-1" />}
							title={obj.name}
							key={`select_${obj.id}`}
							/>
						</List.Item>
					</div>
				)}/>
		</div>
	);
}

export default Hierarchy;