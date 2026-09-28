export interface Inspection {
    id: string;
    completedAt?: string;
    device: string;
    /** ISO 8601 - dates cross the JSON boundary as strings */
    createdAt: string;
    updatedAt: string;
}
