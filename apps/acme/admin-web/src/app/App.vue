<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { DEVICE_ROUTES } from '@acme/device/web/device-routes';
import { INSPECTION_ROUTES } from '@acme/inspection/web/inspection-web';

defineOptions({ name: 'App' });
</script>

<template>
    <div class="app-shell">
        <nav class="app-nav">
            <RouterLink to="/">Acme Field Service</RouterLink>
            <RouterLink :to="{ name: DEVICE_ROUTES.LIST }">Device</RouterLink>
            <RouterLink :to="{ name: INSPECTION_ROUTES.LIST }">Inspection</RouterLink>
        </nav>
        <main class="app-main">
            <RouterView />
        </main>
    </div>
</template>

<style scoped>
.app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.app-nav {
    display: flex;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--p-content-border-color);
}

.app-main {
    flex: 1;
}
</style>
