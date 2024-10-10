import { InspectorControls } from '@wordpress/block-editor';
import GeneralSettings from './GeneralSettings';

export default function Settings() {
    return (
        <InspectorControls>
            <GeneralSettings />
        </InspectorControls>
    );
}
