import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import ColorPicker from "../../../../components/ColorPicker";
import Label from "../../../../components/Label";
import Slider from "../../../../components/Slider";
import Spacing from "../../../../components/Spacing";
import { PricingContext } from "../../edit";
import SubLabel from "../../../../components/SubLabel";
import HorizontalAlignment from "../../../../components/HorizontalAlignment";
import Shadow from "../../../../components/Shadow";

const SettingLine = ({ style, children }) => {
  return (
    <div
      style={{
        marginBottom: 20,
        paddingBottom: 20,
        borderBottom: "1px solid #F0F2F4",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default function General() {
  const { attributes, setAttributes } = useContext(PricingContext);
  const handleChangeValue = (key) => (v) => {
    setAttributes({
      general: {
        ...attributes.general,
        [key]: v,
      },
    });
  };
  const handleChangeBackground = (key) => (v) => {
    setAttributes({
      general: {
        ...attributes.general,
        background: {
          ...attributes.general.background,
          [key]: v,
        },
      },
    });
  };
  const handleChangeBorderColor = (key) => (v) => {
    setAttributes({
      general: {
        ...attributes.general,
        border_color: {
          ...attributes.general.border_color,
          [key]: v,
        },
      },
    });
  };
  const handleChangeShadowType = (v) => {
    setAttributes({
      general: {
        ...attributes.general,
        shadow: v,
      },
    });
  };
  return (
    <div
      className="pricing-settings__general"
      style={{ padding: "20px 10px", background: "#ffffff" }}
    >
      <SettingLine>
        <Label title={__("Card content alignment")} />
        <HorizontalAlignment
          selected={attributes.general.horizontal_alignment}
          onChange={handleChangeValue("horizontal_alignment")}
        />
      </SettingLine>
      <SettingLine>
        <Label title={__("Card Backgrounds", "brandy")} />
        <div style={{ display: "flex", gap: 10 }}>
          <div>
            <SubLabel title={__("Normal", "brandy")} />
            <ColorPicker
              color={attributes.general.background.normal}
              onChange={handleChangeBackground("normal")}
            />
          </div>
          <div>
            <SubLabel title={__("Hover", "brandy")} />
            <ColorPicker
              color={attributes.general.background.hover}
              onChange={handleChangeBackground("hover")}
            />
          </div>
        </div>
      </SettingLine>
      <SettingLine>
        <Label title={__("Card Borders", "brandy")} />
        <div style={{ display: "flex", gap: 10 }}>
          <div>
            <SubLabel title={__("Normal", "brandy")} />
            <ColorPicker
              color={attributes.general.border_color.normal}
              onChange={handleChangeBorderColor("normal")}
            />
          </div>
          <div>
            <SubLabel title={__("Hover", "brandy")} />
            <ColorPicker
              color={attributes.general.border_color.hover}
              onChange={handleChangeBorderColor("hover")}
            />
          </div>
        </div>
      </SettingLine>
      <SettingLine>
        <Label title={__("Drop shadow", "brandy")} />
        <Shadow
          selected={attributes.general.shadow.type}
          onChange={handleChangeShadowType}
        />
      </SettingLine>
      <SettingLine
        style={{ marginBottom: 0, borderBottom: 0, paddingBottom: 0 }}
      >
        <Label title={__("Card Dimensions", "brandy")} />
        <div>
          <SubLabel title={__("Spacing", "brandy")} />
          <Slider
            value={attributes.general.spacing}
            onChange={handleChangeValue("spacing")}
            min={10}
            max={100}
          />
        </div>
        <div>
          <SubLabel title={__("Padding", "brandy")} />
          <Spacing
            value={attributes.general.padding}
            onChange={handleChangeValue("padding")}
          />
        </div>
      </SettingLine>
    </div>
  );
}
