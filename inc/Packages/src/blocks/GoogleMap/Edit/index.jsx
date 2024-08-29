import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { useEffect } from "@wordpress/element";

import { getExtraDOMAttributes } from "../utils";
import AllInspectorSettings from "./InspectorControls";

let watchDebounceId;

export default function Edit(props) {
  const { attributes, setAttributes, clientId } = props;

  const blockProps = useBlockProps(getExtraDOMAttributes(attributes));

  useEffect(() => {
    clearTimeout(watchDebounceId);
    watchDebounceId = setTimeout(() => {
      const currentBlock = document.getElementById(`block-${clientId}`);
      if (currentBlock) {
        window.dispatchEvent(
          new CustomEvent("bb_google_map_attribute_changed", {
            detail: {
              block: currentBlock,
            },
          })
        );
      }
    }, 500);
  }, [attributes, clientId]);

  return (
    <>
      <InspectorControls>
        <AllInspectorSettings
          setAttributes={setAttributes}
          attributes={attributes}
          clientId={clientId}
        />
      </InspectorControls>
      <div {...blockProps}>
        <div id="brandy-blocks-google-map">[Your map will display here]</div>
      </div>
    </>
  );
}
