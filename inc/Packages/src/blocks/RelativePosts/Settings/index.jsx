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
      <div className="brandy-editor relative-posts-settings">
        <PanelBody title={__("Posts Query", "brandy")}>
          <div style={{ marginBottom: 15 }}>
            <Label
              title={__("Related Posts by", "brandy")}
              style={labelStyle}
            />
            <Select
              options={[
                { label: "Categories", value: "categories" },
                { label: "Tags", value: "tag" },
              ]}
              selected={attributes.posts_query.related ?? "categories"}
              onChange={handleChangeValue("related")}
            />
          </div>
          <div style={{ marginBottom: 15 }}>
            <Label title={__("Order by", "brandy")} style={labelStyle} />
            <Select
              options={[
                { label: "Date", value: "date" },
                { label: "Title", value: "title" },
                { label: "Post Order", value: "menu_order" },
                { label: "Random", value: "rand" },
                { label: "Comment Counts", value: "comment_count" },
              ]}
              selected={attributes.posts_query.order_by ?? "date"}
              onChange={handleChangeValue("order_by")}
            />
          </div>
          <div>
            <Label title={__("Order", "brandy")} style={labelStyle} />
            <Select
              options={[
                { label: "Ascending", value: "asc" },
                { label: "Descending", value: "desc" },
              ]}
              selected={attributes.posts_query.order ?? "asc"}
              onChange={handleChangeValue("order")}
            />
          </div>
        </PanelBody>
      </div>
    </InspectorControls>
  );
}
