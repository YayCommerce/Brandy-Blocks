export const getExtraDOMAttributes = (attributes) => {
  const { jumpTo, sectionSelector, scrollBehaviour, scrollDuration } =
    attributes;
  return {
    ["data-jump-to"]: jumpTo ?? "top",
    ...(jumpTo === "section"
      ? { ["data-jump-section"]: sectionSelector ?? "#" }
      : {}),
    ["data-scroll-behaviour"]: scrollBehaviour ?? "smooth",
    ...(scrollBehaviour === "custom"
      ? { ["data-scroll-duration"]: scrollDuration ?? 3000 }
      : {}),
  };
};

export const getWrapperDOMAttributes = (attributes) => {
  const { display, position } = attributes;
  return {
    class: "wp-block-brandy-jump-to-section-trigger",
    style: {
      position: display ?? "relative",
      ...(display === "fixed"
        ? {
            top: position?.top ?? "",
            left: position?.left ?? "",
            right: position?.right ?? "",
            bottom: position?.bottom ?? "",
            zIndex: 100,
          }
        : {}),
    },
  };
};
