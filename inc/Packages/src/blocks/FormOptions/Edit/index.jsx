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
    allowMultiple = true,
    direction,
    itemSpacing = "20px",
  } = attributes;

  const blockProps = isSave ? useBlockProps.save() : useBlockProps();

  const type = allowMultiple ? "checkbox" : "radio";

  return (
    <div {...blockProps}>
      {label && (
        <label className="wp-block-brandy-form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <ul
        id={id}
        className={`wp-block-brandy-form-options-list ${
          direction === "vertical" ? "vertical-list" : "horizontal-list"
        }`}
        style={{
          gap: `${itemSpacing}px`,
        }}
      >
        {options.map((option) => (
          <li key={option.value}>
            <label className="wp-block-brandy-form-options-item">
              <input
                type={type}
                name={name}
                value={option.value}
                required={isRequired}
                checked={option.default}
              />
              <span>{option.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
