<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useDeviceQuery } from '@acme/device/web/device-api';
import { deviceRoutes } from '@acme/device/web/device-routes';

defineOptions({ name: 'DeviceLink' });

const props = defineProps<{ deviceId?: string }>();

const { data } = useDeviceQuery(computed(() => props.deviceId));
const label = computed(() => data.value?.serial ?? props.deviceId ?? '');
</script>

<template>
    <RouterLink v-if="deviceId" :to="deviceRoutes.details(deviceId)">
        {{ label }}
    </RouterLink>
    <span v-else>&mdash;</span>
</template>
