import type { ElementData } from "@/components/editor/Element.tsx";
import { Menu } from "antd";

interface HierarchyProps {
    elements: ElementData[]
    selectedId: string | null
    onSelect: (newId: string | null) => void
}

function Hierarchy({ elements, selectedId, onSelect }: HierarchyProps) {
    return (
        <div className="select-none">
            <Menu
                mode="inline"
                className="h-full"
                items={elements.map((element, index) => ({
                    key: element.id || index,
                    label: element.name || element.id || element.type || index
                }))}
                selectedKeys={elements.filter(element => element.id === selectedId).map(element => element.id)}
                onSelect={({ key }) => onSelect(key)}
                onDeselect={() => onSelect(null)}
            />
        </div>
    );
}

export default Hierarchy;