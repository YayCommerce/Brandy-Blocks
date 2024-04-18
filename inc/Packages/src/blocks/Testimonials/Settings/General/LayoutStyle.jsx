import { useContext } from "@wordpress/element";
import { SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import { TestimonialsContext } from "../../edit";

const styleOptions = [
  {
    label: "Vertical",
    value: "vertical",
  },
  {
    label: "Horizontal",
    value: "horizontal",
  }
];

export default function LayoutStyle() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);
  const handleChangeLayoutStyle = (style) => {
    setAttributes({
        layout_style: style,
    });
  };
  console.log(attributes)
  return (
    <div className="setting-wrapper">
      <div>
        <SelectControl
            label={ __( 'Select layout Style' ) }
            value={ attributes.layout_style }
            onChange={ handleChangeLayoutStyle }
            options={ styleOptions }
        />
      </div>
    </div>
  );
}
