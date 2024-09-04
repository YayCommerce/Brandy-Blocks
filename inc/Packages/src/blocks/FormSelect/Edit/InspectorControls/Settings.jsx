import {
  __experimentalInputControl as InputControl,
  PanelBody,
  ToggleControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";

export default function Settings({ attributes, setAttributes }) {
  const { name, isRequired, label, id } = attributes;
  return (
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
        label={__("Is required")}
        checked={isRequired}
        onChange={(v) => {
          setAttributes({ isRequired: v });
        }}
      />
    </PanelBody>
  );
}
