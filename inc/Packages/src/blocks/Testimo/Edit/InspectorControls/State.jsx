import {
  Button,
  __experimentalInputControl as InputControl,
  PanelBody,
} from "@wordpress/components";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function State({ state, attributes, setAttributes }) {
  const attributeSuffix = useMemo(() => {
    switch (state) {
      case "hover":
        return "Hover";
      case "active":
        return "Active";
      default:
        return "";
    }
  }, [state]);

  const icon = useMemo(() => {
    return attributes[`icon${attributeSuffix}`];
  }, [attributes, attributeSuffix]);

  return (
    <PanelBody
      title={
        <span style={{ textTransform: "capitalize" }}>{`${state} icon`}</span>
      }
      initialOpen={false}
    >
      <div>
        {icon && <img style={{ width: 50, marginBottom: 10 }} src={icon} />}
        <InputControl
          value={icon}
          onChange={(v) => {
            setAttributes({ [`icon${attributeSuffix}`]: v });
          }}
          __nextHasNoMarginBottom
        />
        <MediaUploadCheck>
          <MediaUpload
            onSelect={(media) => {
              setAttributes({ [`icon${attributeSuffix}`]: media.url ?? "" });
            }}
            allowedTypes={["image"]}
            value={icon}
            render={({ open }) => (
              <Button onClick={open} isPrimary>
                Replace
              </Button>
            )}
          />
        </MediaUploadCheck>
      </div>
    </PanelBody>
  );
}
