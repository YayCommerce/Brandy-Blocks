import { __ } from "@wordpress/i18n";
import PanelBody from "../../../../components/PanelBody";
import Header from "./Header";
import BackgroundPadding from "./HighlightPrice/BackgroundPadding";
import CardItemColor from "./HighlightPrice/CardItemColor";
import SelectPrice from "./HighlightPrice/SelectPrice";
import ItemBlock from "./ItemBlock";

export default function Styles() {
  return (
    <div className="pricing-settings__styles">
      <PanelBody
        title={__("Header", "brandy")}
        initialOpen={false}
        className="brandy-editor-panel-body"
      >
        <Header />
      </PanelBody>
      <PanelBody title={__("Item block", "brandy")}>
        <ItemBlock />
      </PanelBody>
      <PanelBody title={__("Highlight card", "brandy")}>
        <SelectPrice />
        <CardItemColor />
        <BackgroundPadding />
      </PanelBody>
    </div>
  );
}
