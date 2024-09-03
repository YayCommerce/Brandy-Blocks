import { InspectorControls } from '@wordpress/block-editor';
import { __ } from "@wordpress/i18n";
import {
    __experimentalUnitControl as UnitControl,
    __experimentalInputControl as InputControl,
    ColorPalette,
    PanelBody
} from '@wordpress/components';
import { updateOriginalPriceStyles } from '../helpers';
import React, { useEffect } from 'react';

const CustomSettings = ({ attributes, setAttributes }) => {
    const typography = attributes.originalPriceTypography;
    const units = [
        { value: 'px', label: 'px', default: 17 },
        { value: '%', label: '%', default: 10 },
        { value: 'em', label: 'em', default: 1 },
    ];

    useEffect(() => {
        updateOriginalPriceStyles(attributes);
    }, [typography])

    return (
        <InspectorControls>
            <PanelBody title={__("Original Price", "brandy-blocks")} className='has-new-attributes'>
                <div style={{ display: 'flex' }}>
                    <UnitControl
                        style={{ width: "95%", marginRight: "5%" }}
                        label={__("Font size", "brandy-blocks")}
                        value={typography.fontSize}
                        onChange={(value) => setAttributes({ originalPriceTypography: { ...typography, fontSize: value } })}
                        units={units} />
                    <InputControl
                        style={{ width: "100%" }}
                        label={__("Font weight", "brandy-blocks")}
                        value={typography.fontWeight}
                        onChange={(value) => setAttributes({ originalPriceTypography: { ...typography, fontWeight: value } })} />
                </div>
                <div style={{ display: "flex", rowGap: 10, flexDirection: "column" }}>
                    <label style={{ fontSize: 11, fontWeight: 500 }}>
                        {__("COLOR", "brandy-blocks")}
                    </label>
                    <ColorPalette
                        value={typography.color}
                        onChange={(value) => setAttributes({ originalPriceTypography: { ...typography, color: value } })} />
                </div>
            </PanelBody>
        </InspectorControls>
    )
}

export default CustomSettings;