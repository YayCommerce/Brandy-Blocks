import { InspectorControls } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

import BannerSettings from "./BannerSettings";
import ContentSettings from "./ContentSettings";
import ProductCategorySettings from "./ProductCategorySettings";

import PanelBody from "../../../components/PanelBody";

export default function Settings() {
  return (
    <InspectorControls key="setting">
      <div className="brandy-editor product-catalog-settings">
        <PanelBody title={__("Banner settings", "brandy")}>
          <BannerSettings />
        </PanelBody>
        <PanelBody title={__("Content settings", "brandy")}>
          <ContentSettings />
        </PanelBody>
        <PanelBody title={ __("Filter by Product Category","brandy") }>
            <ProductCategorySettings/>
        </PanelBody>
      </div>
    </InspectorControls>
  );
}
