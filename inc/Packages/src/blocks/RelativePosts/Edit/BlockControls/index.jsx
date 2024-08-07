import {
  Dropdown,
  __experimentalNumberControl as NumberControl,
  ToolbarButton,
  ToolbarGroup,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { settings as SettingsIcon } from "@wordpress/icons";

export default function QueryToolbar(props) {
  const { setAttributes, attributes } = props;
  const { query } = attributes;

  const updateQuery = (newQuery) =>
    setAttributes({ query: { ...query, ...newQuery } });

  return (
    <>
      <ToolbarGroup>
        <Dropdown
          contentClassName="block-library-query-toolbar__popover"
          renderToggle={({ onToggle }) => (
            <ToolbarButton
              icon={SettingsIcon}
              label={__("Display settings")}
              onClick={onToggle}
            />
          )}
          renderContent={() => (
            <>
              <NumberControl
                __unstableInputWidth="60px"
                className="block-library-query-toolbar__popover-number-control"
                label={__("Items per Page")}
                labelPosition="edge"
                min={1}
                max={100}
                onChange={(value) => {
                  if (isNaN(value) || value < 1 || value > 100) {
                    return;
                  }
                  updateQuery({
                    per_page: value,
                  });
                }}
                step="1"
                value={query.per_page ?? 3}
                isDragEnabled={false}
              />
              <NumberControl
                __unstableInputWidth="60px"
                className="block-library-query-toolbar__popover-number-control"
                label={__("Offset")}
                labelPosition="edge"
                min={0}
                max={100}
                onChange={(value) => {
                  if (isNaN(value) || value < 0 || value > 100) {
                    return;
                  }
                  updateQuery({ offset: value });
                }}
                step="1"
                value={query.offset ?? 0}
                isDragEnabled={false}
              />
            </>
          )}
        />
      </ToolbarGroup>
    </>
  );
}
