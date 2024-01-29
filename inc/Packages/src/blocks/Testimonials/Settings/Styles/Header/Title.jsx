import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Spacing from "../../../../../components/Spacing";
import Typography from "../../../../../components/Typography";
import { TestimonialsContext } from "../../../edit";

export default function HeaderTitle() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const handleChangeValue = (key) => (v) => {
    if (key in attributes.title) {
      setAttributes({
        title: {
          ...attributes.title,
          [key]: v,
        },
      });
    }
  };

  return (
    <Card title={__("Title", "brandy")}>
      <div>
        <Label title={__("Color", "brandy")} />
        <div>
          <ColorPicker
            color={attributes.title.color}
            onChange={handleChangeValue("color")}
          />
        </div>
      </div>
      <div>
        <Label title={__("Padding", "brandy")} />
        <Spacing
          value={attributes.title.padding}
          onChange={handleChangeValue("padding")}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Label title={__("Typography", "brandy")} />
        <Typography
          value={attributes.title.typography}
          onChange={handleChangeValue("typography")}
        />
      </div>
    </Card>
  );
}
