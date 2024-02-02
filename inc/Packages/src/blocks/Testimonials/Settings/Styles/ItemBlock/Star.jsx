import { useContext, useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Card from "../../../../../components/Card";
import Title from "../../../../../components/Card/Title";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Slider from "../../../../../components/Slider";
import Spacing from "../../../../../components/Spacing";
import SubLabel from "../../../../../components/SubLabel";
import { TestimonialsContext } from "../../../edit";

export default function Star() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const size = useMemo(
    () => attributes.star.size ?? metadata.attributes.star.default.size,
    [attributes.star?.size]
  );
  const spacing = useMemo(
    () => attributes.star.spacing ?? metadata.attributes.star.default.spacing,
    [attributes.star?.spacing]
  );

  const active_color = useMemo(
    () =>
      attributes.star.active_color ??
      metadata.attributes.star.default.active_color,
    [attributes.star?.active_color]
  );
  const default_color = useMemo(
    () =>
      attributes.star.default_color ??
      metadata.attributes.star.default.default_color,
    [attributes.star?.default_color]
  );

  const handleChangeSize = (v) => {
    setAttributes({
      star: {
        ...attributes.star,
        size: v,
      },
    });
  };
  const handleChangeSpacing = (v) => {
    setAttributes({
      star: {
        ...attributes.star,
        spacing: v,
      },
    });
  };
  const handleChangeMargin = (v) => {
    setAttributes({
      star: {
        ...attributes.star,
        margin: v,
      },
    });
  };

  const handleChangeActiveColor = (v) => {
    setAttributes({
      star: {
        ...attributes.star,
        active_color: v,
      },
    });
  };
  const handleChangeDefaultColor = (v) => {
    setAttributes({
      star: {
        ...attributes.star,
        default_color: v,
      },
    });
  };

  const handleToggleVisible = () => {
    setAttributes({
      star: {
        ...attributes.star,
        visible: !attributes.star.visible,
      },
    });
  };

  return (
    <Card
      title={
        <Title
          title={__("Rating", "brandy")}
          onToggleVisible={handleToggleVisible}
          visible={attributes.star.visible}
        />
      }
    >
      <div>
        <Label title={__("Star size", "brandy")} />
        <Slider value={size} onChange={handleChangeSize} min="10" max="70" />
      </div>
      <div>
        <Label title={__("Spacing", "brandy")} />
        <Slider
          value={spacing}
          onChange={handleChangeSpacing}
          min="5"
          max="100"
        />
      </div>
      <div>
        <Label
          title={__("Star colors", "brandy")}
          style={{ marginBottom: 10 }}
        />
        <div style={{ display: "flex", gap: 15 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <SubLabel title={__("Normal", "brandy")} />
            <ColorPicker
              color={default_color}
              onChange={handleChangeDefaultColor}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <SubLabel title={__("Active", "brandy")} />
            <ColorPicker
              color={active_color}
              onChange={handleChangeActiveColor}
            />
          </div>
        </div>
      </div>
      <div>
        <Label
          title={__("Margin", "brandy")}
          style={{ display: "block", marginBottom: 10 }}
        />
        <Spacing value={attributes.star.margin} onChange={handleChangeMargin} />
      </div>
    </Card>
  );
}
