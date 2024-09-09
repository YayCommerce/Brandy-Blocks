import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

import AllInspectorSettings from "./InspectorControls";

export default function Edit(props) {
  const { attributes, setAttributes, clientId } = props;

  const blockProps = useBlockProps();

  return (
    <>
      <InspectorControls>
        <AllInspectorSettings
          setAttributes={setAttributes}
          attributes={attributes}
          clientId={clientId}
        />
      </InspectorControls>
      123123123
    </>
  );
}
