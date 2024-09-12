import {
  __experimentalUnitControl as UnitControl,
  __experimentalToolsPanel as ToolsPanel,
} from "@wordpress/components";
import { PanelColorSettings } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import State from "./State";

export default function AllInspectorSettings({ attributes, setAttributes }) {
  const {
    backgroundColor,
    backgroundColorHover,
    backgroundColorActive,
    iconSize,
    loadingSpinnerColor,
  } = attributes;
  return (
    <>
      <PanelColorSettings
        title={__("Background Color", "brandy-blocks")}
        initialOpen={false}
        colorSettings={[
          {
            value: backgroundColor,
            onChange: (newColor) =>
              setAttributes({
                backgroundColor: newColor,
              }),
            label: __("Default", "brandy-blocks"),
          },
          {
            value: backgroundColorHover,
            onChange: (newColor) =>
              setAttributes({
                backgroundColorHover: newColor,
              }),
            label: __("Hover", "brandy-blocks"),
          },
          {
            value: backgroundColorActive,
            onChange: (newColor) =>
              setAttributes({
                backgroundColorActive: newColor,
              }),
            label: __("Active", "brandy-blocks"),
          },
          {
            value: loadingSpinnerColor,
            onChange: (newColor) =>
              setAttributes({
                loadingSpinnerColor: newColor,
              }),
            label: __("Spinner color", "brandy-blocks"),
          },
        ]}
      />
      <State
        attributes={attributes}
        setAttributes={setAttributes}
        state="default"
      />
      <State
        attributes={attributes}
        setAttributes={setAttributes}
        state="hover"
      />
      <State
        attributes={attributes}
        setAttributes={setAttributes}
        state="active"
      />
      <ToolsPanel label={__("Settings")}>
        <UnitControl
          label="Icon size"
          value={iconSize}
          onChange={(v) => {
            setAttributes({ iconSize: v });
          }}
        />
      </ToolsPanel>
    </>
  );
}
