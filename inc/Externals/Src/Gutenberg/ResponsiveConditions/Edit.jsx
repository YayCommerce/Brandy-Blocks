/** Register attribute */
function addResponsiveConditionsAttribute(settings, name) {
  if (typeof settings.attributes === "undefined") {
    return settings;
  }
  settings.attributes = Object.assign(settings.attributes, {
    responsiveConditions: {
      type: "object",
      default: {
        hideOnDesktop: false,
        hideOnTablet: false,
        hideOnMobile: false,
      },
    },
  });

  return settings;
}

wp.hooks.addFilter(
  "blocks.registerBlockType",
  "brandy-blocks/responsive-conditions-attribute",
  addResponsiveConditionsAttribute
);

/** Display controls */

const ResponsiveConditionsControls = wp.compose.createHigherOrderComponent(
  (BlockEdit) => {
    return (props) => {
      const { Fragment } = wp.element;
      const { ToggleControl, PanelBody } = wp.components;
      const { InspectorControls } = wp.blockEditor;
      const { __ } = wp.i18n;
      const { attributes, setAttributes, isSelected } = props;
      return (
        <Fragment>
          <BlockEdit {...props} />
          {isSelected && (
            <InspectorControls>
              <PanelBody title={__("Responsive Conditions", "brandy-blocks")}>
                <ToggleControl
                  label={wp.i18n.__("Hide on desktop", "brandy-blocks")}
                  checked={!!attributes.responsiveConditions?.hideOnDesktop}
                  onChange={(value) => {
                    setAttributes({
                      responsiveConditions: {
                        ...attributes.responsiveConditions,
                        hideOnDesktop: value,
                      },
                    });
                  }}
                />
                <ToggleControl
                  label={wp.i18n.__("Hide on tablet", "brandy-blocks")}
                  checked={!!attributes.responsiveConditions?.hideOnTablet}
                  onChange={(value) =>
                    setAttributes({
                      responsiveConditions: {
                        ...attributes.responsiveConditions,
                        hideOnTablet: value,
                      },
                    })
                  }
                />
                <ToggleControl
                  label={wp.i18n.__("Hide on mobile", "brandy-blocks")}
                  checked={!!attributes.responsiveConditions?.hideOnMobile}
                  onChange={(value) =>
                    setAttributes({
                      responsiveConditions: {
                        ...attributes.responsiveConditions,
                        hideOnMobile: value,
                      },
                    })
                  }
                />
              </PanelBody>
            </InspectorControls>
          )}
        </Fragment>
      );
    };
  },
  "responsiveConditionsControls"
);

wp.hooks.addFilter(
  "editor.BlockEdit",
  "brandy-blocks/responsive-conditions-controls",
  ResponsiveConditionsControls
);

/**
 * Save function
 */
function addResponsiveClass(props, blockType, attributes) {
  const { responsiveConditions } = attributes;

  if (typeof responsiveConditions === "undefined") {
    return props;
  }

  if (responsiveConditions?.hideOnDesktop) {
    Object.assign(props, { "data-hide-on-desktop": "true" });
  }
  if (responsiveConditions?.hideOnTablet) {
    Object.assign(props, { "data-hide-on-tablet": "true" });
  }
  if (responsiveConditions?.hideOnMobile) {
    Object.assign(props, { "data-hide-on-mobile": "true" });
  }

  return props;
}

wp.hooks.addFilter(
  "blocks.getSaveContent.extraProps",
  "brandy-blocks/responsive-conditions-props",
  addResponsiveClass
);
