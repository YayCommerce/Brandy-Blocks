import { CountDownContext } from "../edit";
import { useContext } from "@wordpress/element";
import {
  PanelBody,
  TextControl,
  ToggleControl,
  TabPanel,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function TimeUnitSettings() {
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
    <PanelBody>
      <TabPanel className="brandy-tab-panel" activeClass="active-tab"
        tabs={[
          { name: 'dayOptions', title: 'Days', className: 'days-tab' },
          { name: 'hourOptions', title: 'Hours', className: 'hours-tab' },
          { name: 'minuteOptions', title: 'Minutes', className: 'minutes-tab' },
          { name: 'secondOptions', title: 'Seconds', className: 'seconds-tab' },
        ]}
      >
        {(unitTab) => (
          <div className={`brandy-time-unit-settings ${unitTab.name}-settings`}>
            <div className="brandy-countdown-settings">
              <ToggleControl
                label={__('Visibility')}
                checked={attributes[unitTab.name].visible}
                onChange={handleChangeObjectValues(unitTab.name, 'visible')}
              />
            </div>
            <TextControl
              label={__('Prefix')}
              value={attributes[unitTab.name].prefix}
              onChange={handleChangeObjectValues(unitTab.name, 'prefix')}
            />
            <TextControl
              label={__('Suffix')}
              value={attributes[unitTab.name].suffix}
              onChange={handleChangeObjectValues(unitTab.name, 'suffix')}
            />

          </div>
        )}
      </TabPanel>
      <div className="brandy-separator-settings">
        <TextControl
          label={__('Separator')}
          value={attributes.separator.text}
          onChange={handleChangeObjectValues('separator', 'text')}
        />
      </div>
    </PanelBody>
  );
}
