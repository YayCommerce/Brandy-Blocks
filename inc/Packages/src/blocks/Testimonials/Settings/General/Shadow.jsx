import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Label from "../../../../components/Label";
import { TestimonialsContext } from "../../edit";
import ShadowComponent from "../../../../components/Shadow";

export default function Shadow() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const handleChangeShadowType = (v) => {
    setAttributes({
      shadow: v,
    });
  };
  return (
    <div className="setting-wrapper">
      <div>
        <Label title={__("Card shadow", "brandy")} />
        <ShadowComponent
          selected={attributes.shadow.type}
          onChange={handleChangeShadowType}
        />
      </div>
    </div>
  );
}
