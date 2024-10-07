import {
  __experimentalUnitControl as UnitControl,
  ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from '../../block.json';

export default function PaginationControls({ attributes, setAttributes }) {
  const {} = attributes;

  const handleChangePagination = (key, value) => {
    setAttributes({
      pagination: {
        ...attributes.pagination,
        [key]: value,
      },
    });
  };
  return (
    <>
      <ToggleControl
        __nextHasNoMarginBottom
        label="Has pagination?"
        checked={attributes.pagination?.enabled ?? true}
        onChange={(v) => {
          handleChangePagination('enabled', v);
        }}
      />
      <UnitControl
        label={__('Pagination bullet size')}
        onChange={(v) => {
          handleChangePagination('size', v);
        }}
        value={
          attributes.pagination?.size ??
          metadata.attributes.pagination.default.size
        }
        units={[{ value: 'px', label: 'px', default: 50 }]}
      />
      <UnitControl
        label={__('Pagination bullet spacing')}
        onChange={(v) => {
          handleChangePagination('spacing', v);
        }}
        units={[{ value: 'px', label: 'px', default: 0 }]}
        value={
          attributes.pagination?.spacing ??
          metadata.attributes.pagination.default.spacing
        }
      />
    </>
  );
}
