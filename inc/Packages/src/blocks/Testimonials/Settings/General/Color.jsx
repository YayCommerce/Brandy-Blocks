import { useContext } from "@wordpress/element";

import { PanelColorSettings, useSetting
 } from '@wordpress/block-editor';
import { __ } from "@wordpress/i18n";

import { TestimonialsContext } from "../../edit";


export default function Color() {
  
  const { attributes, setAttributes } = useContext(TestimonialsContext);
  const colors = useSetting("color.palette.default");

  const handleChangeTextColor = (key) => (newColor) => {
    const attr_option = 'star' === key ? 'active_color' : 'color';
    setAttributes({
        [key]: {
            ...attributes[key],
            [attr_option] : newColor
        },
    });
  };

  return (
    <div className="">
        <PanelColorSettings
            __experimentalIsRenderedInSidebar
            title={__( 'Text color' )}
            initialOpen={true}
            colorSettings={[
                {
                    value: attributes.name.color,
                    onChange: handleChangeTextColor('name'),
                    label: __( 'Name' ),
                    colors: colors,
                },
                {
                    value: attributes.subname.color,
                    onChange: handleChangeTextColor('subname'),
                    label: __( 'Subname' ),
                    colors: colors,
                },
                {
                    value: attributes.content.color,
                    onChange: handleChangeTextColor('content'),
                    label: __( 'Content' ),
                    colors: colors,
                },
                {
                    value: attributes.star.active_color,
                    onChange: handleChangeTextColor('star'),
                    label: __( 'Star' ),
                    colors: colors,
                },
            ]}
        />
  </div>


  );
}
