import { CountDownContext } from "../edit";
import { useContext } from "@wordpress/element";
import { PanelBody } from "@wordpress/components";
import Typography from "../../../components/Typography";
import Label from "../../../components/Label";
import { __ } from "@wordpress/i18n";
const { PanelColorSettings } = wp.blockEditor;
export default function TextStylingSettings() {
  const { attributes, setAttributes } = useContext(CountDownContext);

  const handleChangeObjectValues = (objectName, key) => (value) => {
    setAttributes({
      [objectName]: {
        ...attributes[objectName],
        [key]: value,
      },
    });
  };

  return (
    <div>
        <PanelColorSettings
            title={__('Color Settings')}
            colorSettings={[
                {
                    value: attributes.prefix.color,
                    onChange: handleChangeObjectValues('prefix','color'),
                    label: __('Prefix'),
                },
                {
                    value: attributes.main.color,
                    onChange: handleChangeObjectValues('main','color'),
                    label: __('Main'),
                },
                {
                    value: attributes.suffix.color,
                    onChange: handleChangeObjectValues('suffix','color'),
                    label: __('Suffix'),
                },
            ]}
        />
        <PanelBody title={__('Typography Settings')}>
            <div className="brandy-countdown-typography-settings" >
                <Label title={__("Prefix")}  />
                <Typography
                    value={attributes.prefix.typography}
                    onChange={handleChangeObjectValues('prefix','typography')}
                />
            </div>
            <div className="brandy-countdown-typography-settings" >
                <Label title={__("Main")}  />
                <Typography
                    value={attributes.main.typography}
                    onChange={handleChangeObjectValues('main','typography')}
                />
            </div>
            <div className="brandy-countdown-typography-settings" >
                <Label title={__("Suffix")}  />
                <Typography
                    value={attributes.suffix.typography}
                    onChange={handleChangeObjectValues('suffix','typography')}
                />
            </div>         
        </PanelBody>
                    
    </div>
  );
}
