import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import {
  getPaddingValue,
  getShadowValue,
  getTypographyVariables,
} from "../../utils/helpers";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  return (
    <div {...blockProps}>
      <div
        className="brandy-pricing-wrapper"
        card-horizontal-alignment={
          attributes.card_settings.horizontal_alignment
        }
        style={{
          /**
           * Card title
           */
          "--card-title-margin": getPaddingValue(attributes.card_title.margin),
          "--card-title-color": attributes.card_title.color,
          ...getTypographyVariables(
            "card-title",
            attributes.card_title.typography
          ),

          /**
           * Card pricing
           */
          "--card-pricing-margin": getPaddingValue(
            attributes.card_pricing.margin
          ),
          "--card-pricing-price-color": attributes.card_pricing.price.color,
          ...getTypographyVariables(
            "card-pricing-price",
            attributes.card_pricing.price.typography
          ),
          "--card-pricing-period-color": attributes.card_pricing.period.color,
          ...getTypographyVariables(
            "card-pricing-period",
            attributes.card_pricing.period.typography
          ),
          "--card-pricing-period-position":
            attributes.card_pricing.period.position,

          /**
           * Card description
           */
          "--card-description-margin": getPaddingValue(
            attributes.card_description.margin
          ),
          "--card-description-color": attributes.card_description.color,
          ...getTypographyVariables(
            "card-description",
            attributes.card_description.typography
          ),
          /**
           * Card features
           */
          "--card-features-margin": getPaddingValue(
            attributes.card_features.margin
          ),
          "--card-features-item-spacing": `${attributes.card_features.item_spacing}px`,
          "--pricing-feature-checked-title-color":
            attributes.card_features.checked.title_color,
          "--pricing-feature-checked-icon-color":
            attributes.card_features.checked.icon_color,
          "--pricing-feature-checked-icon-background-color":
            attributes.card_features.checked.icon_background_color,
          ...getTypographyVariables(
            "pricing-feature-checked",
            attributes.card_features.checked.typography
          ),
          "--pricing-feature-unchecked-title-color":
            attributes.card_features.unchecked.title_color,
          "--pricing-feature-unchecked-icon-color":
            attributes.card_features.unchecked.icon_color,
          "--pricing-feature-unchecked-icon-background-color":
            attributes.card_features.unchecked.icon_background_color,
          ...getTypographyVariables(
            "pricing-feature-unchecked",
            attributes.card_features.unchecked.typography
          ),
          /**
           * Card button
           */
          "--card-button-margin": getPaddingValue(
            attributes.card_button.margin
          ),
          "--card-button-padding": getPaddingValue(
            attributes.card_button.padding
          ),
          "--card-button-border-radius": `${attributes.card_button.border_radius.top}px ${attributes.card_button.border_radius.right}px ${attributes.card_button.border_radius.bottom}px ${attributes.card_button.border_radius.left}px`,
          "--card-button-width": `${attributes.card_button.width}%`,
          "--card-button-color-normal": attributes.card_button.color.normal,
          "--card-button-color-hover": attributes.card_button.color.hover,
          ...(attributes.card_button.type === "fill"
            ? {
                "--card-button-background-color-normal":
                  attributes.card_button.background_color.normal,
                "--card-button-background-color-hover":
                  attributes.card_button.background_color.hover,
                "--card-button-border-color-normal": "transparent",
                "--card-button-border-color-hover": "transparent",
              }
            : {
                "--card-button-background-color-normal": "transparent",
                "--card-button-background-color-hover": "transparent",
                "--card-button-border-color-normal":
                  attributes.card_button.background_color.normal,
                "--card-button-border-color-hover":
                  attributes.card_button.background_color.hover,
              }),
          ...getTypographyVariables(
            "card-button",
            attributes.card_button.typography
          ),

          /**
           * Card general
           */
          "--card-background-normal":
            attributes.card_settings.background.normal,
          "--card-background-hover": attributes.card_settings.background.hover,
          "--card-shadow": getShadowValue(attributes.card_settings.shadow),
          "--card-border-color-normal":
            attributes.card_settings.border_color.normal,
          "--card-border-color-hover":
            attributes.card_settings.border_color.hover,
          "--card-spacing": `${attributes.card_settings.spacing}px`,
          "--card-padding": getPaddingValue(attributes.card_settings.padding),
          "--card-title-display": attributes.card_title.visible
            ? "block"
            : "none",
          "--card-description-display": attributes.card_description.visible
            ? "block"
            : "none",
          "--card-features-display": attributes.card_features.visible
            ? "flex"
            : "none",
          "--card-button-display": attributes.card_button.visible
            ? "block"
            : "none",
          ...(attributes.card_pricing.period.position === "bottom"
            ? {
                "--card-pricing-display": "flex",
                "--card-pricing-flex-direction": "column",
                "--card-pricing-flex-align-items":
                  attributes.card_settings.horizontal_alignment === "center"
                    ? "center"
                    : attributes.card_settings.horizontal_alignment === "right"
                    ? "flex-end"
                    : "flex-start",
              }
            : {
                "--card-pricing-display": attributes.card_pricing.visible
                  ? "block"
                  : "none",
              }),
        }}
      >
        <div className="brandy-pricing-list">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
}
