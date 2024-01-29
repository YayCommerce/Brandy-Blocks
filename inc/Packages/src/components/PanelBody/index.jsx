import { PanelBody as WPPanelBody } from "@wordpress/components";
import "./index.scss";

export default function PanelBody({ title, initialOpen = false, children }) {
  return (
    <WPPanelBody
      title={title}
      initialOpen={initialOpen}
      className="brandy-editor-panel-body"
    >
      {children}
    </WPPanelBody>
  );
}
