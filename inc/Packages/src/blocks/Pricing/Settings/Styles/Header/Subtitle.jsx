import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Spacing from "../../../../../components/Spacing";
import Typography from "../../../../../components/Typography";
import { useContext } from "@wordpress/element";
import { PricingContext } from "../../../edit";
import { __ } from "@wordpress/i18n";
import Title from "../../../../../components/Card/Title";

export default function Subtitle() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const handleChangeValue = (key) => (v) => {
    if (key in attributes.subtitle) {
      setAttributes({
        subtitle: {
          ...attributes.subtitle,
          [key]: v,
        },
      });
    }
  };
  return (
    <Card title={<Title title={__("Subtitle", "brandy")} />}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Label title={__("Typography", "brandy")} style={{ marginBottom: 0 }} />
        <Typography
          value={attributes.subtitle.typography}
          onChange={handleChangeValue("typography")}
        />
      </div>
      <div>
        <Label title={__("Color", "brandy")} />
        <div style={{ display: "flex", gap: 10 }}>
          <ColorPicker
            color={attributes.subtitle.color}
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
          value={attributes.subtitle.padding}
          onChange={handleChangeValue("padding")}
        />
      </div>
    </Card>
  );
}
