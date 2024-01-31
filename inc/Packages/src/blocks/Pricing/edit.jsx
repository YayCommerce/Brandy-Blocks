import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useResizeObserver } from "@wordpress/compose";
import {
  createContext,
  useMemo,
  useState,
  useEffect,
} from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import Settings from "./Settings";
import metadata from "./block.json";
import {
  getPaddingValue,
  getShadowValue,
  getTypographyVariables,
} from "../../utils/helpers";
import { useSelect } from "@wordpress/data";

export const PricingContext = createContext({});

const TEMPLATE = [
  [
    "core/columns",
    {
      className: "brandy-pricing__list",
    },
    [
      [
        "core/columns",
        {},
        [
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
              button: "Start Free Trial",
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
              button: "Start Free Trial",
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
              button: "Start Free Trial",
              position: 3,
            },
          ],
        ],
      ],
    ],
  ],
];

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();
  const a = useResizeObserver();
  console.log(a);

  const dataAttributes = useMemo(
    () => ({
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
      general: attributes.general ?? metadata.attributes.general.default,
      highlight_price:
        attributes.highlight_price ??
        metadata.attributes.highlight_price.default,
      card_layout:
        attributes.card_layout ?? metadata.attributes.card_layout.default,
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

  const contextValue = useMemo(
    () => ({
      attributes: dataAttributes,
      setAttributes,
      clientId,
      setTemplate,
    }),
    [dataAttributes, setAttributes, clientId, setTemplate]
  );

  return (
    <div {...blockProps}>
      <PricingContext.Provider value={contextValue}>
        <Settings />
        <div
          className="brandy-pricing-wrapper"
          card-horizontal-alignment={
            dataAttributes.general.horizontal_alignment
          }
          style={{
            /**
             * Card title
             */
            "--card-title-padding": getPaddingValue(
              dataAttributes.card_title.padding
            ),
            "--card-title-color": dataAttributes.card_title.color,
            ...getTypographyVariables(
              "card-title",
              dataAttributes.card_title.typography
            ),

            /**
             * Card pricing
             */
            "--card-pricing-padding": getPaddingValue(
              dataAttributes.card_pricing.padding
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
            "--card-description-padding": getPaddingValue(
              dataAttributes.card_description.padding
            ),
            "--card-description-color": dataAttributes.card_description.color,
            ...getTypographyVariables(
              "card-description",
              dataAttributes.card_description.typography
            ),
            /**
             * Card features
             */
            "--card-features-padding": getPaddingValue(
              dataAttributes.card_features.padding
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
              dataAttributes.general.background.normal,
            "--card-background-hover": dataAttributes.general.background.hover,
            "--card-shadow": getShadowValue(dataAttributes.general.shadow),
            "--card-border-color-normal":
              dataAttributes.general.border_color.normal,
            "--card-border-color-hover":
              dataAttributes.general.border_color.hover,
            "--card-spacing": `${dataAttributes.general.spacing}px`,
            "--card-padding": getPaddingValue(dataAttributes.general.padding),
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
                    dataAttributes.general.horizontal_alignment === "center"
                      ? "center"
                      : dataAttributes.general.horizontal_alignment === "right"
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
          <InnerBlocks
            template={template}
            allowedBlocks={["brandy/pricing-card"]}
            templateLock="all"
          />
        </div>
      </PricingContext.Provider>
    </div>
  );
}
