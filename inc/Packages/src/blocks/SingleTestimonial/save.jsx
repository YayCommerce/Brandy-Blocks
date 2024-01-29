import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { rating } = attributes;
  return (
    <div {...blockProps} rating={rating}>
      <InnerBlocks.Content />
    </div>
  );
}
