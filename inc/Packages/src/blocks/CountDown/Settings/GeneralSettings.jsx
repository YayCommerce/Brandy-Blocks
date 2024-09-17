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
import HorizontalAlignment from "../../../components/HorizontalAlignment";
import { __ } from "@wordpress/i18n";
const { useEffect, useState } = wp.element;

export default function GeneralSettings() {
  const { attributes, setAttributes } = useContext(CountDownContext);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { countdownDate,overallDirection,itemDirection,overallAlign,itemAlign } = attributes;
  
  useEffect(() => {
    if (!countdownDate){
      const now = new Date();
      now.setDate(now.getDate() + 30);
      setAttributes({ countdownDate: formatDate(now) });
    }
  }, []);

  const handleChangeValue = (key) => (value) => {
    setAttributes({
      [key]: value,
    });
  };

  const formatDate = (dateInput) => {
    let isoString  = '';
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
        {isDatePickerOpen && (  <Popover position="bottom left" onFocusOutside={() => setIsDatePickerOpen(false)} >
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
          value={overallDirection}
          isBlock
          __nextHasNoMarginBottom
          onChange={handleChangeValue('overallDirection')}
        >
        <ToggleGroupControlOption value="horizontal" label={__("Horizontal")} />
        <ToggleGroupControlOption value="vertical" label={__("Vertical")} />
        </ToggleGroupControl>
    </div>

    <div className="brandy-countdown-settings">
       <ToggleGroupControl
        label={__("Item Direction")}
        value={itemDirection}
        isBlock
        __nextHasNoMarginBottom
        onChange={handleChangeValue('itemDirection')}
      >
        <ToggleGroupControlOption value="horizontal" label={__("Horizontal")} />
        <ToggleGroupControlOption value="vertical" label={__("Vertical")} />
      </ToggleGroupControl>
    </div>

    <div className="brandy-countdown-settings">
      <Label title={__("Overall Alignment")} />
      <HorizontalAlignment
        selected={overallAlign}
        onChange={handleChangeValue('overallAlign')}
      />
    </div>

    <div className="brandy-countdown-settings">
        <Label title={__("Item Alignment")} />
        <HorizontalAlignment
          selected={itemAlign}
          onChange={handleChangeValue('itemAlign')}
        />
    </div>
    </PanelBody>
  );
}
