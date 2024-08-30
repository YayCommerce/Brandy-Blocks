import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  return (
    <div
      {...blockProps}
      className={`${blockProps.className}`}
    >
      <RichText.Content
            tagName="p"
            value={attributes.name}
            className="brandy-testimonials__card__name"
          />
    </div>
  );
}

