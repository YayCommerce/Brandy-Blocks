import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  const context = attributes.context;
  const isHighlighted =
    (context["brandy/pricing/highlight_price"]?.selected ?? 0) ==
    attributes.position;
  return (
    <div {...blockProps}>
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
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
