import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

import { getExtraDOMAttributes } from "../utils";
import AllInspectorSettings from "./InspectorControls";

export default function Edit(props) {
  const { attributes, setAttributes, clientId } = props;

  const blockProps = useBlockProps(getExtraDOMAttributes(attributes));

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
