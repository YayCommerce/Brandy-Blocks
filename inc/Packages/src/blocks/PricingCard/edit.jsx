import { RichText, useBlockProps } from "@wordpress/block-editor";
import { createContext, useEffect, useMemo } from "@wordpress/element";
import Settings from "./Settings";
import { getTypographyVariables, getPaddingValue } from "../../utils/helpers";

export const PricingCardContext = createContext({});

export default function Edit({ attributes, setAttributes, context }) {
  const blockProps = useBlockProps();

  useEffect(() => {
    setAttributes({
      context,
    });
  }, [
    context["brandy/pricing/highlight_settings"],
    context["brandy/pricing/card_layout"],
    context["brandy/pricing/card_highlight_badge"],
  ]);

  const isHighlighted =
    context["brandy/pricing/highlight_settings"].selected ==
    attributes.position;

  const contextValue = useMemo(
    () => ({
      attributes,
      setAttributes,
    }),
    [attributes, setAttributes]
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
                  "--card-highlight-badge-title-color":
                    context["brandy/pricing/card_highlight_badge"].title_color,
                  "--card-highlight-badge-background-color":
                    context["brandy/pricing/card_highlight_badge"]
                      .background_color,
                  ...getTypographyVariables(
                    "card-highlight-badge",
                    context["brandy/pricing/card_highlight_badge"].typography
                  ),
                  "--card-highlight-badge-padding": getPaddingValue(
                    context["brandy/pricing/card_highlight_badge"].padding
                  ),
                  "--card-highlight-badge-margin": getPaddingValue(
                    context["brandy/pricing/card_highlight_badge"].margin
                  ),
                  /**
                   * Card title
                   */
                  "--card-title-color":
                    context["brandy/pricing/highlight_settings"].card
                      .title_color,

                  /**
                   * Card pricing
                   */
                  "--card-pricing-price-color":
                    context["brandy/pricing/highlight_settings"].card
                      .pricing_price_color,
                  "--card-pricing-period-color":
                    context["brandy/pricing/highlight_settings"].card
                      .pricing_period_color,

                  /**
                   * Card description
                   */
                  "--card-pricing-description-color":
                    context["brandy/pricing/highlight_settings"].card
                      .description_color,

                  /**
                   * Card features
                   */
                  "--pricing-feature-checked-title-color":
                    context["brandy/pricing/highlight_settings"].card
                      .checked_feature_title_color,
                  "--pricing-feature-checked-icon-color":
                    context["brandy/pricing/highlight_settings"].card
                      .checked_feature_icon_color,
                  "--pricing-feature-checked-icon-background-color":
                    context["brandy/pricing/highlight_settings"].card
                      .checked_feature_icon_background_color,
                  "--pricing-feature-unchecked-title-color":
                    context["brandy/pricing/highlight_settings"].card
                      .unchecked_feature_title_color,
                  "--pricing-feature-unchecked-icon-color":
                    context["brandy/pricing/highlight_settings"].card
                      .unchecked_feature_icon_color,
                  "--pricing-feature-unchecked-icon-background-color":
                    context["brandy/pricing/highlight_settings"].card
                      .unchecked_feature_icon_background_color,

                  /**
                   * Card button
                   */

                  "--card-button-color-normal":
                    context["brandy/pricing/highlight_settings"].card
                      .button_text_color.normal,
                  "--card-button-color-hover":
                    context["brandy/pricing/highlight_settings"].card
                      .button_text_color.hover,
                  ...(context["brandy/pricing/highlight_settings"].card
                    .button_type === "fill"
                    ? {
                        "--card-button-background-color-normal":
                          context["brandy/pricing/highlight_settings"].card
                            .button_background_color.normal,
                        "--card-button-background-color-hover":
                          context["brandy/pricing/highlight_settings"].card
                            .button_background_color.hover,
                        "--card-button-border-color-normal": "transparent",
                        "--card-button-border-color-hover": "transparent",
                      }
                    : {
                        "--card-button-background-color-normal": "transparent",
                        "--card-button-background-color-hover": "transparent",
                        "--card-button-border-color-normal":
                          context["brandy/pricing/highlight_settings"].card
                            .button_background_color.normal,
                        "--card-button-border-color-hover":
                          context["brandy/pricing/highlight_settings"].card
                            .button_background_color.hover,
                      }),

                  /**
                   * Card General
                   */
                  "--card-background-normal":
                    context["brandy/pricing/highlight_settings"].card
                      .background_color.normal,
                  "--card-background-hover":
                    context["brandy/pricing/highlight_settings"].card
                      .background_color.hover,
                  "--card-border-color-normal":
                    context["brandy/pricing/highlight_settings"].card
                      .border_color.normal,
                  "--card-border-color-hover":
                    context["brandy/pricing/highlight_settings"].card
                      .border_color.hover,
                }
              : {}
          }
        >
          {context["brandy/pricing/card_layout"].map((item, index) => (
            <>
              {item === "highlight_badge" && (
                <RichText
                  value={attributes.highlight_badge}
                  onChange={(v) => {
                    setAttributes({ highlight_badge: v });
                  }}
                  tagName="h4"
                  className="brandy-pricing-card__highlight-badge"
                />
              )}
              {item === "title" && (
                <RichText
                  value={attributes.title}
                  onChange={(v) => {
                    setAttributes({ title: v });
                  }}
                  tagName="h3"
                  className="brandy-pricing-card__title"
                />
              )}
              {item === "pricing" && (
                <RichText
                  value={attributes.pricing}
                  onChange={(v) => {
                    setAttributes({ pricing: v });
                  }}
                  tagName="p"
                  className="brandy-pricing-card__pricing"
                />
              )}
              {item === "description" && (
                <RichText
                  value={attributes.description}
                  onChange={(v) => {
                    setAttributes({ description: v });
                  }}
                  tagName="p"
                  className="brandy-pricing-card__description"
                />
              )}
              {item === "list_features" && (
                <div className="brandy-pricing-card__features-list">
                  {attributes.features.map((feature, ind) => (
                    <Feature
                      text={feature.text}
                      status={feature.status}
                      onChangeText={(v) => {
                        const newFeatures = attributes.features.map(
                          (f, fInd) => (fInd === ind ? { ...f, text: v } : f)
                        );
                        setAttributes({
                          features: newFeatures,
                        });
                      }}
                      isIconEnabled={attributes.icon_enabled ?? true}
                    />
                  ))}
                </div>
              )}
              {item === "button" && (
                <RichText
                  value={attributes.button}
                  onChange={(v) => {
                    setAttributes({ button: v });
                  }}
                  tagName="div"
                  className="brandy-pricing-card__button"
                />
              )}
            </>
          ))}
        </div>
      </PricingCardContext.Provider>
    </div>
  );
}

function Feature({ text, status, isIconEnabled = true, onChangeText }) {
  return (
    <div
      className={`brandy-pricing-feature ${
        status === "checked" ? "checked-feature" : "unchecked-feature"
      }`}
    >
      {isIconEnabled && (
        <div>
          {status == "checked" ? (
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
      <RichText
        value={text}
        onChange={onChangeText}
        tagName="span"
        className="brandy-pricing-feature__text"
      />
    </div>
  );
}
