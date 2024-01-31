import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { getTypographyVariables } from "../../utils/helpers";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();

  const visibility = {
    "--avatar-visible": attributes.avatar.visible ? "block" : "none",
    "--name-visible": attributes.name.visible ? "block" : "none",
    "--subname-visible": attributes.subname.visible ? "block" : "none",
    "--content-visible": attributes.content.visible ? "block" : "none",
    "--rating-visible": attributes.star.visible ? "flex" : "none",
  };

  return (
    <div {...blockProps}>
      <div
        className="testimonials-wrapper"
        /** general */
        number-testimonials={attributes.number_testimonials}
        auto-play={attributes.carousel.autoplay.toString()}
        // pause-on-hover={attributes.carousel.pause_on_hover.toString()}
        infinite-loop={attributes.carousel.infinite_loop.toString()}
        item-spacing={attributes.item_spacing}
        layout={attributes.layout}
        /**
         * label
         */
        content-alignment={attributes.content_alignment}
        /**
         * Styles
         */
        style={{
          "--carousel-transition-speed":
            attributes.carousel.transition_speed + "ms",

          /** star */
          "--testimonial-star-size": attributes.star.size + "px",
          "--testimonial-star-default-color": attributes.star.default_color,
          "--testimonial-star-active-color": attributes.star.active_color,
          "--testimonial-star-spacing": attributes.star.spacing + "px",
          "--testimonial-star-padding": `${attributes.star.padding.top}px ${attributes.star.padding.right}px ${attributes.star.padding.bottom}px ${attributes.star.padding.left}px`,

          "--carousel-item-spacing": attributes.item_spacing + "px",
          /** carousel dot */
          "--carousel-dot-size": attributes.dots.size + "px",
          "--carousel-dot-spacing": attributes.dots.spacing + "px",
          "--carousel-dot-default-color": attributes.dots.default_color,
          "--carousel-dot-active-color": attributes.dots.active_color,

          /** carousel arrow */
          "--carousel-arrow-size": attributes.arrow.size + "px",
          "--carousel-arrow-icon-color": attributes.arrow.icon_color,
          "--carousel-arrow-background-color":
            attributes.arrow.background_color,

          /** avatar */
          "--avatar-border-radius": `${attributes.avatar.border_radius.top}px ${attributes.avatar.border_radius.right}px ${attributes.avatar.border_radius.bottom}px ${attributes.avatar.border_radius.left}px`,
          "--avatar-size": attributes.avatar.size + "px",
          "--avatar-fitting": attributes.avatar.fitting,

          /** name */
          "--name-padding": `${attributes.name.padding.top}px ${attributes.name.padding.right}px ${attributes.name.padding.bottom}px ${attributes.name.padding.left}px`,
          "--name-color": attributes.name.color,
          ...getTypographyVariables("name", attributes.name.typography),

          /** subname */
          "--subname-padding": `${attributes.subname.padding.top}px ${attributes.subname.padding.right}px ${attributes.subname.padding.bottom}px ${attributes.subname.padding.left}px`,
          "--subname-color": attributes.subname.color,
          ...getTypographyVariables("subname", attributes.subname.typography),

          /** content */
          "--content-padding": `${attributes.content.padding.top}px ${attributes.content.padding.right}px ${attributes.content.padding.bottom}px ${attributes.content.padding.left}px`,
          "--content-color": attributes.content.color,
          ...getTypographyVariables("content", attributes.content.typography),

          ...visibility,
        }}
      >
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
