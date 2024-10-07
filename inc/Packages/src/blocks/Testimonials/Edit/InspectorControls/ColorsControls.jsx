import { PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ColorsControls({ attributes, setAttributes }) {
  const handleChangeNavigationValue = (key, value) => {
    setAttributes({
      navigation: {
        ...attributes.navigation,
        [key]: value,
      },
    });
  };
  const handleChangePaginationValue = (key, value) => {
    setAttributes({
      pagination: {
        ...attributes.pagination,
        [key]: value,
      },
    });
  };
  return (
    <PanelColorSettings
      title={__('Colors', 'brandy-blocks')}
      initialOpen={false}
      colorSettings={[
        {
          value: attributes.navigation?.iconColor,
          onChange: (v) => {
            handleChangeNavigationValue('iconColor', v);
          },
          label: __('Navigation arrow', 'brandy-blocks'),
        },
        {
          value: attributes.navigation?.iconHoverColor,
          onChange: (v) => {
            handleChangeNavigationValue('iconHoverColor', v);
          },
          label: __('Navigation arrow hover', 'brandy-blocks'),
        },
        {
          value: attributes.navigation?.backgroundColor,
          onChange: (v) => {
            handleChangeNavigationValue('backgroundColor', v);
          },
          label: __('Navigation button', 'brandy-blocks'),
        },
        {
          value: attributes.navigation?.backgroundHoverColor,
          onChange: (v) => {
            handleChangeNavigationValue('backgroundHoverColor', v);
          },
          label: __('Navigation button hover', 'brandy-blocks'),
        },
        {
          value: attributes.pagination?.defaultColor,
          onChange: (v) => {
            handleChangePaginationValue('defaultColor', v);
          },
          label: __('Pagination bullet', 'brandy-blocks'),
        },
        {
          value: attributes.pagination?.activeColor,
          onChange: (v) => {
            handleChangePaginationValue('activeColor', v);
          },
          label: __('Pagination bullet active', 'brandy-blocks'),
        },
      ]}
    />
  );
}
