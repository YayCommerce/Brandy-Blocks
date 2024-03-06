import { InspectorControls } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import LayoutSettings from "./LayoutSettings";
import ContentSettings from "./ContentSettings";
import PanelBody from "../../../components/PanelBody";

export default function Settings() {
  return (
    <InspectorControls key="setting">
      <div className="brandy-editor all-products-settings">
        <PanelBody title={__("Layout settings", "brandy")}>
          <LayoutSettings />
        </PanelBody>
        <PanelBody title={__("Content settings", "brandy")}>
          <ContentSettings />
        </PanelBody>
      </div>
    </InspectorControls>
  );
}
