import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
  RichText,
} from '@wordpress/block-editor';
import BlockControls from './BlockControls';

export default function Edit(props) {
  return (
    <>
      <BlockControls {...props} />
      <Content {...props} />
    </>
  );
}

export function Content(props) {
  const { isSave = false, attributes, setAttributes } = props;

  const blockProps = isSave ? useBlockProps.save() : useBlockProps();

  return (
    <div {...blockProps}>
      {isSave ? (
        <RichText.Content tagName="p" value={attributes.content} />
      ) : (
        <RichText
          tagName="p"
          value={attributes.content}
          onChange={(v) =>
            setAttributes({
              content: v,
            })
          }
          className="brandy-testimonial__content"
        />
      )}
    </div>
  );
}
