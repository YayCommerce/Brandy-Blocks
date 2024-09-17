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
              { name: 'general', title: __('General Settings'), icon: <svg mlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M10.289 4.836A1 1 0 0111.275 4h1.306a1 1 0 01.987.836l.244 1.466c.787.26 1.503.679 2.108 1.218l1.393-.522a1 1 0 011.216.437l.653 1.13a1 1 0 01-.23 1.273l-1.148.944a6.025 6.025 0 010 2.435l1.149.946a1 1 0 01.23 1.272l-.653 1.13a1 1 0 01-1.216.437l-1.394-.522c-.605.54-1.32.958-2.108 1.218l-.244 1.466a1 1 0 01-.987.836h-1.306a1 1 0 01-.986-.836l-.244-1.466a5.995 5.995 0 01-2.108-1.218l-1.394.522a1 1 0 01-1.217-.436l-.653-1.131a1 1 0 01.23-1.272l1.149-.946a6.026 6.026 0 010-2.435l-1.148-.944a1 1 0 01-.23-1.272l.653-1.131a1 1 0 011.217-.437l1.393.522a5.994 5.994 0 012.108-1.218l.244-1.466zM14.929 12a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"></path></svg>, className: 'general-tab' },
              { name: 'timeUnits', title:__('Time Unit Settings'), icon: <span class="dashicon dashicons dashicons-clock"></span>, className: 'time-units-tab' },
              { name: 'textStyling', title: __('Text Styling Settings'),icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false"><path d="M12 4c-4.4 0-8 3.6-8 8v.1c0 4.1 3.2 7.5 7.2 7.9h.8c4.4 0 8-3.6 8-8s-3.6-8-8-8zm0 15V5c3.9 0 7 3.1 7 7s-3.1 7-7 7z"></path></svg>, className: 'text-styling-tab' },
            ]}
          >
            {(tab) => (
              <div className={`brandy-settings-tab ${tab.name}-settings`}>
                {tab.name === 'general' && (
                  <GeneralSettings/>
                )}
                
                {tab.name === 'timeUnits' && (
                  <TimeUnitSettings/>
                )}

                {tab.name === 'textStyling' && (
                  <TextStylingSettings/>
                )}
              </div>
            )}
          </TabPanel>
        </InspectorControls>
    </Fragment>
    
  );
}
