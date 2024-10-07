import { CountDownContext } from "../edit";
import { useContext } from "@wordpress/element";
import {
  PanelBody,
  TextControl,
  Popover,
  DatePicker,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import Label from "../../../components/Label";
import SubLabel from "../../../components/SubLabel";
import Slider from "../../../components/Slider";
import HorizontalAlignment from "../../../components/HorizontalAlignment";
import { __ } from "@wordpress/i18n";
const { useEffect, useState } = wp.element;

export default function GeneralSettings() {
  const { attributes, setAttributes } = useContext(CountDownContext);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { countdownDate, overall, item } = attributes;

  useEffect(() => {
    if (!countdownDate) {
      const now = new Date();
      now.setDate(now.getDate() + 30);
      setAttributes({ countdownDate: formatDate(now) });
    }
  }, []);

  const handleChangeValue = (objectName, key) => (value) => {
    setAttributes({
      [objectName]: {
        ...attributes[objectName],
        [key]: value,
      },
    });
  };

  const formatDate = (dateInput) => {
    let isoString = '';
    if (typeof dateInput === 'string' || dateInput instanceof String) {
      isoString = new Date(dateInput).toISOString()
    } else if (dateInput instanceof Date) {
      isoString = dateInput.toISOString();
    }
    const date = isoString.substring(0, 10);
    const time = isoString.substring(11, 19);
    return `${date} ${time}`;
  };

  return (
    <PanelBody>
      <div>
        <label>{__('Date', 'brandy-blocks')}</label>
        <TextControl
          value={countdownDate}
          readOnly={true}
          onClick={() => setIsDatePickerOpen(true)}
          style={{ cursor: 'pointer' }}
        />
        {isDatePickerOpen && (<Popover position="bottom left" onFocusOutside={() => setIsDatePickerOpen(false)} >
          <DatePicker
            currentDate={countdownDate}
            onChange={(dateInput) => {
              setAttributes({ countdownDate: formatDate(dateInput) });
              setIsDatePickerOpen(false);
            }}
            onClose={() => setIsDatePickerOpen(false)}
          />
        </Popover>
        )}
      </div>

      {/* Overall and Item Settings */}
      <div className="brandy-countdown-settings">
        <ToggleGroupControl
          label={__("Overall Direction")}
          value={overall.direction}
          isBlock
          __nextHasNoMarginBottom
          onChange={handleChangeValue('overall', 'direction')}
        >
          <ToggleGroupControlOption value="horizontal" label={__("Horizontal")} />
          <ToggleGroupControlOption value="vertical" label={__("Vertical")} />
        </ToggleGroupControl>
      </div>

      <div className="brandy-countdown-settings">
        <ToggleGroupControl
          label={__("Item Direction")}
          value={item.direction}
          isBlock
          __nextHasNoMarginBottom
          onChange={handleChangeValue('item', 'direction')}
        >
          <ToggleGroupControlOption value="horizontal" label={__("Horizontal")} />
          <ToggleGroupControlOption value="vertical" label={__("Vertical")} />
        </ToggleGroupControl>
      </div>

      <div className="brandy-countdown-settings">
        <Label title={__("Overall Alignment")} />
        <HorizontalAlignment
          selected={overall.align}
          onChange={handleChangeValue('overall', 'align')}
        />
      </div>

      <div className="brandy-countdown-settings">
        <Label title={__("Item Alignment")} />
        <HorizontalAlignment
          selected={item.align}
          onChange={handleChangeValue('item', 'align')}
        />
      </div>

      <div className="brandy-countdown-settings">
        <div>
          <SubLabel title={__("Overall Spacing")} />
          <Slider
            value={overall.spacing}
            onChange={handleChangeValue('overall', 'spacing')}
            min="0"
            max="200"
          />
        </div>
        <div>
          <SubLabel title={__("Item Spacing")} />
          <Slider
            value={item.spacing}
            onChange={handleChangeValue('item', 'spacing')}
            min="0"
            max="200"
          />
        </div>
      </div>
    </PanelBody>
  );
}
