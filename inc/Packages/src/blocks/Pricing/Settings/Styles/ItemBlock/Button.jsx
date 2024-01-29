import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Spacing from "../../../../../components/Spacing";
import Typography from "../../../../../components/Typography";
import { PricingContext } from "../../../edit";
import ButtonGroup from "../../../../../components/ButtonGroup";
import Select from "../../../../../components/Select";
import Title from "../../../../../components/Card/Title";
import SubLabel from "../../../../../components/SubLabel";

const widthOptions = [
  {
    label: "25%",
    value: 25,
  },
  {
    label: "50%",
    value: 50,
  },
  {
    label: "75%",
    value: 75,
  },
  {
    label: "100%",
    value: 100,
  },
];

export default function Button() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const [buttonState, setButtonState] = useState("normal");
  const handleChangeValue = (key) => (v) => {
    if (key in attributes.card_button) {
      setAttributes({
        card_button: {
          ...attributes.card_button,
          [key]: v,
        },
      });
    }
  };
  const handleChangeColor = (key) => (v) => {
    setAttributes({
      card_button: {
        ...attributes.card_button,
        color: {
          ...attributes.card_button.color,
          [key]: v,
        },
      },
    });
  };
  const handleChangeBackgroundColor = (key) => (v) => {
    setAttributes({
      card_button: {
        ...attributes.card_button,
        background_color: {
          ...attributes.card_button.background_color,
          [key]: v,
        },
      },
    });
  };
  const handleChangeVisible = () => {
    handleChangeValue("visible")(!attributes.card_button.visible);
  };
  return (
    <Card
      title={
        <Title
          title={__("Button", "brandy")}
          visible={attributes.card_button.visible}
          onToggleVisible={handleChangeVisible}
        />
      }
    >
      <div>
        <Label
          title={__("Button type", "brandy")}
          style={{ marginBottom: 10 }}
        />
        <Select
          options={[
            {
              label: "Fill",
              value: "fill",
            },
            {
              label: "Outline",
              value: "outline",
            },
          ]}
          selected={attributes.card_button.type}
          onChange={handleChangeValue("type")}
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
          value={attributes.card_button.typography}
          onChange={handleChangeValue("typography")}
        />
      </div>
      <div>
        <ButtonGroup
          options={[
            { label: "Normal", value: "normal" },
            { label: "Hover", value: "hover" },
          ]}
          selected={buttonState}
          onChange={setButtonState}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 10,
          }}
          className="brandy-editor-group-color"
        >
          <div>
            <SubLabel
              title={__("Text Color", "brandy")}
              style={{ marginBottom: 10 }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <ColorPicker
                color={attributes.card_button.color[buttonState]}
                onChange={handleChangeColor(buttonState)}
              />
            </div>
          </div>
          <div>
            <SubLabel
              title={
                attributes.card_button.type === "fill"
                  ? __("Background Color", "brandy")
                  : __("Border Color", "brandy")
              }
              style={{ marginBottom: 10 }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <ColorPicker
                color={attributes.card_button.background_color[buttonState]}
                onChange={handleChangeBackgroundColor(buttonState)}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label
          title={__("Width", "brandy")}
          style={{ display: "block", marginBottom: 10 }}
        />
        <ButtonGroup
          options={widthOptions}
          selected={attributes.card_button.width}
          onChange={handleChangeValue("width")}
        />
      </div>
      <div>
        <Label
          title={__("Border radius", "brandy")}
          style={{ display: "block", marginBottom: 10 }}
        />
        <Spacing
          value={attributes.card_button.border_radius}
          onChange={handleChangeValue("border_radius")}
        />
      </div>
      <div>
        <Label
          title={__("Padding", "brandy")}
          style={{ display: "block", marginBottom: 10 }}
        />
        <Spacing
          value={attributes.card_button.padding}
          onChange={handleChangeValue("padding")}
        />
      </div>
    </Card>
  );
}
