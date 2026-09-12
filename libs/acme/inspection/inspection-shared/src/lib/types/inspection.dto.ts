export interface CreateInspectionDto {
    completedAt?: string;
    device: string;
}

export interface UpdateInspectionDto {
    completedAt?: string;
    device?: string;
}
