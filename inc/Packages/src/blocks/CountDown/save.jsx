import { useBlockProps } from "@wordpress/block-editor";
import { getTypographyVariables } from "../../utils/helpers";

export default function Save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { countdownDate, overall, item } = attributes;
  const { main, prefix, suffix, dayOptions, hourOptions, minuteOptions, secondOptions, separator } = attributes;
  const countDownStyles = {
    "--prefix__color": prefix.color,
    "--main__color": main.color,
    "--main__bg__color": main.backgroundColor,
    "--suffix__color": suffix.color,
    "--separator__color": separator.color,
    "--overall__spacing": overall.spacing + 'px' ?? '30px',
    "--item__spacing": item.spacing + 'px' ?? '5px'
  };

  return <div {...blockProps}>
    <div className={`brandy-countdown-wrapper brandy-overall-direction-${overall.direction} brandy-item-direction-${item.direction} brandy-overall-align-${overall.align} brandy-item-align-${item.align}`} data-countdown={countdownDate}
      style={{
        ...getTypographyVariables("prefix", prefix.typography),
        ...getTypographyVariables("main", main.typography),
        ...getTypographyVariables("suffix", suffix.typography),
        ...getTypographyVariables("separator", separator.typography),
        ...countDownStyles,
      }}
    >
      {dayOptions.visible && (
        <>
          <div className="brandy-countdown-item">
            <span className="brandy-countdown-prefix">{dayOptions.prefix}</span>
            <span className="brandy-countdown-values brandy-countdown-days">00</span>
            <span className="brandy-countdown-suffix">{dayOptions.suffix}</span>
          </div>
          {"" !== separator.text && (<div class="brandy-countdown-separator">{separator.text}</div>)}
        </>

      )}

      {hourOptions.visible && (
        <>
          <div className="brandy-countdown-item">
            <span className="brandy-countdown-prefix">{hourOptions.prefix}</span>
            <span className="brandy-countdown-values brandy-countdown-hours">00</span>
            <span className="brandy-countdown-suffix">{hourOptions.suffix}</span>
          </div>
          {"" !== separator.text && (<div class="brandy-countdown-separator">{separator.text}</div>)}
        </>
      )}

      {minuteOptions.visible && (
        <>
          <div className="brandy-countdown-item">
            <span className="brandy-countdown-prefix">{minuteOptions.prefix}</span>
            <span className="brandy-countdown-values brandy-countdown-minutes">00</span>
            <span className="brandy-countdown-suffix">{minuteOptions.suffix}</span>
          </div>
          {"" !== separator.text && (<div class="brandy-countdown-separator">{separator.text}</div>)}

        </>
      )}

      {secondOptions.visible && (
        <div className="brandy-countdown-item">
          <span className="brandy-countdown-prefix">{secondOptions.prefix}</span>
          <span className="brandy-countdown-values brandy-countdown-seconds">00</span>
          <span className="brandy-countdown-suffix">{secondOptions.suffix}</span>
        </div>
      )}
    </div>
  </div>;
}
