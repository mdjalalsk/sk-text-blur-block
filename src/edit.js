import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, BlockControls, RichTextToolbarButton } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ColorPalette, RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { registerFormatType, toggleFormat, getActiveFormat } from '@wordpress/rich-text';
import './editor.scss';

const MyCustomBlurButton = ({ isActive, onChange, value }) => {
	return (
		<RichTextToolbarButton
			icon="visibility"
			title={__('Text Blur', 'sk-text-blur')}
			onClick={() => {
				onChange(
					toggleFormat(value, {
						type: 'sk-blur-button/text-blur',
					})
				);
			}}
			isActive={isActive}
		/>
	);
};

// Register the custom format type
registerFormatType('sk-blur-button/text-blur', {
	title: __('Blur Text', 'sk-text-blur'),
	tagName: 'skbt', // Custom tag
	className: 'sk-blur-text', // Optional CSS class for styling
	edit: MyCustomBlurButton,
});

export default function Edit({ attributes, setAttributes, clientId }) {
	const { content = '', textTag, textAlign, textColor, backgroundColor, fontSize } = attributes;
	const currentUser = useSelect((select) => select('core').getCurrentUser());
	const isAuthenticated = !!currentUser;

	// Block props
	const blockProps = useBlockProps();

	// Check if the blur format is active
	const isBlurActive = !!getActiveFormat(content, 'sk-blur-button/text-blur');

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Settings', 'sk-text-blur')}>
					<SelectControl
						label={__('Text Tag', 'sk-text-blur')}
						value={textTag}
						options={[
							{ label: __('Paragraph', 'sk-text-blur'), value: 'p' },
							{ label: __('Heading 1', 'sk-text-blur'), value: 'h1' },
							{ label: __('Heading 2', 'sk-text-blur'), value: 'h2' },
							{ label: __('Heading 3', 'sk-text-blur'), value: 'h3' },
							{ label: __('Heading 4', 'sk-text-blur'), value: 'h4' },
							{ label: __('Heading 5', 'sk-text-blur'), value: 'h5' },
							{ label: __('Heading 6', 'sk-text-blur'), value: 'h6' },
						]}
						onChange={(value) => setAttributes({ textTag: value })}
					/>
					<SelectControl
						label={__('Text Align', 'sk-text-blur')}
						value={textAlign}
						options={[
							{ label: __('Left', 'sk-text-blur'), value: 'left' },
							{ label: __('Center', 'sk-text-blur'), value: 'center' },
							{ label: __('Right', 'sk-text-blur'), value: 'right' },
						]}
						onChange={(value) => setAttributes({ textAlign: value })}
					/>
					<ColorPalette
						label={__('Text Color', 'sk-text-blur')}
						value={textColor}
						onChange={(value) => setAttributes({ textColor: value })}
					/>
					<ColorPalette
						label={__('Background Color', 'sk-text-blur')}
						value={backgroundColor}
						onChange={(value) => setAttributes({ backgroundColor: value })}
					/>
					<RangeControl
						label={__('Font Size', 'sk-text-blur')}
						value={fontSize}
						onChange={(value) => setAttributes({ fontSize: value })}
						min={10}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<MyCustomBlurButton
					isActive={isBlurActive}
					onChange={(newValue) => setAttributes({ content: newValue })}
					value={content}
				/>
			</BlockControls>

			<RichText
				{...blockProps}
				tagName={textTag}
				value={content}
				onChange={(value) => setAttributes({ content: value })}
				style={{
					textAlign: textAlign,
					color: textColor,
					backgroundColor: backgroundColor,
					fontSize: `${fontSize}px`,
				}}
			/>
		</Fragment>
	);
}
