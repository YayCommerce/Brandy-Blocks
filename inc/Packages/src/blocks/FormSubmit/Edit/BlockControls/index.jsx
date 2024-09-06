import {
  BlockControls,
  AlignmentControl,
  useBlockEditingMode,
} from "@wordpress/block-editor";

export default function AllBlockControls({ attributes, setAttributes }) {
  const { textAlign } = attributes;

  const blockEditingMode = useBlockEditingMode();

  return (
    <BlockControls group="block">
      {blockEditingMode === "default" && (
        <AlignmentControl
          value={textAlign}
          onChange={(nextAlign) => {
            setAttributes({ textAlign: nextAlign });
          }}
        />
      )}
    </BlockControls>
  );
}
