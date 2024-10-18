export const getTypographyVariables = (prefix = "default", typography) => {
  return {
    [`--${prefix}-font-size`]: typography.font_size + "px",
    [`--${prefix}-bold`]: typography.bold ? "bold" : "",
    [`--${prefix}-font-styles`]: typography.italic ? "italic" : "normal",
    [`--${prefix}-text-transform`]: typography.text_transform,
    [`--${prefix}-font-weight`]: typography.font_weight + "",
  };
};

export const getShadowValue = (shadow) => {
  return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
};
export const getPaddingValue = (padding) => {
  return `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;
};

export const getStarFillPercentage = (index, rate) => {
  if (index + 1 <= rate) return 100;
  if (index < rate) return (rate % 1) * 100;
  return 0;
};