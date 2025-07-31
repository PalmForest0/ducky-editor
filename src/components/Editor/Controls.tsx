import { Button } from "../ui/button";

interface ControlsProps {
    createObject: () => void,
    deleteSelectedObject: () => void
}

function Controls({ createObject, deleteSelectedObject } : ControlsProps) {
    return (
        <div className="flex flex-row gap-x-3 py-4">
            <Button onClick={createObject}>Add Object</Button>
            <Button onClick={deleteSelectedObject}>Delete Object</Button>
        </div>
    );
}

export default Controls;