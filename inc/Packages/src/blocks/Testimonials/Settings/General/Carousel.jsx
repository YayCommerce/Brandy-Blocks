import { BaseControl, ToggleControl } from "@wordpress/components";
import { useContext, useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Slider from "../../../../components/Slider";
import metadata from "../../block.json";
import { TestimonialsContext } from "../../edit";
import Label from "../../../../components/Label";
import SubLabel from "../../../../components/SubLabel";

const flexSwitcher = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default function Carousel() {
  const { attributes, setAttributes } = useContext(TestimonialsContext);

  const transition_speed = useMemo(
    () =>
      attributes.carousel?.transition_speed ??
      metadata.attributes.carousel.default.transition_speed,
    [attributes.carousel?.transition_speed]
  );
  const autoplay = useMemo(
    () =>
      attributes.carousel?.autoplay ??
      metadata.attributes.carousel.default.autoplay,
    [attributes.carousel?.autoplay]
  );

  const infinite_loop = useMemo(
    () =>
      attributes.carousel?.infinite_loop ??
      metadata.attributes.carousel.default.infinite_loop,
    [attributes.carousel?.infinite_loop]
  );

  const handleChangeSpeed = (v) => {
    setAttributes({
      carousel: {
        ...attributes.carousel,
        transition_speed: v,
      },
    });
  };

  const handleChangeAutoplay = (v) => {
    setAttributes({
      carousel: {
        ...attributes.carousel,
        autoplay: v,
      },
    });
  };

  const handleChangeInfiniteLoop = (v) => {
    setAttributes({
      carousel: {
        ...attributes.carousel,
        infinite_loop: v,
      },
    });
  };
  return (
    <div className="setting-wrapper">
      <Label title={__("Carousel", "brandy")} style={{ marginBottom: 0 }} />
      <div>
        <SubLabel title={__("Transition speed (ms)", "brandy")} />
        <Slider
          value={transition_speed}
          onChange={handleChangeSpeed}
          min="100"
          max="2000"
        />
      </div>
      <div style={flexSwitcher}>
        <SubLabel title={__("Autoplay", "brandy")} />
        <ToggleControl checked={autoplay} onChange={handleChangeAutoplay} />
      </div>
      <div style={flexSwitcher}>
        <SubLabel title={__("Infinite loop", "brandy")} />
        <ToggleControl
          checked={infinite_loop}
          onChange={handleChangeInfiniteLoop}
        />
      </div>
    </div>
  );
}
