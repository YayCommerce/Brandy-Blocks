import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { useEffect, useMemo, createContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Settings from "./Settings";

export const PricingCardContext = createContext({});

export default function Edit({ attributes, setAttributes, clientId, context }) {
  const blockProps = useBlockProps();
  const dataAttributes = useMemo(() => attributes, [attributes]);

  useEffect(() => {
    setAttributes({
      context,
    });
  }, [context["brandy/pricing/highlight_price"]]);

  const DEFAULT_TEMPLATE = [
    [
      "core/paragraph",
      {
        placeholder: __("Highlight text", "brandy"),
        content: "MOST POPULAR PLAN",
        className: "brandy-pricing-card__highlight",
      },
    ],
    [
      "core/paragraph",
      {
        placeholder: __("Card title", "brandy"),
        content: dataAttributes.title,
        className: "brandy-pricing-card__title",
      },
    ],
    [
      "core/paragraph",
      {
        placeholder: __("Card pricing", "brandy"),
        content: dataAttributes.pricing,
        className: "brandy-pricing-card__pricing",
      },
    ],
    [
      "core/paragraph",
      {
        placeholder: __("Card description", "brandy"),
        content: dataAttributes.description,
        className: "brandy-pricing-card__description",
      },
    ],
    ["brandy/pricing-features"],
    [
      "core/button",
      {
        placeholder: __("Card button", "brandy"),
        text: dataAttributes.button,
        className: "brandy-pricing-card__button",
        url: "google.com",
      },
    ],
  ];

  const innerBlocks = useSelect(
    (select) => {
      const { getBlocks } = select("core/block-editor");
      return getBlocks(clientId);
    },
    [clientId]
  );

  const _template =
    innerBlocks.length < 1
      ? DEFAULT_TEMPLATE
      : innerBlocks.map((block) => [block.name, block.attributes]);

  useEffect(() => {
    function SortLayout(e) {
      const newLayout = e.detail?.card_layout;
      const newTemplate = newLayout.map((l) => {
        if (l === "highlight") {
          return innerBlocks.find(
            (t) => t.attributes.className === "brandy-pricing-card__highlight"
          );
        }
        if (l === "title") {
          return innerBlocks.find(
            (t) => t.attributes.className === "brandy-pricing-card__title"
          );
        }
        if (l === "pricing") {
          return innerBlocks.find(
            (t) => t.attributes.className === "brandy-pricing-card__pricing"
          );
        }
        if (l === "description") {
          return innerBlocks.find(
            (t) => t.attributes.className === "brandy-pricing-card__description"
          );
        }
        if (l === "list_features") {
          return innerBlocks.find((t) => t.name === "brandy/pricing-features");
        }
        if (l === "button") {
          return innerBlocks.find(
            (t) => t.attributes.className === "brandy-pricing-card__button"
          );
        }
        return [];
      });

      innerBlocks[0] = newTemplate[0];
      innerBlocks[1] = newTemplate[1];
      innerBlocks[2] = newTemplate[2];
      innerBlocks[3] = newTemplate[3];
      innerBlocks[4] = newTemplate[4];
      innerBlocks[5] = newTemplate[5];

      const newEvent = new CustomEvent("reloadPricingBlockTemplate");
      window.dispatchEvent(newEvent);
    }

    window.addEventListener("newLayoutNotification", SortLayout);

    return () => {
      window.removeEventListener("newLayoutNotification", SortLayout);
    };
  }, [innerBlocks]);

  const isHighlighted =
    context["brandy/pricing/highlight_price"].selected ==
    dataAttributes.position;

  const contextValue = useMemo(
    () => ({
      attributes: dataAttributes,
      setAttributes,
    }),
    [dataAttributes, setAttributes]
  );

  return (
    <div {...blockProps}>
      <PricingCardContext.Provider value={contextValue}>
        <Settings />
        <div
          className="brandy-pricing-card"
          {...(isHighlighted ? { "is-highlighted": "true" } : {})}
          style={
            isHighlighted
              ? {
                  /**
                   * Badge
                   */
                  "--card-highlight-title-color":
                    context["brandy/pricing/highlight_price"].badge.title_color,
                  "--card-highlight-background-color":
                    context["brandy/pricing/highlight_price"].badge
                      .background_color,
                  /**
                   * Card title
                   */
                  "--card-title-color":
                    context["brandy/pricing/highlight_price"].card.title_color,

                  /**
                   * Card pricing
                   */
                  "--card-pricing-price-color":
                    context["brandy/pricing/highlight_price"].card
                      .pricing_price_color,
                  "--card-pricing-period-color":
                    context["brandy/pricing/highlight_price"].card
                      .pricing_period_color,

                  /**
                   * Card description
                   */
                  "--card-pricing-description-color":
                    context["brandy/pricing/highlight_price"].card
                      .description_color,

                  /**
                   * Card features
                   */
                  "--pricing-feature-checked-title-color":
                    context["brandy/pricing/highlight_price"].card
                      .checked_feature_title_color,
                  "--pricing-feature-checked-icon-color":
                    context["brandy/pricing/highlight_price"].card
                      .checked_feature_icon_color,
                  "--pricing-feature-checked-icon-background-color":
                    context["brandy/pricing/highlight_price"].card
                      .checked_feature_icon_background_color,
                  "--pricing-feature-unchecked-title-color":
                    context["brandy/pricing/highlight_price"].card
                      .unchecked_feature_title_color,
                  "--pricing-feature-unchecked-icon-color":
                    context["brandy/pricing/highlight_price"].card
                      .unchecked_feature_icon_color,
                  "--pricing-feature-unchecked-icon-background-color":
                    context["brandy/pricing/highlight_price"].card
                      .unchecked_feature_icon_background_color,

                  /**
                   * Card button
                   */

                  "--card-button-color-normal":
                    context["brandy/pricing/highlight_price"].card
                      .button_text_color.normal,
                  "--card-button-color-hover":
                    context["brandy/pricing/highlight_price"].card
                      .button_text_color.hover,
                  ...(context["brandy/pricing/highlight_price"].card
                    .button_type === "fill"
                    ? {
                        "--card-button-background-color-normal":
                          context["brandy/pricing/highlight_price"].card
                            .button_background_color.normal,
                        "--card-button-background-color-hover":
                          context["brandy/pricing/highlight_price"].card
                            .button_background_color.hover,
                        "--card-button-border-color-normal": "transparent",
                        "--card-button-border-color-hover": "transparent",
                      }
                    : {
                        "--card-button-background-color-normal": "transparent",
                        "--card-button-background-color-hover": "transparent",
                        "--card-button-border-color-normal":
                          context["brandy/pricing/highlight_price"].card
                            .button_background_color.normal,
                        "--card-button-border-color-hover":
                          context["brandy/pricing/highlight_price"].card
                            .button_background_color.hover,
                      }),

                  /**
                   * Card General
                   */
                  "--card-background":
                    context["brandy/pricing/highlight_price"].card
                      .background_color,
                  "--card-border-color-normal":
                    context["brandy/pricing/highlight_price"].card.border_color
                      .normal,
                  "--card-border-color-hover":
                    context["brandy/pricing/highlight_price"].card.border_color
                      .hover,
                }
              : {}
          }
        >
          <InnerBlocks
            template={_template}
            templateLock="all"
            allowedBlocks={["brandy/pricing-features"]}
          />
        </div>
      </PricingCardContext.Provider>
    </div>
  );
}
