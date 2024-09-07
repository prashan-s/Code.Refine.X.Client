import React, { useEffect, useState } from 'react';
import {
    PanelContainer,
    SectionTitle,
    Divider
} from '@styles/Common.Panel';

import ReuseCard from '@components/snippets/ReuseCard';

const ReusePanel: React.FC = () => {
    const [snippets, setSnippets] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://codeanalyser.dulanga.com/api/Snippets');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSnippets(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
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
