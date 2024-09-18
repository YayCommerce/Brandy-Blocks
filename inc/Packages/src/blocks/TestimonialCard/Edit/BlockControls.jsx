import { ToolbarGroup, Button } from '@wordpress/components';
import { BlockControls as CoreBlockControls } from '@wordpress/block-editor';

export default function BlockControls({ context, clientId }) {
  const handleSyncLayout = () => {
    window.dispatchEvent(
      new CustomEvent('brandySyncTestimonialsLayout', {
        detail: {
          rootId: context.rootId,
          singleId: clientId,
          syncBlocks: ['all'],
        },
      })
    );
  };
  return (
    <CoreBlockControls>
      <ToolbarGroup>
        <Button isPrimary onClick={handleSyncLayout}>
          Sync all testinomial card
        </Button>
      </ToolbarGroup>
    </CoreBlockControls>
  );
}
