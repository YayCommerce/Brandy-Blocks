import { InspectorControls } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import PanelBody from "../../../components/PanelBody";
import Select from "../../../components/Select";
import Label from "../../../components/Label";
import { RelativePostsContext } from "../edit";
import { useContext } from "@wordpress/element";

const labelStyle = { marginBottom: 10 };

export default function Settings() {

  const { attributes, setAttributes } = useContext(RelativePostsContext);

  const handleChangeValue = (key) => (value) => {
    setAttributes({
      posts_query: {
        ...attributes.posts_query,
        [key]: value,
      },
    });
  };

  return (
    <InspectorControls key="setting">
      <div className="brandy-editor all-products-settings">
        <PanelBody title={__("Posts Query", "brandy")}>
          <Label title={__("Related Posts by", "brandy")} style={labelStyle} />
          <Select
            options={[
              { label: "Categories", value: "categories" },
              { label: "Tags", value: "tag" },
            ]}
            selected={attributes.posts_query.relative_posts_by ?? "categories"}
            onChange={handleChangeValue('related')}
          />

          <Label title={__("Order by", "brandy")} style={labelStyle} />
          <Select
            options={[
              { label: "Date", value: "date" },
              { label: "Title", value: "title" },
            ]}
            selected={attributes.posts_query.order_by ?? "date"}
            onChange={handleChangeValue('order_by')}
          />

          <Label title={__("Order", "brandy")} style={labelStyle} />
          <Select
            options={[
              { label: "Ascending", value: "asc" },
              { label: "Descending", value: "des" },
            ]}
            selected={attributes.posts_query.order ?? "desc"}
            onChange={handleChangeValue('order')}
          />
        </PanelBody>
      </div>
    </InspectorControls>
  );
}
