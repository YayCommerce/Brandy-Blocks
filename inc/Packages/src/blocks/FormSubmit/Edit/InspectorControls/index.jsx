import {
  __experimentalInputControl as InputControl,
  PanelBody,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function AllInspectorSettings({ attributes, setAttributes }) {
  const { text } = attributes;

  return (
    <>
      <PanelBody title={__("Settings")}>
        <InputControl
          label={__("Text")}
          value={text}
          onChange={(v) => setAttributes({ text: v })}
        />
      </PanelBody>
    </>
  );
}
