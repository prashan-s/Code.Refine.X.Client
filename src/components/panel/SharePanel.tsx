import React from 'react';
import {
    PanelContainer,
    SectionTitle,
    Divider
} from '@styles/Common.Panel';

import ReuseCard from '@components/snippets/ReuseCard';
const SharePanel: React.FC = () => {
    return (
        <PanelContainer>
            {/* Snippets Section */}
            <SectionTitle>Gist</SectionTitle>
            {/* Divider */}
            <ReuseCard id={0} title={'Test'} content={'avx'} language='JAVA' createdDate={'sadad'} ></ReuseCard>
            <Divider />

        </PanelContainer>
    );
};

export default SharePanel;
