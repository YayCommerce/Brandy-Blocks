import { registerBlockType } from '@wordpress/blocks';
import { commentAuthorAvatar as icon } from '@wordpress/icons';

import metadata from './block.json';
import Save from './save';
import Edit from './edit';

registerBlockType(metadata.name, {
  edit: Edit,
  save: Save,
  icon,
});
