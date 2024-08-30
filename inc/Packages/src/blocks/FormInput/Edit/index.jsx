import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

import AllInspectorSettings from "./InspectorControls";

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

export function Content({ attributes, isSave = false }) {
  const { name, isRequired, label, autocomplete, id, type, line } = attributes;

  const blockProps = isSave ? useBlockProps.save() : useBlockProps();

  const Tag = type === "textarea" ? "textarea" : "input";
  return (
    <div {...blockProps}>
      {label && (
        <label className="wp-block-brandy-form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <Tag
        className="wp-block-brandy-form-field"
        id={id}
        name={name}
        autocomplete={autocomplete ? "on" : "off"}
        required={isRequired}
        {...(type == "textarea"
          ? {
              rows: line,
            }
          : {
              type: "text",
            })}
      />
    </div>
  );
}
