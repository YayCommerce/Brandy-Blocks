import { ToolbarGroup, Button } from '@wordpress/components';
import {
  BlockControls as CoreBlockControls,
  AlignmentControl,
} from '@wordpress/block-editor';

export default function BlockControls({
  context,
  clientId,
  attributes,
  setAttributes,
}) {
  const handleSyncLayout = () => {
    window.dispatchEvent(
      new CustomEvent('brandySyncTestimonialsLayout', {
        detail: {
          rootId: context.rootId,
          singleId: context.singleTestimonialId,
          syncBlocks: ['name'],
          blockId: clientId,
        },
      })
    );
  };
  return (
    <CoreBlockControls group="block">
      <ToolbarGroup>
        <Button isPrimary onClick={handleSyncLayout}>
          Sync all testinomial name
        </Button>
      </ToolbarGroup>
      <AlignmentControl
        value={attributes.align ?? 'left'}
        onChange={(newAlign) =>
          setAttributes({
            align: newAlign,
          })
        }
      />
    </CoreBlockControls>
  );
}
