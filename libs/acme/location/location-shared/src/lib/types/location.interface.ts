export interface Location {
    id: string;
    name: string;
    /** ISO 8601 - dates cross the JSON boundary as strings */
    createdAt: string;
    updatedAt: string;
}
