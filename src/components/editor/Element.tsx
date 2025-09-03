import {useEffect, useRef, useState} from "react";
import Konva from "konva";
import {Image, Transformer} from "react-konva";

export interface ElementData {
	id: string;
	type: string;
	name: string;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
}

interface ElementProps {
	data: ElementData,
	isSelected: boolean,
	onSelect: () => void,
	onModify: (newData: Partial<ElementData>) => void
}

function Element({ data, isSelected, onSelect, onModify } : ElementProps) {
	const shapeRef = useRef<Konva.Image | null>(null);
	const transformerRef = useRef<Konva.Transformer | null>(null);
	
	const [image, setImage] = useState<HTMLImageElement | undefined>(undefined);

	useEffect(() => {
		const img = new window.Image();
		img.src = getImage(data.type);

		img.onload = () => {
			setImage(img);
			if (data.width !== img.width || data.height !== img.height) {
   	 		onModify({ width: img.width, height: img.height });
  		}
		};
	}, [data.type]);


	useEffect(() => {
		if (isSelected && transformerRef.current && shapeRef.current) {
			transformerRef.current.nodes([shapeRef.current]);
			transformerRef.current.getLayer()?.batchDraw();
		}
	}, [isSelected]);

	return (
		<>
			<Image
				image={image}
				x={data.x}
				y={data.y}
				width={data.width}
				height={data.height}
				rotation={data.rotation}
				ref={shapeRef}
				draggable
				onClick={(e) => {
					e.cancelBubble = true;
					onSelect();
				}}
				onTap={(e) => {
					e.cancelBubble = true;
					onSelect();
				}}
				onDragEnd={(e) => {
					onModify({ x: e.target.x(), y: e.target.y() });
					onSelect();
				}}
				onTransformEnd={() => {
					const node = shapeRef.current;
					if (!node) return;

					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					node.scaleX(1);
					node.scaleY(1);

					onModify({
						x: node.x(),
						y: node.y(),
						rotation: node.rotation(),
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(5, node.height() * scaleY),
					});
				}}/>
			{isSelected && <Transformer ref={transformerRef} />}
		</>
	);
}

export default Element;

export function getImage(type: string) {
	return `/elements/${type}.png`;
}