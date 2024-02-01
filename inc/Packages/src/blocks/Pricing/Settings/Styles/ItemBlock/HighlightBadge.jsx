import { __ } from "@wordpress/i18n";
import Title from "../../../../../components/Card/Title";
import { useContext } from "@wordpress/element";
import { PricingContext } from "../../../edit";
import Card from "../../../../../components/Card";
import Label from "../../../../../components/Label";
import Typography from "../../../../../components/Typography";
import ColorPicker from "../../../../../components/ColorPicker";
import Spacing from "../../../../../components/Spacing";

export default function Highlight() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const handleChangeValue = (key) => (v) => {
    setAttributes({
      card_highlight_badge: {
        ...attributes.card_highlight_badge,
        [key]: v,
      },
    });
  };
  return (
    <Card title={<Title title={__("Highlight badge", "brandy")} />}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Label title={__("Typography", "brandy")} />
        <Typography
          value={attributes.card_highlight_badge.typography}
          onChange={handleChangeValue("typography")}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          marginTop: 10,
        }}
        className="brandy-editor-group-color"
      >
        <div>
          <Label title={__("Title", "brandy")} style={{ marginBottom: 10 }} />
          <ColorPicker
            color={attributes.card_highlight_badge.title_color}
            onChange={handleChangeValue("title_color")}
          />
        </div>
        <div>
          <Label
            title={__("Background", "brandy")}
            style={{ marginBottom: 10 }}
          />
          <ColorPicker
            color={attributes.card_highlight_badge.background_color}
            onChange={handleChangeValue("background_color")}
          />
        </div>
      </div>
      <div>
        <Label
          title={__("Padding", "brandy")}
          style={{ display: "block", marginBottom: 10 }}
        />
        <Spacing
          value={attributes.card_highlight_badge.padding}
          onChange={handleChangeValue("padding")}
        />
      </div>
      <div>
        <Label
          title={__("Margin", "brandy")}
          style={{ display: "block", marginBottom: 10 }}
        />
        <Spacing
          value={attributes.card_highlight_badge.margin}
          onChange={handleChangeValue("margin")}
        />
      </div>
    </Card>
  );
}
