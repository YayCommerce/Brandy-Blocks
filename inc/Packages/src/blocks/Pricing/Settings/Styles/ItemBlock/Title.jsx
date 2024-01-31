import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Spacing from "../../../../../components/Spacing";
import Typography from "../../../../../components/Typography";
import { useContext } from "@wordpress/element";
import { PricingContext } from "../../../edit";
import { __ } from "@wordpress/i18n";
import CardTitle from "../../../../../components/Card/Title";

export default function Title() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const handleChangeValue = (key) => (v) => {
    if (key in attributes.card_title) {
      setAttributes({
        card_title: {
          ...attributes.card_title,
          [key]: v,
        },
      });
    }
  };
  return (
    <Card
      title={
        <CardTitle
          title={__("Title", "brandy")}
          visible={attributes.card_title.visible}
          onToggleVisible={() => {
            handleChangeValue("visible")(!attributes.card_title.visible);
          }}
        />
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Label title={__("Typography", "brandy")} style={{ marginBottom: 0 }}/>
        <Typography
          value={attributes.card_title.typography}
          onChange={handleChangeValue("typography")}
        />
      </div>
      <div>
        <Label title={__("Color", "brandy")} />
        <div style={{ display: "flex", gap: 10 }}>
          <ColorPicker
            color={attributes.card_title.color}
            onChange={handleChangeValue("color")}
          />
        </div>
      </div>
      <div>
        <Label title={__("Margin", "brandy")} />
        <Spacing
          value={attributes.card_title.padding}
          onChange={handleChangeValue("padding")}
        />
      </div>
    </Card>
  );
}
