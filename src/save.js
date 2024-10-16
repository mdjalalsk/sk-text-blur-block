import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { content, textTag, textAlign, textColor, backgroundColor, fontSize } = attributes;
	const blockProps = useBlockProps.save({
		className: 'blurred-text',
		style: {
			textAlign: textAlign,
			color: textColor,
			backgroundColor: backgroundColor,
			fontSize: `${fontSize}px`,
		},
	});

	return (
		<div {...blockProps}>
			<RichText.Content
				tagName={textTag}
				value={content}
			/>
		</div>
	);
}
