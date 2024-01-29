import { useContext, useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Slider from "../../../../../components/Slider";
import SubLabel from "../../../../../components/SubLabel";
import metadata from "../../../block.json";
import { TestimonialsContext } from "../../../edit";
import "./styles.scss";

export default function Dots() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const size = useMemo(
    () => attributes.dots.size ?? metadata.attributes.dots.default.size,
    [attributes.dots?.size]
  );
  const spacing = useMemo(
    () => attributes.dots.spacing ?? metadata.attributes.dots.default.spacing,
    [attributes.dots?.spacing]
  );

  const active_color = useMemo(
    () =>
      attributes.dots.active_color ??
      metadata.attributes.dots.default.active_color,
    [attributes.dots?.active_color]
  );
  const default_color = useMemo(
    () =>
      attributes.dots.default_color ??
      metadata.attributes.dots.default.default_color,
    [attributes.dots?.default_color]
  );

  const handleChangeSize = (v) => {
    setAttributes({
      dots: {
        ...attributes.dots,
        size: v,
      },
    });
  };
  const handleChangeSpacing = (v) => {
    setAttributes({
      dots: {
        ...attributes.dots,
        spacing: v,
      },
    });
  };

  const handleChangeActiveColor = (v) => {
    setAttributes({
      dots: {
        ...attributes.dots,
        active_color: v,
      },
    });
  };
  const handleChangeDefaultColor = (v) => {
    setAttributes({
      dots: {
        ...attributes.dots,
        default_color: v,
      },
    });
  };

  return (
    <Card title={__("Dots", "brandy")}>
      <div>
        <Label title={__("Dot size", "brandy")} />
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
        <Label title={__("Dot colors", "brandy")} />
        <div className="card-colors-flex">
          <div>
            <SubLabel title={__("Normal", "brandy")} />
            <ColorPicker
              color={default_color}
              onChange={handleChangeDefaultColor}
            />
          </div>
          <div>
            <SubLabel title={__("Active", "brandy")} />
            <ColorPicker
              color={active_color}
              onChange={handleChangeActiveColor}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
