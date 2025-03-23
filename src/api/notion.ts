import { client } from './notion-client';

export const fetchOverlays = async (auth: string): Promise<any> => {
    const overlays = await client.databases.query({auth, database_id: '1b8c4f6623d48047bc73f7ff37eb5bc9'})
    const response = [];
    
    for (const overlay of overlays.results) {
        const prop = overlay.properties;
        response.push({
            page_id: overlay.id,
            name: prop.name.rich_text[0].text.content,
            status: prop.status.rich_text[0].text.content,
            url: prop.preview.rich_text[0].text.content
        });
    }
    
    return response;
}
