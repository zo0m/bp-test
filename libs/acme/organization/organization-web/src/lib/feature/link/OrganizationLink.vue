<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useOrganizationQuery, organizationRoutes } from '@acme/organization/web/organization-web';

defineOptions({ name: 'OrganizationLink' });

const props = defineProps<{ organizationId?: string }>();

const { data } = useOrganizationQuery(computed(() => props.organizationId));
const label = computed(() => data.value?.name ?? props.organizationId ?? '');
</script>

<template>
    <span>{{ label || '&mdash;' }}</span>
</template>
