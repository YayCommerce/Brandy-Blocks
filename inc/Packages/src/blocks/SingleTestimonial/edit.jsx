import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { useEffect, useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Slider from "../../components/Slider";

const TESTOMONIAL_TEMPLATE = [
  [
    "core/image",
    {
      className: "testimonial__avatar",
      url: "https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA",
      alt: "testimonial__avatar",
    },
  ],
  [
    "core/paragraph",
    {
      placeholder: __("Name", "brandy"),
      content: "Anthony Nguyen",
      className: "testmainname",
    },
  ],
  [
    "core/paragraph",
    {
      placeholder: __("Sub name", "brandy"),
      content: "Via from Google",
      className: "testimonial__subname",
    },
  ],
  [
    "core/paragraph",
    {
      placeholder: __("Testimonials heading", "brandy"),
      content:
        "Making a type specimen book, also the leap into electronic typesetting, remain essentially unchanged or avoids amet pleasure itself the master builder of lorem human happiness.",
      className: "testimonial__content",
    },
  ],
  ["brandy/testimonial-rating"],
];

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();

  const rating = useMemo(() => attributes.rating, [attributes.rating]);

  const handleChangeRating = (v) => {
    setAttributes({ rating: v });
  };

  const innerBlocks = useSelect(
    (select) => {
      const { getBlocks } = select("core/block-editor");
      return getBlocks(clientId);
    },
    [clientId]
  );

  const _template =
    innerBlocks.length < 1
      ? TESTOMONIAL_TEMPLATE
      : innerBlocks.map((block) => [block.name, block.attributes]);

  useEffect(() => {
    function changeLayout(e) {
      const newLayout = e.detail?.layout ?? [
        "avatar",
        "name",
        "subname",
        "content",
        "rating",
      ];
      const newTemplate = newLayout.map((l) => {
        if (l === "avatar") {
          return innerBlocks.find((t) => t.name === "core/image");
        }
        if (l === "rating") {
          return innerBlocks.find(
            (t) => t.name === "brandy/testimonial-rating"
          );
        }
        if (l === "name") {
          return innerBlocks.find(
            (t) => t.attributes.className === "testmainname"
          );
        }
        if (l === "subname") {
          return innerBlocks.find(
            (t) => t.attributes.className === "testimonial__subname"
          );
        }
        if (l === "content") {
          return innerBlocks.find(
            (t) => t.attributes.className === "testimonial__content"
          );
        }
        return [];
      });
      innerBlocks[0] = newTemplate[0];
      innerBlocks[1] = newTemplate[1];
      innerBlocks[2] = newTemplate[2];
      innerBlocks[3] = newTemplate[3];
      innerBlocks[4] = newTemplate[4];
      const newEvent = new CustomEvent("reloadTestimonialsTemplate");
      window.dispatchEvent(newEvent);
    }
    window.addEventListener("changeTestimonialLayout", changeLayout);

    return () => {
      window.removeEventListener("changeTestimonialLayout", changeLayout);
    };
  }, [innerBlocks]);

  return (
    <div {...blockProps} rating={attributes.rating}>
      <InspectorControls key="setting">
        <div className="brandy-editor">
          <div className="setting-wrapper">
            <Slider
              label={__("Rating")}
              value={rating}
              onChange={handleChangeRating}
              min={0}
              max={5}
            />
          </div>
        </div>
      </InspectorControls>
      <InnerBlocks template={_template} templateLock="all" />
    </div>
  );
}
