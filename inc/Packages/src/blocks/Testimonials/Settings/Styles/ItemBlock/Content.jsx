import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Spacing from "../../../../../components/Spacing";
import Typography from "../../../../../components/Typography";
import { TestimonialsContext } from "../../../edit";
import Title from "../../../../../components/Card/Title";

export default function Content() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const handleChangeValue = (key) => (v) => {
    if (key in attributes.content) {
      setAttributes({
        content: {
          ...attributes.content,
          [key]: v,
        },
      });
    }
  };

  const handleToggleVisible = () => {
    setAttributes({
      content: {
        ...attributes.content,
        visible: !attributes.content.visible,
      },
    });
  };

  return (
    <Card
      title={
        <Title
          title={__("Content", "brandy")}
          onToggleVisible={handleToggleVisible}
          visible={attributes.content.visible}
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
          value={attributes.content.typography}
          onChange={handleChangeValue("typography")}
        />
      </div>
      <div>
        <Label title={__("Color", "brandy")} />
        <div>
          <ColorPicker
            color={attributes.content.color}
            onChange={handleChangeValue("color")}
          />
        </div>
      </div>
      <div>
        <Label title={__("Padding", "brandy")} />
        <Spacing
          value={attributes.content.padding}
          onChange={handleChangeValue("padding")}
        />
      </div>
    </Card>
  );
}
