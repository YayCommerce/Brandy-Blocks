import { PanelBody, SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const relatedByOptions = [
  {
    label: __("Categories"),
    value: "category",
  },
  {
    label: __("Tags"),
    value: "tag",
  },
];

const orderOptions = [
  {
    label: __("Newest to oldest"),
    value: "date/desc",
  },
  {
    label: __("Oldest to newest"),
    value: "date/asc",
  },
  {
    label: __("A → Z"),
    value: "title/asc",
  },
  {
    label: __("Z → A"),
    value: "title/desc",
  },
];

export default function QueryInspectorControls({ attributes, setAttributes }) {
  const { query } = attributes;

  const { order, orderBy, relatedBy } = query;

  const updateQuery = (newQuery) =>
    setAttributes({ query: { ...query, ...newQuery } });

  return (
    <>
      <PanelBody title={__("Settings")}>
        <SelectControl
          __nextHasNoMarginBottom
          __next40pxDefaultSize
          label={__("Related by")}
          value={relatedBy ?? "category"}
          options={relatedByOptions}
          onChange={(value) => {
            updateQuery({ relatedBy: value });
          }}
        />
        <SelectControl
          __nextHasNoMarginBottom
          __next40pxDefaultSize
          label={__("Order by")}
          value={`${orderBy}/${order}`}
          options={orderOptions}
          onChange={(value) => {
            const [newOrderBy, newOrder] = value.split("/");
            updateQuery({ order: newOrder, orderBy: newOrderBy });
          }}
        />
      </PanelBody>
    </>
  );
}
