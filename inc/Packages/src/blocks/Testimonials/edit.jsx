import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import { createContext, useMemo, useState } from "@wordpress/element";
import {
  getPaddingValue,
  getShadowValue,
  getTypographyVariables,
} from "../../utils/helpers";
import Settings from "./Settings";
import metadata from "./block.json";

const TEMPLATE = [
  [
    "brandy/single-testimonial",
    {
      id: Date.now(),
      name: "William Hallen",
      subname: "CEO",
      content:
        "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled. That produces no resultant pleasure.",
      rating: 5,
      image:
        "https://thien.ninjateam.org/wp-content/uploads/2024/01/slide2-human-1-1.png",
    },
  ],
  [
    "brandy/single-testimonial",
    {
      id: Date.now(),
      name: "Anthony Nguyen",
      subname: "Customer feedback at Google Reviews",
      content:
        "Making a type specimen book, also the leap into electronic typesetting, remain essentially unchanged or avoids pleasure itself the master builder of amet lorem ipsum human happiness.",
      rating: 5,
      image:
        "https://thien.ninjateam.org/wp-content/uploads/2024/01/slide3-pic1-1-1.png",
    },
  ],
  [
    "brandy/single-testimonial",
    {
      id: Date.now(),
      name: "William Hallen",
      subname: "CEO",
      content:
        "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled. That produces no resultant pleasure.",
      rating: 5,
      image:
        "https://thien.ninjateam.org/wp-content/uploads/2024/01/01-12-1-1.png",
    },
  ],
];

export const TestimonialsContext = createContext({});

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();

  const dataAttributes = useMemo(
    () => ({
      number_testimonials:
        attributes.number_testimonials ??
        metadata.attributes.number_testimonials.default,
      shadow: attributes.shadow ?? metadata.attributes.shadow.default,
      content_alignment:
        attributes.content_alignment ?? metadata.attributes.content_alignment,
      avatar: attributes.avatar ?? metadata.attributes.avatar,
      name: attributes.name ?? metadata.attributes.name,
      subname: attributes.subname ?? metadata.attributes.subname,
      content: attributes.content ?? metadata.attributes.content.default,
      carousel: attributes.carousel ?? metadata.attributes.carousel,
      item_spacing:
        attributes.item_spacing ?? metadata.attributes.item_spacing.default,
      star: attributes.star ?? metadata.attributes.star,
      dots: attributes.dots ?? metadata.attributes.dots,
      arrow: attributes.arrow ?? metadata.attributes.arrow,
      layout: attributes.layout ?? metadata.attributes.layout.default,
    }),
    [attributes]
  );

  const [template, setTemplate] = useState(TEMPLATE);

  const contextValue = useMemo(
    () => ({
      attributes: dataAttributes,
      setAttributes,
      clientId,
      setTemplate,
      template,
    }),
    [dataAttributes, setAttributes, clientId, setTemplate, template]
  );

  const visibility = {
    "--avatar-visible": dataAttributes.avatar.visible ? "block" : "none",
    "--name-visible": dataAttributes.name.visible ? "block" : "none",
    "--subname-visible": dataAttributes.subname.visible ? "block" : "none",
    "--content-visible": dataAttributes.content.visible ? "block" : "none",
    "--rating-visible": dataAttributes.star.visible ? "flex" : "none",
  };

  return (
    <div {...blockProps}>
      <TestimonialsContext.Provider value={contextValue}>
        <Settings />
        <div
          className="brandy-testimonials-wrapper"
          /**
           * General
           */
          number-testimonials={dataAttributes.number_testimonials}
          auto-play={dataAttributes.carousel.autoplay.toString()}
          // pause-on-hover={dataAttributes.carousel.pause_on_hover.toString()}
          infinite-loop={dataAttributes.carousel.infinite_loop.toString()}
          item-spacing={dataAttributes.item_spacing}
          layout={dataAttributes.layout}
          /**
           * label
           */
          content-alignment={dataAttributes.content_alignment}
          /**
           * styles
           */
          style={{
            "--carousel-transition-speed":
              dataAttributes.carousel.transition_speed + "ms",

            "--card-shadow": getShadowValue(dataAttributes.shadow),

            /** star */
            "--testimonial-star-size": dataAttributes.star.size + "px",
            "--testimonial-star-default-color":
              dataAttributes.star.default_color,
            "--testimonial-star-active-color": dataAttributes.star.active_color,
            "--testimonial-star-spacing": dataAttributes.star.spacing + "px",
            "--testimonial-star-margin": getPaddingValue(
              dataAttributes.star.margin
            ),

            "--carousel-item-spacing": dataAttributes.item_spacing + "px",
            /** carousel dot */
            "--carousel-dot-size": dataAttributes.dots.size + "px",
            "--carousel-dot-spacing": dataAttributes.dots.spacing + "px",
            "--carousel-dot-default-color": dataAttributes.dots.default_color,
            "--carousel-dot-active-color": dataAttributes.dots.active_color,

            /** carousel arrow */
            "--carousel-arrow-size": dataAttributes.arrow.size + "px",
            "--carousel-arrow-icon-color": dataAttributes.arrow.icon_color,
            "--carousel-arrow-background-color":
              dataAttributes.arrow.background_color,

            /** avatar */
            "--avatar-border-radius": `${dataAttributes.avatar.border_radius.top}px ${dataAttributes.avatar.border_radius.right}px ${dataAttributes.avatar.border_radius.bottom}px ${dataAttributes.avatar.border_radius.left}px`,
            "--avatar-size": dataAttributes.avatar.size + "px",
            "--avatar-fitting": dataAttributes.avatar.fitting,
            "--avatar-margin": getPaddingValue(dataAttributes.avatar.margin),

            /** name */
            "--name-margin": getPaddingValue(dataAttributes.name.margin),
            "--name-color": dataAttributes.name.color,
            ...getTypographyVariables("name", dataAttributes.name.typography),

            /** subname */
            "--subname-margin": getPaddingValue(dataAttributes.subname.margin),
            "--subname-color": dataAttributes.subname.color,
            ...getTypographyVariables(
              "subname",
              dataAttributes.subname.typography
            ),

            /** content */
            "--content-margin": getPaddingValue(dataAttributes.content.margin),
            "--content-color": dataAttributes.content.color,
            ...getTypographyVariables(
              "content",
              dataAttributes.content.typography
            ),

            ...visibility,
          }}
        >
          <div className="brandy-testimonials-carousel">
            <span class="forward-arrow carousel-arrow" data-slide="forward">
              {leftArrow}
            </span>
            <div className="brandy-testimonials__list">
              <InnerBlocks
                template={template}
                allowedBlocks={["brandy/single-testimonial"]}
                templateLock="all"
              />
            </div>
            <span class="backward-arrow carousel-arrow" data-slide="backward">
              {rightArrow}
            </span>
          </div>
        </div>
      </TestimonialsContext.Provider>
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
