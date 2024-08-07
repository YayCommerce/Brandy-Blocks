import { ToolbarGroup } from "@wordpress/components";
import { _x } from "@wordpress/i18n";
import { grid as GridIcon, list as ListIcon } from "@wordpress/icons";

export default function PostTemplateToolbar(props) {
  const { setAttributes, attributes } = props;
  const { layout } = attributes;

  const updateLayout = (newLayout) =>
    setAttributes({ layout: { ...layout, ...newLayout } });

  const displayLayoutControls = [
    {
      icon: ListIcon,
      title: _x("List view", "Post template block display setting"),
      onClick: () => updateLayout({ type: "default" }),
      isActive: layout?.type === "default",
    },
    {
      icon: GridIcon,
      title: _x("Grid view", "Post template block display setting"),
      onClick: () =>
        updateLayout({
          type: "grid",
        }),
      isActive: layout?.type !== "default",
    },
  ];

  return (
    <>
      <ToolbarGroup controls={displayLayoutControls} />
    </>
  );
}
