import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  return (
    <div {...blockProps}>
      <div className="brandy-pricing-feature-list">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
