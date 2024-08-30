import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  return (
    <>
    <div className="brandy-testimonials__wrapper__avatar" {...blockProps}>
      <InnerBlocks.Content />
    </div>
    </>
    
  );
}
