import { InspectorControls } from '@wordpress/block-editor';
import {
  PanelBody,
  CustomSelectControl,
  RangeControl,
  __experimentalSpacer as Spacer,
  __experimentalBoxControl as BoxControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
  __experimentalHStack as HStack,
  __experimentalVStack as VStack,
} from '@wordpress/components';
import {
  Icon,
  justifyCenter,
  justifyLeft,
  justifyRight,
} from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import React, {useEffect} from 'react';

const positionOptions = [
  {
    key: 'default',
    name: __('Default', 'brandy-blocks'),
    value: 'default',
  },
  // {
  //   key: 'sticky',
  //   name: __('Sticky'),
  //   value: 'sticky',
  //   hint: __(
  //     'The block will stick to the top of the window instead of scrolling.',
  //     'brandy-blocks'
  //   ),
  // },
  {
    key: 'block',
    name: __('Block'),
    value: 'block',
    hint: __(
      'The block will be displayed as a block element.',
      'brandy-blocks'
    ),
  },
  {
    key: 'fixed',
    name: __('Fixed'),
    value: 'fixed',
    hint: __(
      'The block will be displayed as a fixed element.',
      'brandy-blocks'
    ),
  },
  {
    key: 'absolute',
    name: __('Absolute'),
    value: 'absolute',
    hint: __(
      'The block will be displayed as an absolute element.',
      'brandy-blocks'
    ),
  },
  {
    key: 'flex',
    name: __('Flex'),
    value: 'flex',
    hint: __('The block will be displayed as a flex element.', 'brandy-blocks'),
  },
];

const DisplaySettings = ({ attributes, setAttributes, clientId }) => {
  const { displaySettings } = attributes;
  const { key, dimensions } = displaySettings;

  // useEffect(()=>{
  //   console.log(attributes.displaySettings)
  // },[attributes.displaySettings])

  return (
    <InspectorControls>
      <PanelBody title={__('Position', 'brandy-blocks')}>
        <CustomSelectControl
          options={positionOptions}
          value={displaySettings}
          onChange={(value) => {
            setAttributes({
              displaySettings: {
                ...displaySettings,
                key: value.selectedItem?.value,
                name: value.selectedItem?.name,
              },
            });
          }}
        />

        {( key === 'fixed' || key === 'absolute') && (
          <Spacer marginTop={10}>
            <BoxControl
              label={__('Dimensions', 'brandy_block')}
              onChange={(value) => {
                setAttributes({
                  displaySettings: {
                    ...displaySettings,
                    dimensions: value,
                  },
                });
              }}
              values={dimensions}
            />
          </Spacer>
        )}

        {key === 'flex' && (
          <>
            <VStack>
              <Spacer>
                <RangeControl
                  label={__('Gap', 'brandy_block')}
                  marks
                  max={10}
                  min={0}
                  onChange={(value)=>{
                    setAttributes({
                      displaySettings: {
                        ...displaySettings,
                        gap: value,
                      },
                    });
                  }}
                  step={1}
                  value={displaySettings.gap ? displaySettings.gap : 6}
                />
              </Spacer>

              <ToggleGroupControl
                __nextHasNoMarginBottom
                label="Justification"
                onChange={(value)=>{
                  setAttributes({
                    displaySettings: {
                      ...displaySettings,
                      justification: value,
                    },
                  });
                }}
                value={displaySettings.justification ? displaySettings.justification : 'left'}
              >
                <ToggleGroupControlOptionIcon
                  icon={<Icon icon={justifyLeft} />}
                  label="Justify items left"
                  value="left"
                />
                <ToggleGroupControlOptionIcon
                  icon={<Icon icon={justifyCenter} />}
                  label="Justify items center"
                  value="center"
                />
                <ToggleGroupControlOptionIcon
                  icon={<Icon icon={justifyRight} />}
                  label="Justify items right"
                  value="right"
                />
              </ToggleGroupControl>
            </VStack>
          </>
        )}
      </PanelBody>
    </InspectorControls>
  );
};

export default DisplaySettings;
