import { useContext, useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Slider from "../../../../components/Slider";
import metadata from "../../block.json";
import { TestimonialsContext } from "../../edit";

export default function Count() {
  const { attributes, setAttributes, setTemplate } =
    useContext(TestimonialsContext);
  const number_testimonials = useMemo(
    () =>
      attributes.number_testimonials ??
      metadata.attributes.number_testimonials.default,
    [attributes.number_testimonials]
  );

  const handleChangeNumber = (v) => {
    setAttributes({ number_testimonials: v });
    setTemplate((t) => {
      t[0][2][0][2] = Array(v)
        .fill(true)
        .map((_) => [
          "brandy/single-testimonial",
          {
            className: "testimonial-card",
          },
        ]);
      return [...t, []];
    });
  };
  return (
    <div className="setting-wrapper">
      <Slider
        label={__("Testimonial count", "brandy")}
        value={number_testimonials}
        onChange={handleChangeNumber}
        min="1"
        max="15"
      />
    </div>
  );
}
