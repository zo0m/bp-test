<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useLocationQuery, locationRoutes } from '@acme/location/web/location-web';

defineOptions({ name: 'LocationLink' });

const props = defineProps<{ locationId?: string }>();

const { data } = useLocationQuery(computed(() => props.locationId));
const label = computed(() => data.value?.name ?? props.locationId ?? '');
</script>

<template>
    <span>{{ label || '&mdash;' }}</span>
</template>
