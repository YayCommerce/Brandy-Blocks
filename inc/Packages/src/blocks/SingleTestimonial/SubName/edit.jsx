import {
  InspectorControls,
  RichText,
  useBlockProps,
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";
import { PanelColorSettings, useSetting } from '@wordpress/block-editor';
import Label from "../../../components/Label";
import Spacing from "../../../components/Spacing";
import Typography from "../../../components/Typography";
import { ToggleControl } from "@wordpress/components";

import {
  getParentBlock,
  getParentAttributes,
  getParentBlockIdByBlockName,
} from "../../../utils/helpers";

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();
  const colors = useSetting("color.palette.default");

  const parentBlockId = getParentBlock( clientId );
  const parentAttributes =  getParentAttributes( parentBlockId );
  const {visible,color,typography,margin} = parentAttributes.subname;

  const handleChangeValueToParent = (key) => (value) => {
    
    if (key in parentAttributes.subname) {
      const newAttributes = {
        ...parentAttributes,
        subname: {
          ...parentAttributes.subname,
          [key]: value
        }
      };
      wp.data.dispatch('core/block-editor').updateBlockAttributes(parentBlockId, newAttributes);
    }
    setAttributes({ key: value });
  };

  const handleChangeNameValue = (newValue) => {

      const parentBlockId = getParentBlockIdByBlockName('brandy/single-testimonial', clientId);
  
      if (parentBlockId) {
        const parentBlock = wp.data.select('core/block-editor').getBlock(parentBlockId);
        const newAttributes = {
          ...parentBlock.attributes,
          subname: newValue
        };
        wp.data.dispatch('core/block-editor').updateBlockAttributes(parentBlockId, newAttributes);
        setAttributes({ subname: newValue });
      } 
  };

  return (
    <>
      <InspectorControls key="setting">
        <div className="brandy-editor-testimonial-subname">
          <div className="brandy-editor-testimonial-subname__options brandy-editor-testimonial-subname__options__visible">
              <Label title={__("Show/Hide", "brandy")} />
              <ToggleControl
                checked={attributes.visible ?? visible}
                onChange={handleChangeValueToParent("visible")}
              />
          </div>
          <div className="brandy-editor-testimonial-subname__options brandy-editor-testimonial-subname__options__color">
              <PanelColorSettings
                title={__("Color", "custom")}
                initialOpen={false}
                colorSettings={[
                  {
                    value: attributes.color??color,
                    onChange: handleChangeValueToParent("color"),
                    color:colors,
                    label: __("Text"),
                  },
                ]}
              />
          </div>
          <div className="brandy-editor-testimonial-subname__options brandy-editor-testimonial-subname__options__typography">
              <Label title={__("Typography", "brandy")} style={{ marginBottom: 0 }} />
              <Typography
                value={attributes.typography??typography}
                onChange={handleChangeValueToParent("typography")}
              />
          </div>

          <div className="brandy-editor-testimonial-subname__options brandy-editor-testimonial-subname__options__margin">
                <Label title={__("Margin", "brandy")} />
                <Spacing
                  value={attributes.margin??margin}
                  onChange={handleChangeValueToParent("margin")}
                />
          </div>

        </div>
      
      </InspectorControls>
      <RichText
        {...blockProps}
        tagName="p"
        value={attributes.subname}
        onChange={handleChangeNameValue}
        placeholder={__("Enter subname...")}
        className="brandy-testimonials__card__subname"
      />
    </>
  );

}
