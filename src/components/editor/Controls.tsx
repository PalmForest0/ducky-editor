import {Button, Modal} from "antd";
import {useState} from "react";

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
        <div className="flex flex-row gap-x-3 py-4">
            <Button onClick={() => setCreateMenuOpen(true)}>Add Object</Button>
            <Button onClick={deleteSelectedObject}>Delete Object</Button>

            <Modal
                title="Add Element"
                closable={{ 'aria-label': 'Close' }}
                open={isCreateMenuOpen}
                footer={null}
            >
                <Button onClick={() => createNew("duck")}>Duck</Button>
            </Modal>
        </div>
    );
}

export default Controls;