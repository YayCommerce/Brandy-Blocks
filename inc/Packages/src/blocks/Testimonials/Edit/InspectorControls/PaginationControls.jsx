import {
  __experimentalUnitControl as UnitControl,
  ToggleControl,
  SelectControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import metadata from "../../block.json";

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
          handleChangePagination("enabled", v);
        }}
      />
      {attributes.pagination?.enabled && (
        <>
          <SelectControl
            label={__("Pagination type")}
            value={attributes.pagination?.type ?? "bullets"}
            options={[
              { label: "Bullets", value: "bullets" },
              { label: "Fraction", value: "fraction" },
            ]}
            onChange={(v) => {
              handleChangePagination("type", v);
            }}
            __nextHasNoMarginBottom
          />
          {attributes.pagination?.type === "fraction" ? (
            <UnitControl
              label={__("Fraction size")}
              onChange={(v) => {
                handleChangePagination("fractionSize", v);
              }}
              value={attributes.pagination?.fractionSize ?? "16px"}
              units={[{ value: "px", label: "px", default: 16 }]}
            />
          ) : (
            <>
              <UnitControl
                label={__("Pagination bullet size")}
                onChange={(v) => {
                  handleChangePagination("size", v);
                }}
                value={
                  attributes.pagination?.size ??
                  metadata.attributes.pagination.default.size
                }
                units={[{ value: "px", label: "px", default: 50 }]}
              />
              <UnitControl
                label={__("Pagination bullet spacing")}
                onChange={(v) => {
                  handleChangePagination("spacing", v);
                }}
                units={[{ value: "px", label: "px", default: 0 }]}
                value={
                  attributes.pagination?.spacing ??
                  metadata.attributes.pagination.default.spacing
                }
              />
            </>
          )}
        </>
      )}
    </>
  );
}
