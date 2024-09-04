import {
  PanelBody,
  SelectControl,
  __experimentalInputControl as InputControl,
  __experimentalDivider as Divider,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function AllInspectorSettings({ attributes, setAttributes }) {
  const { action, successUrl, successMessage, failedUrl, failedMessage } =
    attributes;

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
          help={
            <>
              {action === "login" &&
                __(
                  "Please make sure you have two fields with name: username - password"
                )}
              {action === "reset_password" &&
                __("Please make sure you have field: user_login")}
            </>
          }
          __nextHasNoMarginBottom
        />
        {action !== "reset_password" && (
          <>
            <InputControl
              label={__("Success redirect url")}
              value={successUrl}
              onChange={(v) => setAttributes({ successUrl: v })}
            />
            <InputControl
              label={__("Failed redirect url")}
              value={failedUrl}
              onChange={(v) => setAttributes({ failedUrl: v })}
            />
            <Divider />
            <InputControl
              label={__("Success message")}
              value={successMessage}
              onChange={(v) => setAttributes({ successMessage: v })}
            />
            <InputControl
              label={__("Failed message")}
              value={failedMessage}
              onChange={(v) => setAttributes({ failedMessage: v })}
            />
          </>
        )}
      </PanelBody>
    </>
  );
}
