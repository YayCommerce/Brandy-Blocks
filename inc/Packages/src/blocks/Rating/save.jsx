import { useBlockProps } from "@wordpress/block-editor";
import { getStarFillPercentage } from "../../utils/helpers";

const Save = ({ attributes }) => {
  const blockProps = useBlockProps.save();
  return (
    <div {...blockProps}>
      <div className="brandy-star-wrapper" style={{ display: 'flex', justifyContent: attributes.alignment, gap: `${attributes.spacing}px` }}>
        {Array.from({ length: attributes.starNumbers }, (_, index) => {
          const fillPercentage = getStarFillPercentage(index, attributes.rate);
          const starStyle = { width: `${attributes.starSize}px`, height: `${attributes.starSize}px`, position: 'relative' };
          const svgStyle = { position: 'absolute', top: 0, left: 0 };

          return (
            <div key={index} style={starStyle}>
              <svg viewBox="0 0 24 24" width={attributes.starSize} height={attributes.starSize} style={svgStyle}>
                <polygon points="12 17.27 18.18 21 15.64 13.97 21 9.24 13.81 8.63 12 2 10.19 8.63 3 9.24 8.36 13.97 5.82 21 12 17.27" fill={attributes.unmarkColor} />
              </svg>
              <svg viewBox="0 0 24 24" width={attributes.starSize} height={attributes.starSize} style={{ ...svgStyle, clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}>
                <polygon points="12 17.27 18.18 21 15.64 13.97 21 9.24 13.81 8.63 12 2 10.19 8.63 3 9.24 8.36 13.97 5.82 21 12 17.27" fill={attributes.markColor} />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Save;
