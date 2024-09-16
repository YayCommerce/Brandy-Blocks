import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
  RichText,
  InnerBlocks,
} from '@wordpress/block-editor';

export default function Edit(props) {
  return (
    <>
      <Content {...props} />
    </>
  );
}

const DEFAULT_TEMPLATE = [
  [
    'core/image',
    {
      url: 'https://images.wpbrandy.com/uploads/order-tracking-1.png',
      alt: 'testimonial-avatar',
    },
  ],
];

export function Content(props) {
  const { isSave = false, attributes, setAttributes } = props;

  const dataProps = {};

  const blockProps = isSave
    ? useBlockProps.save(dataProps)
    : useBlockProps(dataProps);

  return (
    <div {...blockProps}>
      <InnerBlocks template={DEFAULT_TEMPLATE} templateLock="all" />
    </div>
  );
}
