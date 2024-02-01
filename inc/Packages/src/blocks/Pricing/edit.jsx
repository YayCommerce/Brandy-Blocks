import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { createContext, useMemo } from "@wordpress/element";
import {
  getPaddingValue,
  getShadowValue,
  getTypographyVariables,
} from "../../utils/helpers";
import Settings from "./Settings";
import metadata from "./block.json";

export const PricingContext = createContext({});

const TEMPLATE_DEFAULT = [
  [
    "brandy/pricing-card",
    {
      title: "Pack Trial",
      pricing: "Free <sub>/14 days</sub>",
      description: "Start from here, no credit card required",
      features: [
        {
          text: "Single user account",
          status: "checked",
        },
        {
          text: "Use any 3 templates",
          status: "checked",
        },
        {
          text: "2 GB storage",
          status: "unchecked",
        },
        {
          text: "Feature benefit in 14 days",
          status: "unchecked",
        },
        {
          text: "3 audiences",
          status: "unchecked",
        },
        {
          text: "Support for first 14 days",
          status: "checked",
        },
      ],
      button: "<a href='#'>Start Free Trial</a>",
      position: 1,
    },
  ],
  [
    "brandy/pricing-card",
    {
      title: "Pack Standard",
      pricing: "$29.99 <sub>/monthly</sub>",
      description: "Enjoy our basic amenities and future features",
      features: [
        {
          text: "Unlimited user account",
          status: "checked",
        },
        {
          text: "Use any 100 templates",
          status: "checked",
        },
        {
          text: "25 GB storage",
          status: "unchecked",
        },
        {
          text: "Feature benefit",
          status: "checked",
        },
        {
          text: "10 audiences",
          status: "checked",
        },
        {
          text: "24/7 email and chat support",
          status: "checked",
        },
      ],
      button: "<a href='#'>Start Free Trial</a>",
      position: 2,
    },
  ],
  [
    "brandy/pricing-card",
    {
      title: "Pack Premium",
      pricing: "$59.00 <sub>/monthly</sub>",
      description: "Get benefit pro for your entire team",
      features: [
        {
          text: "Unlimited user account",
          status: "checked",
        },
        {
          text: "Unlimited templates",
          status: "checked",
        },
        {
          text: "100 GB storage",
          status: "unchecked",
        },
        {
          text: "Feature benefit pro",
          status: "checked",
        },
        {
          text: "Unlimited audiences",
          status: "checked",
        },
        {
          text: "Phone and priority support",
          status: "checked",
        },
      ],
      button: "<a href='#'>Start Free Trial</a>",
      position: 3,
    },
  ],
  [
    "brandy/pricing-card",
    {
      title: "Pack Premium",
      pricing: "$59.00 <sub>/monthly</sub>",
      description: "Get benefit pro for your entire team",
      features: [
        {
          text: "Unlimited user account",
          status: "checked",
        },
        {
          text: "Unlimited templates",
          status: "checked",
        },
        {
          text: "100 GB storage",
          status: "unchecked",
        },
        {
          text: "Feature benefit pro",
          status: "checked",
        },
        {
          text: "Unlimited audiences",
          status: "checked",
        },
        {
          text: "Phone and priority support",
          status: "checked",
        },
      ],
      button: "<a href='#'>Start Free Trial</a>",
      position: 3,
    },
  ],
];

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();

  const dataAttributes = useMemo(
    () => ({
      number_card:
        attributes.number_card ?? metadata.attributes.number_card.default,
      card_title:
        attributes.card_title ?? metadata.attributes.card_title.default,
      card_pricing:
        attributes.card_pricing ?? metadata.attributes.card_pricing.default,
      card_description:
        attributes.card_description ??
        metadata.attributes.card_description.default,
      card_features:
        attributes.card_features ?? metadata.attributes.card_features.default,
      card_button:
        attributes.card_button ?? metadata.attributes.card_button.default,
      card_highlight_badge:
        attributes.card_highlight_badge ??
        metadata.attributes.card_highlight_badge.default,
      card_settings:
        attributes.card_settings ?? metadata.attributes.card_settings.default,
      highlight_settings:
        attributes.highlight_settings ??
        metadata.attributes.highlight_settings.default,
      card_layout:
        attributes.card_layout ?? metadata.attributes.card_layout.default,
    }),
    [attributes]
  );

  const contextValue = useMemo(
    () => ({
      attributes: dataAttributes,
      setAttributes,
      clientId,
    }),
    [dataAttributes, setAttributes, clientId]
  );

  const template = useMemo(
    () =>
      Array.from({ length: attributes.number_card ?? 3 }).map(
        (_, ind) => TEMPLATE_DEFAULT[ind]
      ),
    [attributes.number_card]
  );

  return (
    <div {...blockProps}>
      <PricingContext.Provider value={contextValue}>
        <Settings />
        <div
          className="brandy-pricing-wrapper"
          card-horizontal-alignment={
            dataAttributes.card_settings.horizontal_alignment
          }
          style={{
            /**
             * Card title
             */
            "--card-title-margin": getPaddingValue(
              dataAttributes.card_title.margin
            ),
            "--card-title-color": dataAttributes.card_title.color,
            ...getTypographyVariables(
              "card-title",
              dataAttributes.card_title.typography
            ),

            /**
             * Card pricing
             */
            "--card-pricing-margin": getPaddingValue(
              dataAttributes.card_pricing.margin
            ),
            "--card-pricing-price-color":
              dataAttributes.card_pricing.price.color,
            ...getTypographyVariables(
              "card-pricing-price",
              dataAttributes.card_pricing.price.typography
            ),
            "--card-pricing-period-color":
              dataAttributes.card_pricing.period.color,
            ...getTypographyVariables(
              "card-pricing-period",
              dataAttributes.card_pricing.period.typography
            ),
            "--card-pricing-period-position":
              dataAttributes.card_pricing.period.position,

            /**
             * Card description
             */
            "--card-description-margin": getPaddingValue(
              dataAttributes.card_description.margin
            ),
            "--card-description-color": dataAttributes.card_description.color,
            ...getTypographyVariables(
              "card-description",
              dataAttributes.card_description.typography
            ),
            /**
             * Card features
             */
            "--card-features-margin": getPaddingValue(
              dataAttributes.card_features.margin
            ),
            "--card-features-item-spacing": `${dataAttributes.card_features.item_spacing}px`,
            "--pricing-feature-checked-title-color":
              dataAttributes.card_features.checked.title_color,
            "--pricing-feature-checked-icon-color":
              dataAttributes.card_features.checked.icon_color,
            "--pricing-feature-checked-icon-background-color":
              dataAttributes.card_features.checked.icon_background_color,
            ...getTypographyVariables(
              "pricing-feature-checked",
              dataAttributes.card_features.checked.typography
            ),
            "--pricing-feature-unchecked-title-color":
              dataAttributes.card_features.unchecked.title_color,
            "--pricing-feature-unchecked-icon-color":
              dataAttributes.card_features.unchecked.icon_color,
            "--pricing-feature-unchecked-icon-background-color":
              dataAttributes.card_features.unchecked.icon_background_color,
            ...getTypographyVariables(
              "pricing-feature-unchecked",
              dataAttributes.card_features.unchecked.typography
            ),
            /**
             * Card button
             */
            "--card-button-margin": getPaddingValue(
              dataAttributes.card_button.margin
            ),
            "--card-button-padding": getPaddingValue(
              dataAttributes.card_button.padding
            ),
            "--card-button-border-radius": `${dataAttributes.card_button.border_radius.top}px ${dataAttributes.card_button.border_radius.right}px ${dataAttributes.card_button.border_radius.bottom}px ${dataAttributes.card_button.border_radius.left}px`,
            "--card-button-width": `${dataAttributes.card_button.width}%`,
            "--card-button-color-normal":
              dataAttributes.card_button.color.normal,
            "--card-button-color-hover": dataAttributes.card_button.color.hover,
            ...(dataAttributes.card_button.type === "fill"
              ? {
                  "--card-button-background-color-normal":
                    dataAttributes.card_button.background_color.normal,
                  "--card-button-background-color-hover":
                    dataAttributes.card_button.background_color.hover,
                  "--card-button-border-color-normal": "transparent",
                  "--card-button-border-color-hover": "transparent",
                }
              : {
                  "--card-button-background-color-normal": "transparent",
                  "--card-button-background-color-hover": "transparent",
                  "--card-button-border-color-normal":
                    dataAttributes.card_button.background_color.normal,
                  "--card-button-border-color-hover":
                    dataAttributes.card_button.background_color.hover,
                }),
            ...getTypographyVariables(
              "card-button",
              dataAttributes.card_button.typography
            ),

            /**
             * Card general
             */
            "--card-background-normal":
              dataAttributes.card_settings.background.normal,
            "--card-background-hover":
              dataAttributes.card_settings.background.hover,
            "--card-shadow": getShadowValue(
              dataAttributes.card_settings.shadow
            ),
            "--card-border-color-normal":
              dataAttributes.card_settings.border_color.normal,
            "--card-border-color-hover":
              dataAttributes.card_settings.border_color.hover,
            "--card-spacing": `${dataAttributes.card_settings.spacing}px`,
            "--card-padding": getPaddingValue(
              dataAttributes.card_settings.padding
            ),
            "--card-title-display": dataAttributes.card_title.visible
              ? "block"
              : "none",
            "--card-description-display": dataAttributes.card_description
              .visible
              ? "block"
              : "none",
            "--card-features-display": dataAttributes.card_features.visible
              ? "flex"
              : "none",
            "--card-button-display": dataAttributes.card_button.visible
              ? "block"
              : "none",
            ...(dataAttributes.card_pricing.period.position === "bottom"
              ? {
                  "--card-pricing-display": "flex",
                  "--card-pricing-flex-direction": "column",
                  "--card-pricing-flex-align-items":
                    dataAttributes.card_settings.horizontal_alignment ===
                    "center"
                      ? "center"
                      : dataAttributes.card_settings.horizontal_alignment ===
                        "right"
                      ? "flex-end"
                      : "flex-start",
                }
              : {
                  "--card-pricing-display": dataAttributes.card_pricing.visible
                    ? "block"
                    : "none",
                }),
          }}
        >
          <div className="brandy-pricing-list">
            <InnerBlocks
              template={template}
              allowedBlocks={["brandy/pricing-card"]}
              templateLock="all"
            />
          </div>
        </div>
      </PricingContext.Provider>
    </div>
  );
}
