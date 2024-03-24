import { InspectorControls } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import PanelBody from "../../../components/PanelBody";

export default function Settings() {
  return (
    <InspectorControls key="setting">
      <div className="brandy-editor all-products-settings">
        <PanelBody title={__("Layout settings", "brandy")}>
          test
        </PanelBody>
        <PanelBody title={__("Content settings", "brandy")}>
          test
        </PanelBody>
      </div>
    </InspectorControls>
  );
}
