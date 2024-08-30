import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

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

export function Content({ attributes, isSave = false }) {
  const {
    name = "user_choices",
    isRequired = false,
    label = "User choices",
    id = "",
    options = [],
    inline = false,
    placeholder = "Select option",
  } = attributes;

  const blockProps = isSave ? useBlockProps.save() : useBlockProps();

  return (
    <div {...blockProps}>
      {label && (
        <label className="wp-block-brandy-form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        id={id}
        className="wp-block-brandy-form-field"
        name={name}
        required={isRequired}
        style={{
          display: inline ? "inline-block" : "block",
          marginLeft: inline ? "50px" : 0,
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.default}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
