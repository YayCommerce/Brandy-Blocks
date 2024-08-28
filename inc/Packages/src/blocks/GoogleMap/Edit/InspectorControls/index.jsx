import {
  __experimentalInputControl as InputControl,
  PanelBody,
  RangeControl,
  SelectControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function AllInspectorSettings({ attributes, setAttributes }) {
  const { apiKey, currentAddress, zoomLevel, mapStyle, language } = attributes;

  return (
    <>
      <PanelBody title={__("Settings")}>
        <InputControl
          label={__("API key")}
          value={apiKey}
          onChange={(value) =>
            setAttributes({
              apiKey: value,
            })
          }
        />
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
            { label: "Roadmap", value: "roadmap" },
            { label: "Satellite", value: "satellite" },
            { label: "Hybrid", value: "hybrid" },
            { label: "Terrain", value: "terrain" },
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
        <SelectControl
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
        />
      </PanelBody>
    </>
  );
}
