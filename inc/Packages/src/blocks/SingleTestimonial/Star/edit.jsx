import {
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import { PanelColorSettings, useSetting
} from '@wordpress/block-editor';

import {
  getParentBlock,
  getParentAttributes,
  getParentBlockIdByBlockName,
} from "../../../utils/helpers";

import Label from "../../../components/Label";
import Slider from "../../../components/Slider";
import Spacing from "../../../components/Spacing";
import { ToggleControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();
  const colors = useSetting("color.palette.default");

  const parentBlockId = getParentBlock( clientId );
  const parentAttributes =  getParentAttributes( parentBlockId );
  const {visible,size,active_color,default_color,spacing,margin} = parentAttributes.star;

  const handleChangeValueToParent = (key) => (value) => {

    if (key in parentAttributes.star) {
      const newAttributes = {
        ...parentAttributes,
        star: {
          ...parentAttributes.star,
          [key]: value
        }
      };
      wp.data.dispatch('core/block-editor').updateBlockAttributes(parentBlockId, newAttributes);
    }
    setAttributes({ key: value });
  };

  const handleChangeRateNumberValue = (newValue) => {
      const parentBlockId = getParentBlockIdByBlockName('brandy/single-testimonial', clientId);
      if (parentBlockId) {
        const parentBlock = wp.data.select('core/block-editor').getBlock(parentBlockId);
        const newAttributes = {
          ...parentBlock.attributes,
          rating: newValue
        };
        wp.data.dispatch('core/block-editor').updateBlockAttributes(parentBlockId, newAttributes);
        setAttributes({ rating: newValue });
      } 
  };
  return (
    <>
      <InspectorControls key="setting">
       
        <div className="brandy-editor-star">
          <div className="brandy-editor-star__options brandy-editor-star__options__visible">
              <Label title={__("Show/Hide", "brandy")} />
              <ToggleControl
                checked={attributes.visible ?? visible}
                onChange={handleChangeValueToParent("visible")}
              />
          </div>
          <div className="brandy-editor-star__options">
            <Slider
              label={__("Rating")}
              value={attributes.rating}
              onChange={handleChangeRateNumberValue}
              min={0}
              max={5}
            />
          </div>
          <div className="brandy-editor-star__options">
            <Label title={__("Star size", "brandy")} />
            <Slider value={attributes.size??size} onChange={handleChangeValueToParent('size')} min="10" max="70" />
          </div>
          <div className="brandy-editor-star__options">
            <Label title={__("Spacing", "brandy")} />
            <Slider
              value={attributes.spacing??spacing}
              onChange={handleChangeValueToParent('spacing')}
              min="5"
              max="100"
            />
          </div>
      <div>
        <PanelColorSettings
            title={__("Star colors", "custom")}
            initialOpen={false}
            colorSettings={[
              {
                value: attributes.default_color??default_color,
                onChange: handleChangeValueToParent('default_color'),
                color:colors,
                label: __("Normal"),
              },
              {
                value: attributes.active_color??active_color,
                onChange: handleChangeValueToParent('active_color'),
                color:colors,
                label: __("Active"),
              },
            ]}
        />
      </div>
      <div style={{padding: "calc(16px)"}}>
        <Label
          title={__("Margin", "brandy")}
          style={{ display: "block", marginBottom: 10 }}
        />
        <Spacing value={attributes.margin??margin} onChange={handleChangeValueToParent('margin')} />
      </div>
        </div>
         
      </InspectorControls>
      <div className="brandy-testimonials__card__rating" {...blockProps}>
          {Array(5)
            .fill(true)
            .map((_, index) => (
              <span
                key={index}
                className="brandy-testimonials__card__rating-star"
                dangerouslySetInnerHTML={{
                  __html: `<svg width="26" height="24" viewBox="0 0 26 24" fill="" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.4772 0.978145C11.9116 -0.326048 13.8027 -0.326048 14.237 0.978145L16.2775 7.10518C16.4718 7.68843 17.0289 8.08332 17.6574 8.08332H24.2606C25.6661 8.08332 26.2505 9.8381 25.1134 10.6441L19.7714 14.4309C19.2628 14.7913 19.05 15.4303 19.2443 16.0135L21.2848 22.1406C21.7191 23.4448 20.1891 24.5293 19.052 23.7232L13.71 19.9365C13.2014 19.576 12.5128 19.576 12.0043 19.9365L6.66226 23.7232C5.52515 24.5293 3.99519 23.4448 4.42952 22.1406L6.47001 16.0135C6.66425 15.4303 6.45146 14.7913 5.94293 14.4309L0.600871 10.6441C-0.536233 9.8381 0.0481602 8.08332 1.4537 8.08332H8.05685C8.68542 8.08332 9.24251 7.68843 9.43675 7.10518L11.4772 0.978145Z"/>
              </svg>
              `,
                }}
              ></span>
            ))}
      </div>
    </>
  );

}

