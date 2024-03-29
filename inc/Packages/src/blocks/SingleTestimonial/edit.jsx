import {
  InnerBlocks,
  InspectorControls,
  RichText,
  useBlockProps,
} from "@wordpress/block-editor";
import { useEffect, useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Slider from "../../components/Slider";

export default function Edit({ attributes, setAttributes, context }) {
  const blockProps = useBlockProps();

  const rating = useMemo(() => attributes.rating, [attributes.rating]);

  useEffect(() => {
    setAttributes({
      context,
    });
  }, [context["brandy/testimonials/layout"]]);

  const handleChangeValue = (key) => (v) => {
    setAttributes({ [key]: v });
  };

  const template = useMemo(
    () => [
      [
        "core/image",
        {
          className: "brandy-testimonials__card__avatar",
          url: attributes.image,
          alt: "testimonial-avatar",
        },
      ],
    ],
    [attributes.image]
  );

  return (
    <div
      {...blockProps}
      className={`${blockProps.className} brandy-testimonials__card`}
      data-rating={rating}
    >
      <InspectorControls key="setting">
        <div className="brandy-editor">
          <div className="setting-wrapper">
            <Slider
              label={__("Rating")}
              value={rating}
              onChange={handleChangeValue("rating")}
              min={0}
              max={5}
            />
          </div>
        </div>
      </InspectorControls>
      {context["brandy/testimonials/layout"].map((item) => (
        <>
          {item === "avatar" && (
            <InnerBlocks template={template} templateLock="all" />
          )}
          {item === "name" && (
            <RichText
              tagName="p"
              value={attributes.name}
              onChange={handleChangeValue("name")}
              className="brandy-testimonials__card__name"
            />
          )}
          {item === "subname" && (
            <RichText
              tagName="p"
              value={attributes.subname}
              onChange={handleChangeValue("subname")}
              className="brandy-testimonials__card__subname"
            />
          )}
          {item === "content" && (
            <RichText
              tagName="p"
              value={attributes.content}
              onChange={handleChangeValue("content")}
              className="brandy-testimonials__card__content"
            />
          )}
          {item === "rating" && <Rating />}
        </>
      ))}
    </div>
  );
}

function Rating({}) {
  return (
    <div className="brandy-testimonials__card__rating">
      {Array(5)
        .fill(true)
        .map((_, index) => (
          <span
            key={index}
            className="brandy-testimonials__card__rating-star"
            dangerouslySetInnerHTML={{
              __html: `<svg width="26" height="24" viewBox="0 0 26 24" fill="" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.4772 0.978145C11.9116 -0.326048 13.8027 -0.326048 14.237 0.978145L16.2775 7.10518C16.4718 7.68843 17.0289 8.08332 17.6574 8.08332H24.2606C25.6661 8.08332 26.2505 9.8381 25.1134 10.6441L19.7714 14.4309C19.2628 14.7913 19.05 15.4303 19.2443 16.0135L21.2848 22.1406C21.7191 23.4448 20.1891 24.5293 19.052 23.7232L13.71 19.9365C13.2014 19.576 12.5128 19.576 12.0043 19.9365L6.66226 23.7232C5.52515 24.5293 3.99519 23.4448 4.42952 22.1406L6.47001 16.0135C6.66425 15.4303 6.45146 14.7913 5.94293 14.4309L0.600871 10.6441C-0.536233 9.8381 0.0481602 8.08332 1.4537 8.08332H8.05685C8.68542 8.08332 9.24251 7.68843 9.43675 7.10518L11.4772 0.978145Z"/>
          </svg>
          `,
            }}
          ></span>
        ))}
    </div>
  );
}
