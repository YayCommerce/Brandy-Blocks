import { ToolbarGroup, Button } from '@wordpress/components';
import { BlockControls as CoreBlockControls } from '@wordpress/block-editor';

export default function BlockControls({ context, clientId }) {
  const handleSyncLayout = () => {
    window.dispatchEvent(
      new CustomEvent('brandySyncTestimonialsLayout', {
        detail: {
          rootId: context.rootId,
          singleId: context.singleTestimonialId,
          syncBlocks: ['rating'],
          blockId: clientId,
        },
      })
    );
  };
  return (
    <CoreBlockControls>
      <ToolbarGroup>
        <Button isPrimary onClick={handleSyncLayout}>
          Sync all rating stars
        </Button>
      </ToolbarGroup>
    </CoreBlockControls>
  );
}
