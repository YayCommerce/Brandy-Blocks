import { useSelect, dispatch } from "@wordpress/data";

export default function useViewport() {
  const viewport = useSelect((select) => {
    return select("core/edit-post").__experimentalGetPreviewDeviceType();
  });
  const setViewport = (value) => {
    dispatch("core/edit-post").__experimentalSetPreviewDeviceType(value);
  };
  return {
    viewport,
    setViewport,
  };
}
