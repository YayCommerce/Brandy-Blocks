import { PanelBody, ToggleControl } from "@wordpress/components";

import { __ } from "@wordpress/i18n";

export default function Layout({ attributes, setAttributes }) {
  const { inline = false } = attributes;
  return (
    <PanelBody title={__("Layout")}>
      <ToggleControl
        label={__("Inline with label?")}
        checked={inline}
        onChange={(v) => {
          setAttributes({ inline: v });
        }}
      />
    </PanelBody>
  );
}
