import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import ButtonGroup from "../../../../../components/ButtonGroup";
import Card from "../../../../../components/Card";
import ColorPicker from "../../../../../components/ColorPicker";
import Label from "../../../../../components/Label";
import Slider from "../../../../../components/Slider";
import Spacing from "../../../../../components/Spacing";
import Typography from "../../../../../components/Typography";
import { TestimonialsContext } from "../../../edit";
import SubLabel from "../../../../../components/SubLabel";

export default function HeaderLabel() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const handleChangeValue = (key) => (v) => {
    if (key in attributes.label) {
      setAttributes({
        label: {
          ...attributes.label,
          [key]: v,
        },
      });
    }
  };

  return (
    <Card title={__("Label", "brandy")}>
      <div>
        <Label title={__("Type", "brandy")} />
        <ButtonGroup
          options={[
            { label: __("Text", "brandy"), value: "text" },
            { label: __("Badge", "brandy"), value: "badge" },
          ]}
          selected={attributes.label.type}
          onChange={handleChangeValue("type")}
        />
      </div>
      {attributes.label.type === "badge" && (
        <div>
          <Label title={__("Around corner", "brandy")} />
          <Slider
            value={attributes.label.border_radius}
            onChange={handleChangeValue("border_radius")}
            min="0"
            max="50"
          />
        </div>
      )}
      <div>
        <Label title={__("Colors", "brandy")} />
        <div style={{ display: "flex", gap: 10 }}>
          <div>
            <SubLabel title={__("Text", "brandy")} />
            <ColorPicker
              color={attributes.label.color}
              onChange={handleChangeValue("color")}
            />
          </div>
          <div>
            <SubLabel title={__("Background", "brandy")} />
            <ColorPicker
              color={attributes.label.background_color}
              onChange={handleChangeValue("background_color")}
            />
          </div>
        </div>
      </div>
      <div>
        <Label title={__("Padding", "brandy")} />
        <Spacing
          value={attributes.label.padding}
          onChange={handleChangeValue("padding")}
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
          value={attributes.label.typography}
          onChange={handleChangeValue("typography")}
        />
      </div>
    </Card>
  );
}
