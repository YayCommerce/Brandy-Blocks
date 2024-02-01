import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import { PricingContext } from "../../../edit";
import SubLabel from "../../../../../components/SubLabel";

export default function BackgroundPadding() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const changeBackground = (key) => (v) => {
    setAttributes({
      highlight_settings: {
        ...attributes.highlight_settings,
        card: {
          ...attributes.highlight_settings.card,
          background_color: {
            ...attributes.highlight_settings.card.background_color,
            [key]: v,
          },
        },
      },
    });
  };
  const changeBorderColor = (key) => (v) => {
    setAttributes({
      highlight_settings: {
        ...attributes.highlight_settings,
        card: {
          ...attributes.highlight_settings.card,
          border_color: {
            ...attributes.highlight_settings.card.border_color,
            [key]: v,
          },
        },
      },
    });
  };
  return (
    <Card title={__("Background & Padding", "brandy")}>
      <div>
        <Label title={__("Background colors", "brandy")} />
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
          className="brandy-editor-group-color"
        >
          <div>
            <SubLabel title={__("Normal", "brandy")} />
            <ColorPicker
              color={attributes.highlight_settings.card.background_color.normal}
              onChange={changeBackground("normal")}
            />
          </div>
          <div>
            <SubLabel title={__("Hover", "brandy")} />
            <ColorPicker
              color={attributes.highlight_settings.card.background_color.hover}
              onChange={changeBackground("hover")}
            />
          </div>
        </div>
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
              color={attributes.highlight_settings.card.border_color.normal}
              onChange={changeBorderColor("normal")}
            />
          </div>
          <div>
            <SubLabel title={__("Hover", "brandy")} />
            <ColorPicker
              color={attributes.highlight_settings.card.border_color.hover}
              onChange={changeBorderColor("hover")}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
