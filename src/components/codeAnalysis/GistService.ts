class GistService {

    public static async createGist(accessToken: string, userCode: string, description: string = '', isPublic: boolean = true): Promise<string | null> {
        try {
            const response = await fetch('https://api.github.com/gists', {
                method: 'POST',
                headers: {
                    'Authorization': `token ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description,
                    public: isPublic,
                    files: {
                        'code.js': {
                            content: userCode,
                        },
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`Error creating Gist: ${response.statusText}`);
            }

            const gistData = await response.json();
            console.log('Gist created at:', gistData.html_url);
            return gistData.html_url;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default GistService;
