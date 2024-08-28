const attributeName = "brandy-blocks/responsive-conditions";

function addResponsiveConditionsAttribute(settings, name) {
  if (settings.attributes == undefined) {
    return settings;
  }
  settings.attributes = Object.assign(settings.attributes, {
    hideOnDesktop: {
      type: "boolean",
      default: false,
    },
    hideOnTablet: {
      type: "boolean",
      default: false,
    },
    hideOnMobile: {
      type: "boolean",
      dfefault: false,
    },
  });

  return settings;
}

wp.hooks.addFilter(
  "blocks.registerBlockType",
  attributeName,
  addResponsiveConditionsAttribute
);

const responsiveConditionsControls = wp.compose.createHigherOrderComponent(
  (BlockEdit) => {
    return (props) => {
      const { Fragment } = wp.element;
      const { ToggleControl } = wp.components;
      const { InspectorAdvancedControls } = wp.blockEditor;
      const { attributes, setAttributes, isSelected } = props;
      return (
        <Fragment>
          <BlockEdit {...props} />
          <InspectorAdvancedControls>
            <ToggleControl
              label={wp.i18n.__("Hide on desktop", "brandy-blocks")}
              checked={!!attributes.hideOnDesktop}
              onChange={() =>
                setAttributes({ hideOnDesktop: !attributes.hideOnDesktop })
              }
            />
            <ToggleControl
              label={wp.i18n.__("Hide on tablet", "brandy-blocks")}
              checked={!!attributes.hideOnTablet}
              onChange={() =>
                setAttributes({ hideOnTablet: !attributes.hideOnTablet })
              }
            />
            <ToggleControl
              label={wp.i18n.__("Hide on mobile", "brandy-blocks")}
              checked={!!attributes.hideOnMobile}
              onChange={() =>
                setAttributes({ hideOnMobile: !attributes.hideOnMobile })
              }
            />
          </InspectorAdvancedControls>
        </Fragment>
      );
    };
  },
  "responsiveConditionsControls"
);

wp.hooks.addFilter(
  "editor.BlockEdit",
  attributeName,
  responsiveConditionsControls
);
