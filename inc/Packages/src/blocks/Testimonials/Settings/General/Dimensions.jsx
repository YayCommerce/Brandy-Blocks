import { BaseControl } from "@wordpress/components";
import { useContext, useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Slider from "../../../../components/Slider";
import metadata from "../../block.json";
import { TestimonialsContext } from "../../edit";
import Label from "../../../../components/Label";
import SubLabel from "../../../../components/SubLabel";

export default function Dimensions() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const item_spacing = useMemo(
    () => attributes.item_spacing ?? metadata.attributes.item_spacing.default,
    [attributes.item_spacing]
  );

  const handleChangeSpacing = (v) => {
    setAttributes({
      item_spacing: v,
    });
  };

  return (
    <div className="setting-wrapper">
      <Label title={__("Dimensions", "brandy")} style={{ marginBottom: 0 }} />
      <div>
        <SubLabel title={__("Item Spacing", "brandy")} />
        <Slider
          value={item_spacing}
          onChange={handleChangeSpacing}
          min="10"
          max="200"
        />
      </div>
    </div>
  );
}
