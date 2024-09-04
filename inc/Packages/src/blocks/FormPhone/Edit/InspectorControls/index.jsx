import {
  PanelBody,
  __experimentalInputControl as InputControl,
  ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function AllInspectorSettings({ attributes, setAttributes }) {
  const { name, isRequired, label, id, autocomplete, validate } = attributes;

  return (
    <>
      <PanelBody title={__("Settings")}>
        <InputControl
          label={__("Label")}
          value={label}
          onChange={(v) => setAttributes({ label: v })}
        />
        <InputControl
          label={__("Name")}
          value={name}
          onChange={(v) => setAttributes({ name: v })}
        />
        <InputControl
          label={__("Id")}
          value={id}
          onChange={(v) => setAttributes({ id: v })}
        />
        <ToggleControl
          __nextHasNoMarginBottom
          label="Is required"
          checked={isRequired}
          onChange={(v) => {
            setAttributes({ isRequired: v });
          }}
        />
        <ToggleControl
          __nextHasNoMarginBottom
          label="Autocomplete"
          checked={autocomplete}
          onChange={(v) => {
            setAttributes({ autocomplete: v });
          }}
        />
        <ToggleControl
          __nextHasNoMarginBottom
          label="Validate phone?"
          checked={validate}
          onChange={(v) => {
            setAttributes({ validate: v });
          }}
        />
      </PanelBody>
    </>
  );
}
