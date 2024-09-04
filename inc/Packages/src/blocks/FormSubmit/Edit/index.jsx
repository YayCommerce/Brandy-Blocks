import {
  InspectorControls,
  useBlockProps,
  RichText,
} from "@wordpress/block-editor";

import AllInspectorSettings from "./InspectorControls";

import "../style.scss";

export default function Edit(props) {
  return (
    <>
      <InspectorControls>
        <AllInspectorSettings {...props} />
      </InspectorControls>
      <Content {...props} />
    </>
  );
}

export function Content({ isSave = false, attributes, setAttributes }) {
  const { text = "Submit" } = attributes;

  const props = {
    class: "wp-element-button",
    className: "wp-element-button",
    tagName: "button",
  };

  const blockProps = useBlockProps(props);
  return (
    <RichText
      {...blockProps}
      value={text}
      onChange={(v) => {
        setAttributes({ text: v });
      }}
    />
  );
}
