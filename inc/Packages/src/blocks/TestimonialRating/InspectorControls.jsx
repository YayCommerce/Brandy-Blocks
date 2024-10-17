import { PanelColorSettings } from "@wordpress/block-editor";
import {
  PanelBody,
  __experimentalUnitControl as UnitControl,
  RangeControl,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";

export default function AllInspectorSettings({ attributes, setAttributes }) {
  const { activeColor, defaultColor, size, spacing, ratingPoint } = attributes;
  return (
    <PanelBody title="Settings">
      <RangeControl
        __nextHasNoMarginBottom
        label="Rating"
        value={ratingPoint}
        onChange={(value) =>
          setAttributes({
            ratingPoint: value,
          })
        }
        min={0}
        max={5}
      />
      <PanelColorSettings
        title={__("Colors", "brandy-blocks")}
        initialOpen={false}
        enableAlpha={true}
        colorSettings={[
          {
            value: defaultColor,
            onChange: (newColor) =>
              setAttributes({
                defaultColor: newColor,
              }),
            label: __("Default color", "brandy-blocks"),
          },
          {
            value: activeColor,
            onChange: (newColor) =>
              setAttributes({
                activeColor: newColor,
              }),
            label: __("Active color", "brandy-blocks"),
          },
        ]}
      />
      <UnitControl
        label={__("Star size")}
        onChange={(v) => {
          setAttributes({
            size: v,
          });
        }}
        value={size}
      />
      <UnitControl
        label={__("Spacing")}
        onChange={(v) => {
          setAttributes({
            spacing: v,
          });
        }}
        value={spacing}
      />
    </PanelBody>
  );
}
