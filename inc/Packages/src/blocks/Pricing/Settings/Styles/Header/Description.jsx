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
    if (key in attributes.description) {
      setAttributes({
        description: {
          ...attributes.description,
          [key]: v,
        },
      });
    }
  };
  return (
    <Card title={<Title title={__("Description", "brandy")} />}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Label title={__("Typography", "brandy")} />
        <Typography
          value={attributes.description.typography}
          onChange={handleChangeValue("typography")}
        />
      </div>
      <div>
        <Label title={__("Color", "brandy")} style={{ marginBottom: 10 }} />
        <div style={{ display: "flex", gap: 10 }}>
          <ColorPicker
            color={attributes.description.color}
            onChange={handleChangeValue("color")}
          />
        </div>
      </div>
      <div>
        <Label
          title={__("Padding", "brandy")}
          style={{ display: "block", marginBottom: 10 }}
        />
        <Spacing
          value={attributes.description.padding}
          onChange={handleChangeValue("padding")}
        />
      </div>
    </Card>
  );
}
