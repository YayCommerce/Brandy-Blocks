import DisplaySettings from './components/DisplaySettings';

/** Register attribute */
function addDisplaySettingsAttributes(settings) {
  if (typeof settings.attributes === 'undefined') {
    return settings;
  }

  settings.attributes = Object.assign(settings.attributes, {
    displaySettings: {
      type: 'object',
      default: {
        key: 'default',
        name: 'Default',
      },
    },
  });

  return settings;
}

wp.hooks.addFilter(
  'blocks.registerBlockType',
  'brandy-blocks/display-settings-attributes',
  addDisplaySettingsAttributes
);

/** Display controls */
const DisplaySettingsControls = wp.compose.createHigherOrderComponent(
  (BlockEdit) => {
    return (props) => {
      const { Fragment } = wp.element;
      const { attributes, setAttributes, isSelected, clientId } = props;
      return (
        <Fragment>
          <BlockEdit {...props} />
          {isSelected && (
            <DisplaySettings
              attributes={attributes}
              setAttributes={setAttributes}
              clientId={clientId}
            />
          )}
        </Fragment>
      );
    };
  },
  'displaySettingsControls'
);

wp.hooks.addFilter(
  'editor.BlockEdit',
  'brandy-blocks/display-settings-controls',
  DisplaySettingsControls
);

// Add style for editor
const addStyle = wp.compose.createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    const { attributes } = props;
    const { displaySettings } = attributes;
    const { key, gap, justification, dimensions } = displaySettings;

    let style = {};

    if ('default' === key) {
      return <BlockListBlock {...props} />;
    }

    if ('block' === key || 'flex' === key) {
      style['--display'] = key;

      if (gap) {
        style['--gap'] = gap;
      }

      if (justification) {
        style['--justification'] = justification;
      }
    } else {
      style['--position'] = key;

      if (dimensions && dimensions.top) {
        style['--top'] = dimensions.top;
      }

      if (dimensions && dimensions.bottom) {
        style['--bottom'] = dimensions.bottom;
      }

      if (dimensions && dimensions.left) {
        style['--left'] = dimensions.left;
      }

      if (dimensions && dimensions.right) {
        style['--right'] = dimensions.right;
      }
    }

    const extraProps = {
      style: style
    }

    return <BlockListBlock {...props} wrapperProps={extraProps} />;
  };
}, 'addStyle');

wp.hooks.addFilter(
  'editor.BlockListBlock',
  'brandy-blocks/display-settings-style',
  addStyle
);
