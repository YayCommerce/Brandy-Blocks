import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Spacing from "../../../../../components/Spacing";
import Typography from "../../../../../components/Typography";
import { useContext } from "@wordpress/element";
import { PricingContext } from "../../../edit";
import { __ } from "@wordpress/i18n";
import Title from "../../../../../components/Card/Title";

export default function Description() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const handleChangeValue = (key) => (v) => {
    if (key in attributes.card_description) {
      setAttributes({
        card_description: {
          ...attributes.card_description,
          [key]: v,
        },
      });
    }
  };

  const handleChangeVisible = () => {
    handleChangeValue("visible")(!attributes.card_description.visible);
  };
  return (
    <Card
      title={
        <Title
          title={__("Description", "brandy")}
          visible={attributes.card_description.visible}
          onToggleVisible={handleChangeVisible}
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
        <Label title={__("Typography", "brandy")} style={{ marginBottom: 0 }} />
        <Typography
          value={attributes.card_description.typography}
          onChange={handleChangeValue("typography")}
        />
      </div>
      <div>
        <Label title={__("Color", "brandy")} />
        <div style={{ display: "flex", gap: 10 }}>
          <ColorPicker
            color={attributes.card_description.color}
            onChange={handleChangeValue("color")}
          />
        </div>
      </div>
      <div>
        <Label title={__("Padding", "brandy")} />
        <Spacing
          value={attributes.card_description.padding}
          onChange={handleChangeValue("padding")}
        />
      </div>
    </Card>
  );
}
