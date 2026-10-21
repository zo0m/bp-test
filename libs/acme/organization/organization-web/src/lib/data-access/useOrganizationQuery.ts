import { useQuery } from '@tanstack/vue-query';
import { computed, type MaybeRef, toValue } from 'vue';
import { ORGANIZATION_QUERY_KEYS } from '@acme/organization/shared/organization-shared';
import type {
    CreateOrganizationDto,
    UpdateOrganizationDto,
} from '@acme/organization/shared/organization-shared';
import type { PaginationParams } from '@core/shared/types';
import { OrganizationApiService } from './OrganizationApiService';

export function useOrganizationQuery(id: MaybeRef<string | undefined>) {
    return useQuery({
        queryKey: computed(() => {
            const idValue = toValue(id);
            return idValue
                ? ORGANIZATION_QUERY_KEYS.detail(idValue)
                : ORGANIZATION_QUERY_KEYS.details();
        }),
        queryFn: () => {
            const idValue = toValue(id);
            if (!idValue) {
                throw new Error('Organization ID is required');
            }
            return OrganizationApiService.getById(idValue);
        },
        enabled: computed(() => !!toValue(id)),
        // Providers render these errors locally; suppress the global toast.
        meta: { suppressGlobalError: true },
    });
}
