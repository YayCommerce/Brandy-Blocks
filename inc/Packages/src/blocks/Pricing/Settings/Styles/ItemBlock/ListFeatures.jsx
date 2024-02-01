import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import { PricingContext } from "../../../edit";
import ButtonGroup from "../../../../../components/ButtonGroup";
import Label from "../../../../../components/Label";
import Typography from "../../../../../components/Typography";
import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Title from "../../../../../components/Card/Title";
import Slider from "../../../../../components/Slider";

export default function ListFeatures() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const [status, setStatus] = useState("checked");
  const handleChangeValue = (key) => (v) => {
    setAttributes({
      card_features: {
        ...attributes.card_features,
        [status]: {
          ...attributes.card_features[status],
          [key]: v,
        },
      },
    });
  };

  const handleChangeVisible = () => {
    setAttributes({
      card_features: {
        ...attributes.card_features,
        visible: !attributes.card_features.visible,
      },
    });
  };

  const handleChangeItemSpacing = (v) => {
    setAttributes({
      card_features: {
        ...attributes.card_features,
        item_spacing: v,
      },
    });
  };

  return (
    <Card
      title={
        <Title
          title={__("List features", "brandy")}
          visible={attributes.card_features.visible}
          onToggleVisible={handleChangeVisible}
        />
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <ButtonGroup
          options={[
            { label: "Checked", value: "checked" },
            { label: "Unchecked", value: "unchecked" },
          ]}
          selected={status}
          onChange={setStatus}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label
            title={__("Typography", "brandy")}
            style={{ marginBottom: 0 }}
          />
          <Typography
            value={attributes.card_features[status].typography}
            onChange={handleChangeValue("typography")}
          />
        </div>
        <div>
          <Label
            title={__("Title", "brandy")}
            style={{ textTransform: "capitalize" }}
          />
          <ColorPicker
            color={attributes.card_features[status].title_color}
            onChange={handleChangeValue("title_color")}
          />
        </div>
        <div
          className="brandy-editor-group-color"
          style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
        >
          <div>
            <Label
              title={__("Icon", "brandy")}
              style={{ textTransform: "capitalize" }}
            />
            <ColorPicker
              color={attributes.card_features[status].icon_color}
              onChange={handleChangeValue("icon_color")}
            />
          </div>
          <div>
            <Label
              title={__("Background icon", "brandy")}
              style={{ textTransform: "capitalize" }}
            />
            <ColorPicker
              color={attributes.card_features[status].icon_background_color}
              onChange={handleChangeValue("icon_background_color")}
            />
          </div>
        </div>
        <div style={{ borderTop: "1px solid #F0F2F4", paddingTop: 20 }}>
          <Label title={__("Item spacing")} />
          <Slider
            value={attributes.card_features.item_spacing}
            onChange={handleChangeItemSpacing}
          />
        </div>
      </div>
    </Card>
  );
}
