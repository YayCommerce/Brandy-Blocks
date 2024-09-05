import {
  __experimentalUnitControl as UnitControl,
  PanelBody,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function AllInspectorSettings({ attributes, setAttributes }) {
  const { width } = attributes;

  return (
    <>
      <PanelBody title={__("Settings")}>
        <UnitControl
          onChange={(v) => {
            setAttributes({ width: v });
          }}
          value={width}
        />
      </PanelBody>
    </>
  );
}
