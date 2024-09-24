import {
  __experimentalUnitControl as UnitControl,
  __experimentalToolsPanel as ToolsPanel,
  __experimentalToolsPanelItem as ToolsPanelItem,
  TextControl,
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
        <ToolsPanelItem
          hasValue={() => true}
          label={__("Icon")}
          onDeselect={() => {}}
        >
          <UnitControl
            label="Icon size"
            value={iconSize}
            onChange={(v) => {
              setAttributes({ iconSize: v });
            }}
          />
        </ToolsPanelItem>

        <ToolsPanelItem
          hasValue={() => true}
          label={__("Text")}
          onDeselect={() => {}}
        >
          <TextControl
            __nextHasNoMarginBottom
            label="Text"
            help="Leave it empty to hide"
            value={attributes.defaultText ?? ""}
            onChange={(value) => setAttributes({ defaultText: value })}
          />
          <TextControl
            __nextHasNoMarginBottom
            label="Added Text"
            help="Leave it empty to hide"
            value={attributes.addedText ?? ""}
            onChange={(value) => setAttributes({ addedText: value })}
          />
        </ToolsPanelItem>
      </ToolsPanel>
    </>
  );
}
