import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import HorizontalAlignment from "../../../../components/HorizontalAlignment";
import Label from "../../../../components/Label";
import { TestimonialsContext } from "../../edit";

export default function ContentAlignment() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);
  const handleChangeAlignment = (v) => {
    setAttributes({
      content_alignment: v,
    });
  };
  return (
    <div className="setting-wrapper">
      <div>
        <Label title={__("Content alignment", "brandy")} />
        <HorizontalAlignment
          selected={attributes.content_alignment}
          onChange={handleChangeAlignment}
        />
      </div>
    </div>
  );
}
