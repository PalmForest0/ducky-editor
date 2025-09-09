import { useEffect, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";
import Konva from "konva";
import type { Rectangle } from "./Canvas";

export interface ObjectData {
	id: string;
	type: string;
	name: string;
	x: number;
	y: number;
	width: number;
	height: number;
	rotation: number;
	properties: PropertyData[];
}

export interface PropertyData {
	name: string;
	value: string;
}

interface ObjectProps {
	data: ObjectData,
	isSelected: boolean,
  displayBounds: Rectangle,
	onSelect: () => void,
	onModify: (newData: Partial<ObjectData>) => void
}

function Object({ data, isSelected, displayBounds, onSelect, onModify } : ObjectProps) {
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
        onDragMove={(e) => {
          let newX = e.target.x();
          let newY = e.target.y();
		    	e.target.x(Math.max(displayBounds.x, Math.min(newX, displayBounds.width - e.target.width())));
          e.target.y(Math.max(displayBounds.y, Math.min(newY, displayBounds.height - e.target.height())));
        }}
				onDragEnd={(e) => {
					onModify({ x: e.target.x(), y: e.target.y() });
					onSelect();
				}}
				onTransformEnd={() => {
					const node = shapeRef.current;
					if (!node) return;

					onModify({
						x: node.x(),
						y: node.y(),
						rotation: node.rotation(),
						width: node.width(),
						height: node.height(),
					});
				}}/>
			{isSelected && <Transformer ref={transformerRef} resizeEnabled={false} />}
		</>
	);
}

export default Object;

export function getImage(type: string) {
	return `/elements/${type}.png`;
}