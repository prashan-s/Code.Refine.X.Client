import React, { useEffect, useState } from 'react';
import {
    PanelContainer,
    SectionTitle,
    Divider
} from '@styles/Common.Panel';

import GistCard from '@components/GistCard';
import axiosInstance from '@utils/axiosInstance';

const GistPanel: React.FC = () => {
    const [snippets, setSnippets] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/Gists');
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
                    <GistCard
                        id={snippet.gistid}
                        title={snippet.title}
                        content={snippet.description}
                        language={snippet.language}
                        createdDate={snippet.dateCreated}
                        url={snippet.url}

                        onClick={() => window.open(snippet.url, '_blank')}
                    />
                    <Divider />
                </React.Fragment>
            ))}
        </PanelContainer>
    );
};

export default GistPanel;
