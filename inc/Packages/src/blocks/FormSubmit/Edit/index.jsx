import {
  InspectorControls,
  RichText,
  useBlockProps,
} from "@wordpress/block-editor";

import AllInspectorSettings from "./InspectorControls";

import clsx from "clsx";

import "../style.scss";
import AllBlockControls from "./BlockControls";

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
  const { text = "Submit", textAlign = "center", width = "100%" } = attributes;

  const props = {
    class: clsx("wp-element-button", {
      [`has-text-align-${textAlign}`]: true,
    }),
    className: clsx("wp-element-button", {
      [`has-text-align-${textAlign}`]: true,
    }),
    tagName: isSave ? "button" : "div",
  };

  const blockProps = isSave ? useBlockProps.save(props) : useBlockProps(props);

  return isSave ? (
    <RichText.Content
      {...blockProps}
      value={text}
      style={{
        ...blockProps.style,
        width,
      }}
    />
  ) : (
    <>
      <RichText
        {...blockProps}
        value={text}
        onChange={(v) => {
          setAttributes({ text: v });
        }}
        style={{
          ...blockProps.style,
          width,
        }}
      />
      <AllBlockControls attributes={attributes} setAttributes={setAttributes} />
      <InspectorControls
        attributes={attributes}
        setAttributes={setAttributes}
      />
    </>
  );
}
