import React from 'react';
import {
    PanelContainer,
    SectionTitle,
    Divider
} from '@styles/Common.Panel';

import ReuseCard from '@components/snippets/ReuseCard';
const ReusePanel: React.FC = () => {
    return (
        <PanelContainer>
            {/* Snippets Section */}
            <SectionTitle>Snippets</SectionTitle>
            {/* Divider */}
            <ReuseCard id={0} title={'Test'} content={'sadaskdnakjasadaskdnakjasadaskdnakjasadaskdnakjasadaskdnakjasadaskdnakjasadaskdnakja'} createdDate={''} ></ReuseCard>
            <Divider />

        </PanelContainer>
    );
};

export default ReusePanel;
