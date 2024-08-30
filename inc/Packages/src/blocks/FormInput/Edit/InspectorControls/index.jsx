import {
  PanelBody,
  __experimentalInputControl as InputControl,
  ToggleControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  RangeControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function AllInspectorSettings({ attributes, setAttributes }) {
  const { name, isRequired, label, id, autocomplete, type, line } = attributes;

  return (
    <>
      <PanelBody title={__("Settings")}>
        <ToggleGroupControl
          label="Type"
          value={type}
          isBlock
          __nextHasNoMarginBottom
          onChange={(v) => {
            setAttributes({ type: v });
          }}
        >
          <ToggleGroupControlOption value="text" label="One line" />
          <ToggleGroupControlOption value="textarea" label="Multiple line" />
        </ToggleGroupControl>
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
        <RangeControl
          __nextHasNoMarginBottom
          label="Number of lines"
          value={line}
          onChange={(value) => setAttributes({ line: value })}
          min={2}
          max={20}
        />
      </PanelBody>
    </>
  );
}
