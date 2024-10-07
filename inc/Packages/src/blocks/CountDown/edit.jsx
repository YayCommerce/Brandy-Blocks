import { useBlockProps } from "@wordpress/block-editor";
import { createContext, useMemo } from "@wordpress/element";
import { getTypographyVariables, } from "../../utils/helpers";
const { useEffect, useState } = wp.element;
import { __ } from "@wordpress/i18n";

import Settings from "./Settings";
export const CountDownContext = createContext({});

export default function Edit({ attributes, setAttributes, clientId }) {
  const blockProps = useBlockProps();
  const dataAttributes = useMemo(
    () => ({
      countdownDate: attributes.countdownDate ?? metadata.attributes.countdownDate.default,
      overall: attributes.overall ?? metadata.attributes.overall.default,
      item: attributes.item ?? metadata.attributes.item.default,
      main: attributes.main ?? metadata.attributes.main.default,
      prefix: attributes.prefix ?? metadata.attributes.prefix.default,
      suffix: attributes.suffix ?? metadata.attributes.suffix.default,
      dayOptions: attributes.dayOptions ?? metadata.attributes.dayOptions.default,
      hourOptions: attributes.hourOptions ?? metadata.attributes.hourOptions.default,
      minuteOptions: attributes.minuteOptions ?? metadata.attributes.minuteOptions.default,
      secondOptions: attributes.secondOptions ?? metadata.attributes.secondOptions.default,
      separator: attributes.separator ?? metadata.attributes.separator.default,
    }),
    [attributes]
  );

  const contextValue = useMemo(
    () => ({
      attributes: dataAttributes,
      setAttributes,
    }),
    [dataAttributes, setAttributes]
  );

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  useEffect(() => {

    const interval = setInterval(() => {
      if (!dataAttributes.countdownDate) return;

      const now = new Date().getTime();
      const target = new Date(dataAttributes.countdownDate).getTime();

      const difference = target - now;

      if (difference < 0) {
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });

    }, 1000);

    return () => clearInterval(interval);

  }, [dataAttributes.countdownDate]);

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const countDownStyles = {
    "--prefix__color": dataAttributes.prefix.color,
    "--main__color": dataAttributes.main.color,
    "--main__bg__color": dataAttributes.main.backgroundColor,
    "--suffix__color": dataAttributes.suffix.color,
    "--separator__color": dataAttributes.separator.color,
    "--overall__spacing": dataAttributes.overall.spacing + 'px' ?? '30px',
    "--item__spacing": dataAttributes.item.spacing + 'px' ?? '5px'
  };

  return (
    <div {...blockProps} className={blockProps.className + " block-upgraded"}>

      <CountDownContext.Provider value={contextValue}>
        <Settings />
        <div className={`brandy-countdown-wrapper brandy-overall-direction-${dataAttributes.overall.direction} brandy-item-direction-${dataAttributes.item.direction} brandy-overall-align-${dataAttributes.overall.align} brandy-item-align-${dataAttributes.item.align}`}
          style={{
            ...getTypographyVariables("prefix", dataAttributes.prefix.typography),
            ...getTypographyVariables("main", dataAttributes.main.typography),
            ...getTypographyVariables("suffix", dataAttributes.suffix.typography),
            ...getTypographyVariables("separator", dataAttributes.separator.typography),
            ...countDownStyles,
          }}
        >
          {dataAttributes.dayOptions.visible && (
            <>
              <div className="brandy-countdown-item">
                <span className="brandy-countdown-prefix">{dataAttributes.dayOptions.prefix}</span>
                <span className="brandy-countdown-values brandy-countdown-days">{formatNumber(time.days)}</span>
                <span className="brandy-countdown-suffix">{dataAttributes.dayOptions.suffix}</span>
              </div>
              {"" !== dataAttributes.separator.text && (<div class="brandy-countdown-separator">{dataAttributes.separator.text}</div>)}
            </>
          )}

          {dataAttributes.hourOptions.visible && (
            <>
              <div className="brandy-countdown-item">
                <span className="brandy-countdown-prefix">{dataAttributes.hourOptions.prefix}</span>
                <span className="brandy-countdown-values brandy-countdown-hours">{formatNumber(time.hours)}</span>
                <span className="brandy-countdown-suffix">{dataAttributes.hourOptions.suffix}</span>
              </div>
              {"" !== dataAttributes.separator.text && (<div class="brandy-countdown-separator">{dataAttributes.separator.text}</div>)}
            </>
          )}

          {dataAttributes.minuteOptions.visible && (
            <>
              <div className="brandy-countdown-item">
                <span className="brandy-countdown-prefix">{dataAttributes.minuteOptions.prefix}</span>
                <span className="brandy-countdown-values brandy-countdown-minutes">{formatNumber(time.minutes)}</span>
                <span className="brandy-countdown-suffix">{dataAttributes.minuteOptions.suffix}</span>
              </div>
              {"" !== dataAttributes.separator.text && (<div class="brandy-countdown-separator">{dataAttributes.separator.text}</div>)}
            </>
          )}

          {dataAttributes.secondOptions.visible && (
            <div className="brandy-countdown-item">
              <span className="brandy-countdown-prefix">{dataAttributes.secondOptions.prefix}</span>
              <span className="brandy-countdown-values brandy-countdown-seconds">{formatNumber(time.seconds)}</span>
              <span className="brandy-countdown-suffix">{dataAttributes.secondOptions.suffix}</span>
            </div>
          )}
        </div>
      </CountDownContext.Provider>
    </div>
  );
}
