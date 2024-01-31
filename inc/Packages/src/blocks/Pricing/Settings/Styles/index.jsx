import { __ } from "@wordpress/i18n";
import PanelBody from "../../../../components/PanelBody";
import BackgroundPadding from "./HighlightPrice/BackgroundPadding";
import CardItemColor from "./HighlightPrice/CardItemColor";
import SelectPrice from "./HighlightPrice/SelectPrice";
import ItemBlock from "./ItemBlock";

export default function Styles() {
  return (
    <div className="pricing-settings__styles">
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
