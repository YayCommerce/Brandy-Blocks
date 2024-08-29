import {
  __experimentalInputControl as InputControl,
  PanelBody,
  RangeControl,
  SelectControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function AllInspectorSettings({ attributes, setAttributes }) {
  const { currentAddress, zoomLevel, mapStyle, language } = attributes;

  return (
    <>
      <PanelBody title={__("Settings")}>
        <InputControl
          label={__("Current address")}
          value={currentAddress}
          onChange={(value) =>
            setAttributes({
              currentAddress: value,
            })
          }
        />
        <SelectControl
          label="Map style"
          value={mapStyle}
          options={[
            { label: "Roadmap", value: "ROADMAP" },
            { label: "Satellite", value: "SATELLITE" },
            { label: "Hybrid", value: "HYBRID" },
            { label: "Terrain", value: "TERRAIN" },
          ]}
          onChange={(value) =>
            setAttributes({
              mapStyle: value,
            })
          }
          __nextHasNoMarginBottom
        />
        <RangeControl
          __nextHasNoMarginBottom
          label="Zoom level"
          value={zoomLevel ?? 10}
          onChange={(value) =>
            setAttributes({
              zoomLevel: value,
            })
          }
          min={5}
          max={100}
        />
        {/* <SelectControl
          label="Language"
          value={language}
          options={[
            { label: "English", value: "en" },
            { label: "Vietnamese", value: "vi" },
          ]}
          onChange={(value) =>
            setAttributes({
              language: value,
            })
          }
          __nextHasNoMarginBottom
        /> */}
      </PanelBody>
    </>
  );
}
