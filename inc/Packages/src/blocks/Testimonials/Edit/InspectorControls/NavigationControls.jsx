import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from '../../block.json';

export default function NavigationControls({ attributes, setAttributes }) {
  const {} = attributes;

  const handleChangeNavigation = (key, value) => {
    setAttributes({
      navigation: {
        ...attributes.navigation,
        [key]: value,
      },
    });
  };
  return (
    <>
      <UnitControl
        label={__('Navigation button size')}
        onChange={(v) => {
          handleChangeNavigation('size', v);
        }}
        value={
          attributes.navigation?.size ??
          metadata.attributes.navigation.default.size
        }
        units={[{ value: 'px', label: 'px', default: 50 }]}
      />
      <UnitControl
        label={__('Navigation arrow size')}
        onChange={(v) => {
          handleChangeNavigation('iconSize', v);
        }}
        units={[{ value: 'px', label: 'px', default: 0 }]}
        value={
          attributes.navigation?.iconSize ??
          metadata.attributes.navigation.default.iconSize
        }
      />
    </>
  );
}
