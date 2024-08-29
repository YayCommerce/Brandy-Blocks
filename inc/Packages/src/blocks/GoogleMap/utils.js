export const getExtraDOMAttributes = (attributes) => {
  const { currentAddress, mapStyle, zoomLevel, language } = attributes;
  return {
    "data-current-address": currentAddress,
    "data-map-style": mapStyle,
    "data-zoom-level": zoomLevel,
    "data-language": language,
  };
};
