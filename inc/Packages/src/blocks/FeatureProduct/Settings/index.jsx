import { InspectorControls } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import ProductSetting from "./ProductSetting";
import ContentSettings from "./ContentSettings";
import PanelBody from "../../../components/PanelBody";

export default function Settings() {
  return (
    <InspectorControls key="setting">
      <div className="brandy-editor feature-product-settings">
        <PanelBody title={__("Product settings", "brandy")}>
          <ProductSetting />
        </PanelBody>
        <PanelBody title={__("Content settings", "brandy")}>
          <ContentSettings />
        </PanelBody>
      </div>
    </InspectorControls>
  );
}
