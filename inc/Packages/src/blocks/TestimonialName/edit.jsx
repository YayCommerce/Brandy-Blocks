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

  const { align } = attributes;

  const dataProps = {
    className: align ? `has-text-align-${align}` : '',
  };

  const blockProps = isSave
    ? useBlockProps.save(dataProps)
    : useBlockProps(dataProps);

  return (
    <div {...blockProps}>
      {isSave ? (
        <RichText.Content tagName="p" value={attributes.name} />
      ) : (
        <RichText
          tagName="p"
          value={attributes.name}
          onChange={(v) =>
            setAttributes({
              name: v,
            })
          }
          className="brandy-testimonial__name"
        />
      )}
    </div>
  );
}
