import { RichText, useBlockProps } from '@wordpress/block-editor';
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
        <RichText.Content tagName="p" value={attributes.description} />
      ) : (
        <RichText
          tagName="p"
          value={attributes.description}
          onChange={(v) =>
            setAttributes({
              description: v,
            })
          }
          className="brandy-testimonial__description"
        />
      )}
    </div>
  );
}
