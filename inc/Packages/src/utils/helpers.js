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

export const getParentBlockIdByBlockName = (block_name, clientId) => {
  const parentBlockIds = wp.data.select('core/block-editor').getBlockParents(clientId);
  return parentBlockIds.find(id => {
    const block = wp.data.select('core/block-editor').getBlock(id);
    return block.name === block_name;
  });
};

export const getParentBlock = (clientId) => {
  const parentBlockId = wp.data.select('core/block-editor').getBlockParents(clientId)[0];
  return parentBlockId;
};

export const getParentAttributes = (parentBlockId) => {
  if (!parentBlockId) {
    return false;
  }
  const parentAttributes = wp.data.select('core/block-editor').getBlock(parentBlockId);
  return parentAttributes.attributes;
}