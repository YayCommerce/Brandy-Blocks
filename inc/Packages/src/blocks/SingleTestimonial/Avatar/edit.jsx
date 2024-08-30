import {
  InspectorControls,
  InnerBlocks,
  useBlockProps,
} from "@wordpress/block-editor";

import { useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ToggleControl } from "@wordpress/components";
import Label from "../../../components/Label";
import Slider from "../../../components/Slider";
import Spacing from "../../../components/Spacing";
import {
  getParentBlock,
  getParentAttributes
} from "../../../utils/helpers";

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();
  
  const parentBlockId = getParentBlock( clientId );
  const parentAttributes =  getParentAttributes( parentBlockId );

  const {visible,size,border_radius,margin} = parentAttributes.avatar;

  const template = useMemo(() => {
    return [
      [
        'core/image', 
        {
          className: "brandy-testimonials__card__avatar",
          url: attributes.image,
          alt: "testimonial-avatar"
        }
      ]
    ];
  }, [attributes]);

  const handleChangeValueToParent = (key) => (value) => {
    
    if (key in parentAttributes.avatar) {
      const newAttributes = {
        ...parentAttributes,
        avatar: {
          ...parentAttributes.avatar,
          [key]: value
        }
      };
      wp.data.dispatch('core/block-editor').updateBlockAttributes(parentBlockId, newAttributes);
    }
    setAttributes({ key: value });
  };

  return (
    <div className="brandy-testimonials__wrapper__avatar" {...blockProps}>
      <InspectorControls key="setting">
        <div className="brandy-editor-avatar">
          <div className="brandy-editor-avatar__options brandy-editor-avatar__options__visible">
              <Label title={__("Show/Hide", "brandy")} />
              <ToggleControl
                checked={attributes.visible ?? visible}
                onChange={handleChangeValueToParent("visible")}
              />
          </div>

          <div className="brandy-editor-avatar__options">
              <Label title={__("Size", "brandy")} />
              <Slider
                value={attributes.size??size}
                onChange={handleChangeValueToParent("size")}
                min="20"
                max="200"
              />
          </div>
          <div className="brandy-editor-avatar__options">
              <Label
                title={__("Border radius", "brandy")}
                style={{ display: "block", marginBottom: 10 }}
              />
              <Spacing
                value={attributes.border_radius ??border_radius}
                onChange={handleChangeValueToParent("border_radius")}
              />
          </div>
          <div className="brandy-editor-avatar__options">
              <Label
                title={__("Margin", "brandy")}
                style={{ display: "block", marginBottom: 10 }}
              />
              <Spacing
                value={attributes.margin??margin}
                onChange={handleChangeValueToParent("margin")}
              />
          </div>
        </div>
      </InspectorControls>
      <div className="brandy-testimonials__wrapper__avatar">
        <InnerBlocks template={template} templateLock="all" />
      </div>
      
    </div>
  );

}
