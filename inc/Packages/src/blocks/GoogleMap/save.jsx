/**
 * WordPress dependencies
 */
import { useBlockProps } from "@wordpress/block-editor";
import { getExtraDOMAttributes } from "./utils";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save(getExtraDOMAttributes(attributes));
  return (
    <div {...blockProps}>
      <div id="brandy-blocks-google-map"></div>
    </div>
  );
}
