import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useMemo, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

export default function Edit({ attributes, context, setAttributes }) {
  const blockProps = useBlockProps();
  useEffect(() => {
    setAttributes({
      context,
    });
  }, [
    context["brandy/pricing-card/icon_enabled"],
    context["brandy/pricing-card/features"],
  ]);
  const dataAttributes = useMemo(() => attributes, [attributes]);
  const isIconEnabled = context["brandy/pricing-card/icon_enabled"];
  const features = context["brandy/pricing-card/features"];
  const currentFeature = features[attributes.position ?? 0];

  const _template = useMemo(() => {
    return [
      [
        "core/paragraph",
        {
          placeholder: __("Unlimited user account", "brandy"),
          content: dataAttributes.content,
        },
      ],
    ];
  }, [dataAttributes]);

  return (
    <div {...blockProps}>
      <div
        className={`brandy-pricing-feature ${
          currentFeature.status === "checked"
            ? "checked-feature"
            : "unchecked-feature"
        }`}
      >
        {isIconEnabled && (
          <div>
            {currentFeature.status == "checked" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 20.5C15.5228 20.5 20 16.0228 20 10.5C20 4.97715 15.5228 0.5 10 0.5C4.47715 0.5 0 4.97715 0 10.5C0 16.0228 4.47715 20.5 10 20.5Z"
                  fill="#3858E9"
                />
                <path
                  d="M6 11L8.5 13.5L13.5 8.5"
                  stroke="#3858E9"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
                  fill="#D1D9E0"
                />
                <path
                  d="M12 6L6 12"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 6L12 12"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </div>
        )}
        <div className="brandy-pricing-feature__text">
          <InnerBlocks template={_template} templateLock="all" />
        </div>
      </div>
    </div>
  );
}
