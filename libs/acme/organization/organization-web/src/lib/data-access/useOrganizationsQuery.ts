import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { computed, type MaybeRef, toValue } from 'vue';
import { ORGANIZATION_QUERY_KEYS } from '@acme/organization/shared/organization-shared';
import type {
    CreateOrganizationDto,
    UpdateOrganizationDto,
} from '@acme/organization/shared/organization-shared';
import type { PaginationParams } from '@core/shared/types';
import { OrganizationApiService } from './OrganizationApiService';

export function useOrganizationsQuery(params?: MaybeRef<PaginationParams>) {
    return useQuery({
        queryKey: computed(() => ORGANIZATION_QUERY_KEYS.list(toValue(params) ?? {})),
        queryFn: () => OrganizationApiService.getAll(toValue(params) ?? {}),
        // Page changes keep the previous rows visible instead of flashing an
        // empty table and collapsing the paginator.
        placeholderData: keepPreviousData,
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
