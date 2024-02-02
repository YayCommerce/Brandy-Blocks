import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Card from "../../../../../components/Card";
import Title from "../../../../../components/Card/Title";
import Label from "../../../../../components/Label";
import Slider from "../../../../../components/Slider";
import Spacing from "../../../../../components/Spacing";
import { TestimonialsContext } from "../../../edit";

export default function Avatar() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const handleChangeValue = (key) => (v) => {
    if (key in attributes.avatar) {
      setAttributes({
        avatar: {
          ...attributes.avatar,
          [key]: v,
        },
      });
    }
  };

  const handleToggleVisible = () => {
    setAttributes({
      avatar: {
        ...attributes.avatar,
        visible: !attributes.avatar.visible,
      },
    });
  };

  return (
    <Card
      title={
        <Title
          title={__("Avatar", "brandy")}
          onToggleVisible={handleToggleVisible}
          visible={attributes.avatar.visible}
        />
      }
    >
      <div>
        <Label title={__("Size", "brandy")} />
        <Slider
          value={attributes.avatar.size}
          onChange={handleChangeValue("size")}
          min="20"
          max="200"
        />
      </div>
      <div>
        <Label
          title={__("Border radius", "brandy")}
          style={{ display: "block", marginBottom: 10 }}
        />
        <Spacing
          value={attributes.avatar.border_radius}
          onChange={handleChangeValue("border_radius")}
        />
      </div>
      <div>
        <Label
          title={__("Margin", "brandy")}
          style={{ display: "block", marginBottom: 10 }}
        />
        <Spacing
          value={attributes.avatar.margin}
          onChange={handleChangeValue("margin")}
        />
      </div>
    </Card>
  );
}
