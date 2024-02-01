import { __ } from "@wordpress/i18n";
import { useContext, useState } from "@wordpress/element";
import { PricingContext } from "../../../edit";
import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Select from "../../../../../components/Select";
import ButtonGroup from "../../../../../components/ButtonGroup";

const labelStyle = { marginBottom: 10 };
const subLabelStyle = { marginBottom: 10, textTransform: "capitalize" };

export default function CardItemColor() {
  return (
    <Card title={__("Card Item Color", "brandy")}>
      <CardTitle />
      <CardPricing />
      <CardDescription />
      <CardListFeatures />
      <Button />
    </Card>
  );
}

function CardTitle() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const changeTitleColor = (v) => {
    setAttributes({
      highlight_settings: {
        ...attributes.highlight_settings,
        card: {
          ...attributes.highlight_settings.card,
          title_color: v,
        },
      },
    });
  };
  return (
    <div>
      <Label title={__("Card Title", "brandy")} style={labelStyle} />
      <ColorPicker
        color={attributes.highlight_settings.card.title_color}
        onChange={changeTitleColor}
      />
    </div>
  );
}

function CardPricing() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const changePricingValue = (key) => (v) => {
    setAttributes({
      highlight_settings: {
        ...attributes.highlight_settings,
        card: {
          ...attributes.highlight_settings.card,
          [key]: v,
        },
      },
    });
  };
  return (
    <div>
      <Label title={__("Card Pricing", "brandy")} style={labelStyle} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
        }}
        className="brandy-editor-group-color"
      >
        <div>
          <Label title={__("Price", "brandy")} style={subLabelStyle} />
          <ColorPicker
            color={attributes.highlight_settings.card.pricing_price_color}
            onChange={changePricingValue("pricing_price_color")}
          />
        </div>
        <div>
          <Label title={__("Period", "brandy")} style={subLabelStyle} />
          <ColorPicker
            color={attributes.highlight_settings.card.pricing_period_color}
            onChange={changePricingValue("pricing_period_color")}
          />
        </div>
      </div>
    </div>
  );
}

function Button() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const changeButtonType = (v) => {
    setAttributes({
      highlight_settings: {
        ...attributes.highlight_settings,
        card: {
          ...attributes.highlight_settings.card,
          button_type: v,
        },
      },
    });
  };
  const [buttonState, setButtonState] = useState("normal");
  const changeButtonTextColor = (key) => (v) => {
    setAttributes({
      highlight_settings: {
        ...attributes.highlight_settings,
        card: {
          ...attributes.highlight_settings.card,
          button_text_color: {
            ...attributes.highlight_settings.card.button_text_color,
            [key]: v,
          },
        },
      },
    });
  };
  const changeButtonBgColor = (key) => (v) => {
    setAttributes({
      highlight_settings: {
        ...attributes.highlight_settings,
        card: {
          ...attributes.highlight_settings.card,
          button_background_color: {
            ...attributes.highlight_settings.card.button_background_color,
            [key]: v,
          },
        },
      },
    });
  };
  return (
    <div>
      <Label title={__("Card Button", "brandy")} style={labelStyle} />
      <Select
        options={[
          { label: "Fill", value: "fill" },
          { label: "Outline", value: "outline" },
        ]}
        selected={attributes.highlight_settings.card.button_type}
        onChange={changeButtonType}
      />
      <div style={{ marginTop: 10 }}>
        <ButtonGroup
          options={[
            { label: "Normal", value: "normal" },
            { label: "Hover", value: "hover" },
          ]}
          selected={buttonState}
          onChange={setButtonState}
        />
      </div>
      <div className="brandy-editor-group-color" style={{ marginTop: 10 }}>
        <div>
          <Label title={__("Text color", "brandy")} style={subLabelStyle} />
          <ColorPicker
            color={
              attributes.highlight_settings.card.button_text_color[buttonState]
            }
            onChange={changeButtonTextColor(buttonState)}
          />
        </div>
        <div>
          <Label
            title={
              attributes.highlight_settings.card.button_type === "fill"
                ? __("Background color", "brandy")
                : __("Border color", "brandy")
            }
            style={subLabelStyle}
          />
          <ColorPicker
            color={
              attributes.highlight_settings.card.button_background_color[
                buttonState
              ]
            }
            onChange={changeButtonBgColor(buttonState)}
          />
        </div>
      </div>
    </div>
  );
}

function CardDescription() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const changeValue = (v) => {
    setAttributes({
      highlight_settings: {
        ...attributes.highlight_settings,
        card: {
          ...attributes.highlight_settings.card,
          description_color: v,
        },
      },
    });
  };
  return (
    <div>
      <Label title={__("Card description", "brandy")} style={labelStyle} />
      <ColorPicker
        color={attributes.highlight_settings.card.description_color}
        onChange={changeValue}
      />
    </div>
  );
}

function CardListFeatures() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const [status, setStatus] = useState("checked");
  const changeValue = (key) => (v) => {
    setAttributes({
      highlight_settings: {
        ...attributes.highlight_settings,
        card: {
          ...attributes.highlight_settings.card,
          [key]: v,
        },
      },
    });
  };
  return (
    <div>
      <Label title={__("List features", "brandy")} style={labelStyle} />
      <ButtonGroup
        options={[
          { label: "Yes", value: "checked" },
          { label: "No", value: "unchecked" },
        ]}
        selected={status}
        onChange={setStatus}
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
          <Label title={__("Icon", "brandy")} style={subLabelStyle} />
          <ColorPicker
            color={
              attributes.highlight_settings.card[`${status}_feature_icon_color`]
            }
            onChange={changeValue(`${status}_feature_icon_color`)}
          />
        </div>
        <div>
          <Label
            title={__("Background Icon", "brandy")}
            style={subLabelStyle}
          />
          <ColorPicker
            color={
              attributes.highlight_settings.card[
                `${status}_feature_icon_background_color`
              ]
            }
            onChange={changeValue(`${status}_feature_icon_background_color`)}
          />
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <Label title={__("Title", "brandy")} style={subLabelStyle} />
        <ColorPicker
          color={
            attributes.highlight_settings.card[`${status}_feature_title_color`]
          }
          onChange={changeValue(`${status}_feature_title_color`)}
        />
      </div>
    </div>
  );
}
