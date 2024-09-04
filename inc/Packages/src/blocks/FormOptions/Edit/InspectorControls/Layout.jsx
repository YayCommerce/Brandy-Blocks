import {
  PanelBody,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  RangeControl,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";

export default function Layout({ attributes, setAttributes }) {
  const { direction = "horizontal", itemSpacing = "20px" } = attributes;
  return (
    <PanelBody title={__("Layout")}>
      <ToggleGroupControl
        label={__("Direction")}
        value={direction}
        isBlock
        __nextHasNoMarginBottom
        onChange={(v) => {
          setAttributes({ direction: v });
        }}
      >
        <ToggleGroupControlOption value="horizontal" label="Horizontal" />
        <ToggleGroupControlOption value="vertical" label="Vertical" />
      </ToggleGroupControl>
      <RangeControl
        __nextHasNoMarginBottom
        label={__("Item spacing")}
        onChange={(v) => {
          setAttributes({ itemSpacing: v });
        }}
        value={itemSpacing}
        min={10}
        max={1000}
      />
    </PanelBody>
  );
}
