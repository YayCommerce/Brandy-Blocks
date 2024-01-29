import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import { useSelect } from "@wordpress/data";
import {
  useEffect,
  useMemo,
  useState,
  createContext,
} from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Settings from "./Settings";
import metadata from "./block.json";
import { getTypographyVariables } from "../../utils/helpers";

const TEMPLATE = [
  [
    "core/columns",
    {
      className: "brandy-carousel",
    },
    [
      [
        "core/columns",
        {
          className: "testimonials__list",
        },
        [
          [
            "brandy/single-testimonial",
            {
              className: "testimonial-card",
            },
          ],
          [
            "brandy/single-testimonial",
            {
              className: "testimonial-card",
            },
          ],
          [
            "brandy/single-testimonial",
            {
              className: "testimonial-card",
            },
          ],
        ],
      ],
    ],
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
      label: {
        border_radius:
          attributes.label?.border_radius ??
          metadata.attributes.label.default.border_radius,
        type: attributes.label?.type ?? metadata.attributes.label.default.type,
        padding:
          attributes.label?.padding ??
          metadata.attributes.label.default.padding,
        typography:
          attributes.label?.typography ??
          metadata.attributes.label.default.typography,
        color:
          attributes.label?.color ?? metadata.attributes.label.default.color,
        background_color:
          attributes.label?.background_color ??
          metadata.attributes.label.default.background_color,
      },
      content_alignment:
        attributes.content_alignment ?? metadata.attributes.content_alignment,
      title: {
        padding:
          attributes.title?.padding ??
          metadata.attributes.title.default.padding,
        typography:
          attributes.title?.typography ??
          metadata.attributes.title.default.typography,
        color:
          attributes.title?.color ?? metadata.attributes.title.default.color,
      },
      avatar: {
        visible:
          attributes.avatar?.visible ??
          metadata.attributes.avatar.default.visible,
        size:
          attributes.avatar?.size ?? metadata.attributes.avatar.default.size,
        fitting:
          attributes.avatar?.fitting ??
          metadata.attributes.avatar.default.fitting,
        border_radius:
          attributes.avatar?.border_radius ??
          metadata.attributes.avatar.default.border_radius,
      },
      name: {
        visible:
          attributes.name?.visible ?? metadata.attributes.name.default.visible,
        padding:
          attributes.name?.padding ?? metadata.attributes.name.default.padding,
        typography:
          attributes.name?.typography ??
          metadata.attributes.name.default.typography,
        color: attributes.name?.color ?? metadata.attributes.name.default.color,
      },
      subname: {
        visible:
          attributes.subname?.visible ??
          metadata.attributes.subname.default.visible,
        padding:
          attributes.subname?.padding ??
          metadata.attributes.subname.default.padding,
        typography:
          attributes.subname?.typography ??
          metadata.attributes.subname.default.typography,
        color:
          attributes.subname?.color ??
          metadata.attributes.subname.default.color,
      },
      content: {
        visible:
          attributes.content?.visible ??
          metadata.attributes.content.default.visible,
        padding:
          attributes.content?.padding ??
          metadata.attributes.content.default.padding,
        typography:
          attributes.content?.typography ??
          metadata.attributes.content.default.typography,
        color:
          attributes.content?.color ??
          metadata.attributes.content.default.color,
      },
      carousel: {
        transition_speed:
          attributes.carousel?.transition_speed ??
          metadata.attributes.carousel.default.transition_speed,
        autoplay:
          attributes.carousel?.autoplay ??
          metadata.attributes.carousel.default.autoplay,
        infinite_loop:
          attributes.carousel?.infinite_loop ??
          metadata.attributes.carousel.default.infinite_loop,
      },
      item_spacing:
        attributes.item_spacing ?? metadata.attributes.item_spacing.default,
      star: {
        visible:
          attributes.star?.visible ?? metadata.attributes.star.default.visible,
        size: attributes.star?.size ?? metadata.attributes.star.default.size,
        active_color:
          attributes.star?.active_color ??
          metadata.attributes.star.default.active_color,
        default_color:
          attributes.star?.default_color ??
          metadata.attributes.star.default.default_color,
        spacing:
          attributes.star?.spacing ?? metadata.attributes.star.default.spacing,
        padding:
          attributes.star?.padding ?? metadata.attributes.star.default.padding,
      },
      dots: {
        size: attributes.dots?.size ?? metadata.attributes.dots.default.size,
        active_color:
          attributes.dots?.active_color ??
          metadata.attributes.dots.default.active_color,
        default_color:
          attributes.dots?.default_color ??
          metadata.attributes.dots.default.default_color,
        spacing:
          attributes.dots?.spacing ?? metadata.attributes.dots.default.spacing,
      },
      arrow: {
        size: attributes.arrow?.size ?? metadata.attributes.arrow.default.size,
        icon_color:
          attributes.arrow?.icon_color ??
          metadata.attributes.arrow.default.icon_color,
        background_color:
          attributes.arrow?.background_color ??
          metadata.attributes.arrow.default.background_color,
      },
      layout: attributes.layout ?? metadata.attributes.layout.default,
    }),
    [attributes]
  );

  const innerBlocks = useSelect(
    (select) => {
      const { getBlocks } = select("core/block-editor");
      return getBlocks(clientId);
    },
    [clientId]
  );

  const _template =
    innerBlocks.length < 1
      ? TEMPLATE
      : innerBlocks.map((block) => [
          block.name,
          block.attributes,
          (block.innerBlocks ?? []).map((b) => [
            b.name,
            b.attributes,
            (b.innerBlocks ?? []).map((c) => [c.name, c.attributes]),
          ]),
        ]);

  const [template, setTemplate] = useState(_template);

  useEffect(() => {
    setTimeout(() => {
      const newTemplate = [...template];
      while (newTemplate.lastItem.length == 0) {
        newTemplate.pop();
      }
      setTemplate(newTemplate);
    }, 1);
  }, [template.length]);

  function reloadTemplate() {
    setTemplate((t) => [...t, []]);
  }

  useEffect(() => {
    window.addEventListener("reloadTestimonialsTemplate", reloadTemplate);
    return () => {
      window.removeEventListener("reloadTestimonialsTemplate", reloadTemplate);
    };
  }, []);

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
          className="testimonials-wrapper"
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
          label-type={dataAttributes.label.type}
          content-alignment={dataAttributes.content_alignment}
          /**
           * styles
           */
          style={{
            "--carousel-transition-speed":
              dataAttributes.carousel.transition_speed + "ms",

            /** star */
            "--testimonial-star-size": dataAttributes.star.size + "px",
            "--testimonial-star-default-color":
              dataAttributes.star.default_color,
            "--testimonial-star-active-color": dataAttributes.star.active_color,
            "--testimonial-star-spacing": dataAttributes.star.spacing + "px",
            "--testimonial-star-padding": `${dataAttributes.star.padding.top}px ${dataAttributes.star.padding.right}px ${dataAttributes.star.padding.bottom}px ${dataAttributes.star.padding.left}px`,

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

            /** label */
            "--label-border-radius": dataAttributes.label.border_radius + "px",
            "--label-padding": `${dataAttributes.label.padding.top}px ${dataAttributes.label.padding.right}px ${dataAttributes.label.padding.bottom}px ${dataAttributes.label.padding.left}px`,
            "--label-color": dataAttributes.label.color,
            "--label-background-color": dataAttributes.label.background_color,
            ...getTypographyVariables("label", dataAttributes.label.typography),

            /** title */
            "--title-padding": `${dataAttributes.title.padding.top}px ${dataAttributes.title.padding.right}px ${dataAttributes.title.padding.bottom}px ${dataAttributes.title.padding.left}px`,
            "--title-color": dataAttributes.title.color,
            ...getTypographyVariables("title", dataAttributes.title.typography),

            /** avatar */
            "--avatar-border-radius": `${dataAttributes.avatar.border_radius.top}px ${dataAttributes.avatar.border_radius.right}px ${dataAttributes.avatar.border_radius.bottom}px ${dataAttributes.avatar.border_radius.left}px`,
            "--avatar-size": dataAttributes.avatar.size + "px",
            "--avatar-fitting": dataAttributes.avatar.fitting,

            /** name */
            "--name-padding": `${dataAttributes.name.padding.top}px ${dataAttributes.name.padding.right}px ${dataAttributes.name.padding.bottom}px ${dataAttributes.name.padding.left}px`,
            "--name-color": dataAttributes.name.color,
            ...getTypographyVariables("name", dataAttributes.name.typography),

            /** subname */
            "--subname-padding": `${dataAttributes.subname.padding.top}px ${dataAttributes.subname.padding.right}px ${dataAttributes.subname.padding.bottom}px ${dataAttributes.subname.padding.left}px`,
            "--subname-color": dataAttributes.subname.color,
            ...getTypographyVariables(
              "subname",
              dataAttributes.subname.typography
            ),

            /** content */
            "--content-padding": `${dataAttributes.content.padding.top}px ${dataAttributes.content.padding.right}px ${dataAttributes.content.padding.bottom}px ${dataAttributes.content.padding.left}px`,
            "--content-color": dataAttributes.content.color,
            ...getTypographyVariables(
              "content",
              dataAttributes.content.typography
            ),

            ...visibility,
          }}
        >
          <InnerBlocks
            template={template}
            allowedBlocks={["brandy/single-testimonial"]}
            templateLock="all"
          />
        </div>
      </TestimonialsContext.Provider>
    </div>
  );
}
