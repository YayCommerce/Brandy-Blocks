import { useBlockProps } from '@wordpress/block-editor';
import { createContext, useMemo } from "@wordpress/element";
import Settings from './Settings';
import Display from './Display';
import { __ } from "@wordpress/i18n";

export const RatingContext = createContext({});

const Edit = ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps();
  const contextValue = useMemo(
    () => ({
      attributes,
      setAttributes,
    }),
    [attributes, setAttributes]
  );

  return (
    <div {...blockProps} className={`${blockProps.className} block-upgraded`}>
      <RatingContext.Provider value={contextValue}>
        <Settings />
        <Display />
      </RatingContext.Provider>
    </div>
  );
};

export default Edit;
