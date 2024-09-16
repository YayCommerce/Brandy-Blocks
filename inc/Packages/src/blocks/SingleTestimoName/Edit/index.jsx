import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
  RichText,
} from '@wordpress/block-editor';

export default function Edit(props) {
  return (
    <>
      <Content {...props} />
    </>
  );
}

export function Content(props) {
  const { isSave = false, attributes, setAttributes } = props;

  const dataProps = {};

  const blockProps = isSave
    ? useBlockProps.save(dataProps)
    : useBlockProps(dataProps);

  return (
    <div {...blockProps}>
      <RichText
        tagName="p"
        value={attributes.name}
        onChange={(v) =>
          setAttributes({
            name: v,
          })
        }
        className="brandy-single-testimonial__name"
      />
    </div>
  );
}
