import { InspectorControls } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
const { Fragment } = wp.element;
import GeneralSettings from "./GeneralSettings";
import TimeUnitSettings from "./TimeUnitSettings";
import TextStylingSettings from "./TextStylingSettings";
import {
  TabPanel,
} from "@wordpress/components";

export default function Settings() {

  return (
    <Fragment>
      <InspectorControls>
        <TabPanel className="brandy-tab-panel"
          activeClass="active-tab"
          tabs={[
            { name: 'general', title: __('General'), className: 'general-tab' },
            { name: 'timeUnits', title: __('Time Unit'), className: 'time-units-tab' },
            { name: 'textStyling', title: __('Styling'), className: 'text-styling-tab' },
          ]}
        >
          {(tab) => (
            <div className={`brandy-settings-tab ${tab.name}-settings`}>
              {tab.name === 'general' && (
                <GeneralSettings />
              )}

              {tab.name === 'timeUnits' && (
                <TimeUnitSettings />
              )}

              {tab.name === 'textStyling' && (
                <TextStylingSettings />
              )}
            </div>
          )}
        </TabPanel>
      </InspectorControls>
    </Fragment>

  );
}
