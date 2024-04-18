import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import {
  getPaddingValue,
  getShadowValue,
  getTypographyVariables,
} from "../../utils/helpers";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  console.log({attributes})
  const visibility = {
    "--avatar-visible": attributes.avatar.visible ? "block" : "none",
    "--name-visible": attributes.name.visible ? "block" : "none",
    "--subname-visible": attributes.subname.visible ? "block" : "none",
    "--content-visible": attributes.content.visible ? "block" : "none",
    "--rating-visible": attributes.star.visible ? "flex" : "none",
  };
  const wrapperClass = `brandy-testimonials-wrapper brandy-${attributes.layout_style}-wrapper`;
  return (
    <div {...blockProps}>
      <div
        className={wrapperClass}
        /**
         * General
         */
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
         * styles
         */
        style={{
          "--carousel-transition-speed":
            attributes.carousel.transition_speed + "ms",

          "--card-shadow": getShadowValue(attributes.shadow),

          /** star */
          "--testimonial-star-size": attributes.star.size + "px",
          "--testimonial-star-default-color": attributes.star.default_color,
          "--testimonial-star-active-color": attributes.star.active_color,
          "--testimonial-star-spacing": attributes.star.spacing + "px",
          "--testimonial-star-margin": getPaddingValue(attributes.star.margin),

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
          "--avatar-margin": getPaddingValue(attributes.avatar.margin),

          /** name */
          "--name-margin": getPaddingValue(attributes.name.margin),
          "--name-color": attributes.name.color,
          ...getTypographyVariables("name", attributes.name.typography),

          /** subname */
          "--subname-margin": getPaddingValue(attributes.subname.margin),
          "--subname-color": attributes.subname.color,
          ...getTypographyVariables("subname", attributes.subname.typography),

          /** content */
          "--content-margin": getPaddingValue(attributes.content.margin),
          "--content-color": attributes.content.color,
          ...getTypographyVariables("content", attributes.content.typography),

          ...visibility,
        }}
      >
        <div className="brandy-testimonials-carousel">
          <span class="forward-arrow carousel-arrow" data-slide="forward">
            {leftArrow}
          </span>
          <div className="brandy-testimonials__list">
            <InnerBlocks.Content />
          </div>
          <span class="backward-arrow carousel-arrow" data-slide="backward">
            {rightArrow}
          </span>
        </div>
      </div>
    </div>
  );
}

const leftArrow = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.5549 5.99554L16.0135 12L10.5549 18.0045L9.44495 16.9955L13.9863 12L9.44495 7.00456L10.5549 5.99554Z"
      fill="#1E1E1E"
    />
  </svg>
);
const rightArrow = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.4451 18.0045L7.98645 12L13.4451 5.99548L14.555 7.00449L10.0136 12L14.555 16.9955L13.4451 18.0045Z"
      fill="#1E1E1E"
    />
  </svg>
);
