import {
  PanelBody,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  __experimentalInputControl as InputControl,
  __experimentalUnitControl as UnitControl,
  RangeControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function AllInspectorSettings({ attributes, setAttributes }) {
  const {
    jumpTo,
    scrollBehaviour,
    scrollDuration,
    sectionSelector,
    display,
    position,
  } = attributes;

  return (
    <>
      <PanelBody title={__("Settings")}>
        <ToggleGroupControl
          label={__("Jump to", "brandy-blocks")}
          value={jumpTo ?? "top"}
          isBlock
          onChange={(v) => {
            setAttributes({ jumpTo: v });
          }}
        >
          <ToggleGroupControlOption value="top" label="Top" />
          <ToggleGroupControlOption value="bottom" label="Bottom" />
          <ToggleGroupControlOption value="section" label="Section" />
        </ToggleGroupControl>
        {jumpTo === "section" && (
          <InputControl
            label={__("Section selector")}
            value={sectionSelector}
            onChange={(nextValue) =>
              setAttributes({ sectionSelector: nextValue ?? "" })
            }
          />
        )}
        <ToggleGroupControl
          label={__("Scroll behaviour", "brandy-blocks")}
          value={scrollBehaviour ?? "smooth"}
          isBlock
          onChange={(v) => {
            setAttributes({ scrollBehaviour: v });
          }}
        >
          <ToggleGroupControlOption value="none" label="None" />
          <ToggleGroupControlOption value="smooth" label="Smooth" />
          <ToggleGroupControlOption value="custom" label="Custom" />
        </ToggleGroupControl>
        {scrollBehaviour === "custom" && (
          <RangeControl
            __nextHasNoMarginBottom
            label="Scroll duration (ms)"
            value={scrollDuration}
            onChange={(value) => setAttributes({ scrollDuration: value })}
            min={0}
            max={5000}
          />
        )}
        <ToggleGroupControl
          label={__("Display", "brandy-blocks")}
          value={display ?? "relative"}
          isBlock
          onChange={(v) => {
            setAttributes({ display: v });
          }}
        >
          <ToggleGroupControlOption value="relative" label="Relative" />
          <ToggleGroupControlOption value="fixed" label="Fixed" />
        </ToggleGroupControl>
        {display === "fixed" && (
          <>
            {["top", "left", "right", "bottom"].map((p) => (
              <UnitControl
                label={p.toUpperCase()}
                onChange={(v) => {
                  setAttributes({
                    position: {
                      ...position,
                      [p]: v,
                    },
                  });
                }}
                value={position[p] ?? ""}
                key={p}
              />
            ))}
          </>
        )}
      </PanelBody>
    </>
  );
}
