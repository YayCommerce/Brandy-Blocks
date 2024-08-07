/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from "@wordpress/block-editor";
import { getExtraDOMAttributes, getWrapperDOMAttributes } from "./utils";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save(getExtraDOMAttributes(attributes));
  const innerBlocksProps = useInnerBlocksProps.save(
    getWrapperDOMAttributes(attributes)
  );
  return (
    <div {...blockProps}>
      <div {...innerBlocksProps} />
    </div>
  );
}
