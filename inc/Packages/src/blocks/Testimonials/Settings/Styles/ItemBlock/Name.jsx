import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Spacing from "../../../../../components/Spacing";
import Typography from "../../../../../components/Typography";
import { TestimonialsContext } from "../../../edit";
import Card from "../../../../../components/Card";
import Title from "../../../../../components/Card/Title";

export default function Name() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const handleChangeValue = (key) => (v) => {
    if (key in attributes.name) {
      setAttributes({
        name: {
          ...attributes.name,
          [key]: v,
        },
      });
    }
  };

  const handleToggleVisible = () => {
    setAttributes({
      name: {
        ...attributes.name,
        visible: !attributes.name.visible,
      },
    });
  };

  return (
    <Card
      title={
        <Title
          title={__("Name", "brandy")}
          onToggleVisible={handleToggleVisible}
          visible={attributes.name.visible}
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
          value={attributes.name.typography}
          onChange={handleChangeValue("typography")}
        />
      </div>
      <div>
        <Label title={__("Color", "brandy")} />
        <div>
          <ColorPicker
            color={attributes.name.color}
            onChange={handleChangeValue("color")}
          />
        </div>
      </div>
      <div>
        <Label title={__("Margin", "brandy")} />
        <Spacing
          value={attributes.name.margin}
          onChange={handleChangeValue("margin")}
        />
      </div>
    </Card>
  );
}
