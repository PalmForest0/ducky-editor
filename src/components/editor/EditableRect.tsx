import {useEffect, useRef} from "react";
import Konva from "konva";
import {Rect, Transformer} from "react-konva";

interface ShapeProps {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	fill: string;
}

interface EditableRectProps {
	shapeProps: ShapeProps;
	isSelected: boolean;
	onSelect: () => void;
	onChange: (newProps: Partial<ShapeProps>) => void;
}

function EditableRect({shapeProps, isSelected, onSelect, onChange} : EditableRectProps) {
	const shapeRef = useRef<Konva.Rect | null>(null);
	const transformerRef = useRef<Konva.Transformer | null>(null);

	useEffect(() => {
		if (isSelected && transformerRef.current && shapeRef.current) {
			transformerRef.current.nodes([shapeRef.current]);
			transformerRef.current.getLayer()?.batchDraw();
		}
	}, [isSelected]);

	return (
		<>
			<Rect
				{...shapeProps}
				ref={shapeRef}
				draggable
				onClick={onSelect}
				onTap={onSelect}
				onDragEnd={(e) => {
					onChange({
						x: e.target.x(),
						y: e.target.y(),
					});
					onSelect();
				}}
				onTransformEnd={() => {
					const node = shapeRef.current;
					if (!node) return;

					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					node.scaleX(1);
					node.scaleY(1);

					onChange({
						x: node.x(),
						y: node.y(),
						rotation: node.rotation(),
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(5, node.height() * scaleY),
					});
				}}
			/>
			{isSelected && <Transformer ref={transformerRef} />}
		</>
	);
}

export default EditableRect;