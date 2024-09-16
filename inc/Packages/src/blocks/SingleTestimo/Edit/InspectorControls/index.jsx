export default function AllInspectorSettings({
  attributes,
  setAttributes,
  clientId,
  context,
}) {
  const handleSyncLayout = () => {
    window.dispatchEvent(
      new CustomEvent('brandySyncTestimonialsLayout', {
        detail: {
          rootId: context.rootId,
          clientId,
          layout: window.wp.data
            .select('core/block-editor')
            .getBlocks(clientId),
        },
      })
    );
  };
  return (
    <>
      <button onClick={handleSyncLayout}>Click</button>
    </>
  );
}
