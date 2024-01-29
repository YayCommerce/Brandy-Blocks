import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import { PricingContext } from "../../../edit";
import SubLabel from "../../../../../components/SubLabel";

export default function BackgroundPadding() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const changeBackground = (v) => {
    setAttributes({
      highlight_price: {
        ...attributes.highlight_price,
        card: {
          ...attributes.highlight_price.card,
          background_color: v,
        },
      },
    });
  };
  const changeBorderColor = (key) => (v) => {
    setAttributes({
      highlight_price: {
        ...attributes.highlight_price,
        card: {
          ...attributes.highlight_price.card,
          border_color: {
            ...attributes.highlight_price.card.border_color,
            [key]: v,
          },
        },
      },
    });
  };
  return (
    <Card title={__("Background & Padding", "brandy")}>
      <div>
        <Label title={__("Background color", "brandy")} />
        <ColorPicker
          color={attributes.highlight_price.card.background_color}
          onChange={changeBackground}
        />
      </div>
      <div>
        <Label title={__("Border colors", "brandy")} />
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
          className="brandy-editor-group-color"
        >
          <div>
            <SubLabel title={__("Normal", "brandy")} />
            <ColorPicker
              color={attributes.highlight_price.card.border_color.normal}
              onChange={changeBorderColor("normal")}
            />
          </div>
          <div>
            <SubLabel title={__("Hover", "brandy")} />
            <ColorPicker
              color={attributes.highlight_price.card.border_color.hover}
              onChange={changeBorderColor("hover")}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
