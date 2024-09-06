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
  const { name, isRequired, label, autocomplete, id, validate } = attributes;

  const blockProps = isSave ? useBlockProps.save() : useBlockProps();

  return (
    <div {...blockProps}>
      {label && (
        <label className="wp-block-brandy-form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className="wp-block-brandy-form-field"
        type="tel"
        id={id}
        name={name}
        autocomplete={autocomplete ? "on" : "off"}
        required={isRequired}
        pattern={validate ? "[0-9]{3}-[0-9]{2}-[0-9]{3}" : ""}
      />
    </div>
  );
}
