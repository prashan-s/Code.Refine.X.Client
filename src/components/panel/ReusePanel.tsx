import React, { useEffect, useState } from 'react';
import {
    PanelContainer,
    SectionTitle,
    Divider
} from '@styles/Common.Panel';

import ReuseCard from '@components/snippets/ReuseCard';
import axiosInstance from '@utils/axiosInstance';

const ReusePanel: React.FC = () => {
    const [snippets, setSnippets] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/Snippets');
                setSnippets(response.data);
            } catch (error: any) {
                setError(error?.message || 'An error occurred while fetching data');
            }
        };

        fetchData();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <PanelContainer>
            <SectionTitle>Snippets</SectionTitle>
            {snippets.map(snippet => (
                <React.Fragment key={snippet.snippetID}>
                    <ReuseCard
                        id={snippet.snippetID}
                        title={snippet.snippetTitle}
                        content={snippet.snippetContent}
                        language={snippet.language}
                        createdDate={snippet.dateCreated}
                    />
                    <Divider />
                </React.Fragment>
            ))}
        </PanelContainer>
    );
};

export default ReusePanel;
