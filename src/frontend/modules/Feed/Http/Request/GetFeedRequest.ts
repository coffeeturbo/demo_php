export interface GetFeedRequest
{
    cursor?: number;
    dateFrom?: string;
    dateTo?: string;
    // profile_id?: number; 
    profile?: number;
    sort?: "id" | "rating";
    direction?: "ASC" | "DESC";
    tags?: string;
    [key: string]: any;
}