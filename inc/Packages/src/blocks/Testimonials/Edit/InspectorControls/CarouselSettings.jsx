import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function CarouselSettings({ attributes, setAttributes }) {
  return (
    <PanelBody title={__('Carousel', 'brandy-blocks')}>
      <ToggleControl
        __nextHasNoMarginBottom
        label="Infinite loop"
        checked={attributes.infiniteLoop ?? true}
        onChange={(v) => {
          setAttributes({
            infiniteLoop: v,
          });
        }}
      />
      <ToggleControl
        __nextHasNoMarginBottom
        label="Auto play"
        checked={attributes.autoPlay ?? true}
        onChange={(v) => {
          setAttributes({
            autoPlay: v,
          });
        }}
      />
      {attributes.autoPlay && (
        <RangeControl
          __nextHasNoMarginBottom
          label="Auto play delay (ms)"
          value={attributes.autoPlayDelay ?? 3000}
          onChange={(value) => setAttributes({ autoPlayDelay: value })}
          step={500}
          min={1000}
          max={20000}
        />
      )}
    </PanelBody>
  );
}
