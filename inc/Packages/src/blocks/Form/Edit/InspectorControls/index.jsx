import {
  PanelBody,
  SelectControl,
  __experimentalInputControl as InputControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function AllInspectorSettings({ attributes, setAttributes }) {
  const { action, successUrl, failedUrl } = attributes;

  return (
    <>
      <PanelBody title={__("Settings")}>
        <SelectControl
          label={__("Action")}
          value={action}
          options={[
            { label: "Login", value: "login" },
            { label: "Reset password", value: "reset_password" },
            { label: "Custom", value: "custom" },
          ]}
          onChange={(v) => setAttributes({ action: v })}
          __nextHasNoMarginBottom
        />
        <InputControl
          label={__("Success redirect url")}
          value={successUrl}
          onChange={(v) => setAttributes({ successUrl: v })}
        />
        <InputControl
          label={__("Success message")}
          value={successUrl}
          onChange={(v) => setAttributes({ successMessage: v })}
        />
        <InputControl
          label={__("Failed redirect url")}
          value={failedUrl}
          onChange={(v) => setAttributes({ failedUrl: v })}
        />
        <InputControl
          label={__("Failed message")}
          value={failedUrl}
          onChange={(v) => setAttributes({ failedMessage: v })}
        />
      </PanelBody>
    </>
  );
}
