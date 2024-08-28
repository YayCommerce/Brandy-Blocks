export const getExtraDOMAttributes = (attributes) => {
  const { apiKey, currentAddress, mapStyle, zoomLevel, language } = attributes;
  return {
    "data-api-key": apiKey,
    "data-current-address": currentAddress,
    "data-map-style": mapStyle,
    "data-zoom-level": zoomLevel,
    "data-language": language,
  };
};
