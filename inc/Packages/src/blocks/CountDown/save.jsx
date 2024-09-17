import { useBlockProps } from "@wordpress/block-editor";
import { getTypographyVariables} from "../../utils/helpers";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  const {countdownDate,overallDirection,itemDirection,overallAlign,itemAlign}  = attributes;
  const {main,prefix,suffix,dayOptions,hourOptions,minuteOptions,secondOptions}  = attributes;
  const countDownStyles = {
    "--prefix__color": prefix.color ?? '#334155',
    "--main__color": main.color ?? '#334155',
    "--suffix__color": suffix.color ?? '#334155',
  };

  return <div {...blockProps}>
        <div className={`brandy-countdown-wrapper brandy-overall-direction-${overallDirection} brandy-item-direction-${itemDirection} brandy-overall-align-${overallAlign} brandy-item-align-${itemAlign}`} data-countdown={countdownDate}
          style={{
            ...getTypographyVariables("prefix", prefix.typography),
            ...getTypographyVariables("main", main.typography),
            ...getTypographyVariables("suffix", suffix.typography),
            ...countDownStyles,
          }}
        >
            { dayOptions.visible && (<div className="brandy-countdown-item">
                  <span className="brandy-countdown-prefix">{dayOptions.prefix}</span>
                  <span className="brandy-countdown-values brandy-countdown-days">00</span>
                  <span className="brandy-countdown-suffix">{dayOptions.suffix}</span>
                </div>
            )}
            { hourOptions.visible && (
                <div className="brandy-countdown-item">
                  <span className="brandy-countdown-prefix">{hourOptions.prefix}</span>
                  <span className="brandy-countdown-values brandy-countdown-hours">00</span>
                  <span className="brandy-countdown-suffix">{hourOptions.suffix}</span>
                </div>
            )}
            { minuteOptions.visible && (
                <div className="brandy-countdown-item">
                  <span className="brandy-countdown-prefix">{minuteOptions.prefix}</span>
                  <span className="brandy-countdown-values brandy-countdown-minutes">00</span>
                  <span className="brandy-countdown-suffix">{minuteOptions.suffix}</span>
                </div>
            )}
            { secondOptions.visible && (
                <div className="brandy-countdown-item">
                  <span className="brandy-countdown-prefix">{secondOptions.prefix}</span>
                  <span className="brandy-countdown-values brandy-countdown-seconds">00</span>
                  <span className="brandy-countdown-suffix">{secondOptions.suffix}</span>
                </div>
            )}
      </div>
  </div>;
}
