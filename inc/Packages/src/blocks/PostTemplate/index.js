import { registerBlockType } from "@wordpress/blocks";
import { layout } from "@wordpress/icons";
import metadata from "./block.json";
import "./style.scss";
import Edit from "./Edit";
import Save from "./save";

registerBlockType(metadata.name, {
  edit: Edit,
  save: Save,
  icon: layout,
});
