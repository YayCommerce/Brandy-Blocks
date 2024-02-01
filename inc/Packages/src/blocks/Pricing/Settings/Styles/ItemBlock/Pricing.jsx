import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Spacing from "../../../../../components/Spacing";
import Typography from "../../../../../components/Typography";
import { useContext } from "@wordpress/element";
import { PricingContext } from "../../../edit";
import { __ } from "@wordpress/i18n";
import ButtonGroup from "../../../../../components/ButtonGroup";

import "./Pricing.scss";
import Title from "../../../../../components/Card/Title";

const periodPositionOptions = [
  {
    label: "Super",
    value: "super",
  },
  {
    label: "Bottom",
    value: "bottom",
  },
  {
    label: "Sub",
    value: "sub",
  },
];

export default function Pricing() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const handleChangePriceValue = (key) => (v) => {
    if (key in attributes.card_pricing?.price) {
      setAttributes({
        card_pricing: {
          ...attributes.card_pricing,
          price: {
            ...attributes.card_pricing.price,
            [key]: v,
          },
        },
      });
    }
  };
  const handleChangePeriodValue = (key) => (v) => {
    if (key in attributes.card_pricing?.period) {
      setAttributes({
        card_pricing: {
          ...attributes.card_pricing,
          period: {
            ...attributes.card_pricing.period,
            [key]: v,
          },
        },
      });
    }
  };
  const handleChangeMargin = (v) => {
    setAttributes({
      card_pricing: {
        ...attributes.card_pricing,
        margin: v,
      },
    });
  };
  const handleChangeVisible = () => {
    setAttributes({
      card_pricing: {
        ...attributes.card_pricing,
        visible: !attributes.card_pricing.visible,
      },
    });
  };
  return (
    <Card
      title={
        <Title
          title={__("Pricing", "brandy")}
          visible={attributes.card_pricing.visible}
          onToggleVisible={handleChangeVisible}
        />
      }
    >
      <div className="pricing-group">
        <Label title={__("Price", "brandy")} style={{ marginBottom: 0 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label title={__("Typography", "brandy")} />
          <Typography
            value={attributes.card_pricing.price.typography}
            onChange={handleChangePriceValue("typography")}
          />
        </div>
        <div>
          <Label title={__("Color", "brandy")} />
          <div style={{ display: "flex", gap: 10 }}>
            <ColorPicker
              color={attributes.card_pricing.price.color}
              onChange={handleChangePriceValue("color")}
            />
          </div>
        </div>
      </div>
      <div className="pricing-group">
        <Label title={__("Period", "brandy")} style={{ marginBottom: 0 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label title={__("Typography", "brandy")} />
          <Typography
            value={attributes.card_pricing.period.typography}
            onChange={handleChangePeriodValue("typography")}
          />
        </div>
        <div>
          <Label title={__("Color", "brandy")} />
          <div style={{ display: "flex", gap: 10 }}>
            <ColorPicker
              color={attributes.card_pricing.period.color}
              onChange={handleChangePeriodValue("color")}
            />
          </div>
        </div>
        <div>
          <Label title={__("Position", "brandy")} />
          <ButtonGroup
            options={periodPositionOptions}
            selected={attributes.card_pricing.period.position}
            onChange={handleChangePeriodValue("position")}
          />
        </div>
      </div>
      <div>
        <Label
          title={__("Margin", "brandy")}
          style={{ display: "block", marginBottom: 10 }}
        />
        <Spacing
          value={attributes.card_pricing.margin}
          onChange={handleChangeMargin}
        />
      </div>
    </Card>
  );
}
