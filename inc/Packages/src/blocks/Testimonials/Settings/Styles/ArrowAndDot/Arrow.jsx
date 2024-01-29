import { useContext, useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Slider from "../../../../../components/Slider";
import SubLabel from "../../../../../components/SubLabel";
import metadata from "../../../block.json";
import { TestimonialsContext } from "../../../edit";

export default function Arrow() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const size = useMemo(
    () => attributes.arrow.size ?? metadata.attributes.arrow.default.size,
    [attributes.arrow?.size]
  );

  const icon_color = useMemo(
    () =>
      attributes.arrow.icon_color ??
      metadata.attributes.arrow.default.icon_color,
    [attributes.arrow?.icon_color]
  );
  const background_color = useMemo(
    () =>
      attributes.arrow.background_color ??
      metadata.attributes.arrow.default.background_color,
    [attributes.arrow?.background_color]
  );

  const handleChangeSize = (v) => {
    setAttributes({
      arrow: {
        ...attributes.arrow,
        size: v,
      },
    });
  };

  const handleChangeIconColor = (v) => {
    setAttributes({
      arrow: {
        ...attributes.arrow,
        icon_color: v,
      },
    });
  };
  const handleChangeBackgroundColor = (v) => {
    setAttributes({
      arrow: {
        ...attributes.arrow,
        background_color: v,
      },
    });
  };

  return (
    <Card title={__("Arrow", "brandy")}>
      <div>
        <Label title={__("Size", "brandy")} />
        <Slider value={size} onChange={handleChangeSize} min="30" max="70" />
      </div>
      <div>
        <Label title={__("Colors", "brandy")} />
        <div className="card-colors-flex">
          <div>
            <SubLabel title={__("Icon", "brandy")} />
            <ColorPicker color={icon_color} onChange={handleChangeIconColor} />
          </div>
          <div>
            <SubLabel title={__("Background", "brandy")} />
            <ColorPicker
              color={background_color}
              onChange={handleChangeBackgroundColor}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
