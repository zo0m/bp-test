<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({ name: 'ErrorPage' });

const route = useRoute();
const reason = computed(() =>
    typeof route.query['reason'] === 'string' ? route.query['reason'] : null,
);
</script>

<template>
    <div class="error-page">
        <h1 class="error-title">Something went wrong</h1>
        <p class="error-body">
            The page could not be shown.
            <span v-if="reason">({{ reason }})</span>
        </p>
        <RouterLink to="/">Go back</RouterLink>
    </div>
</template>

<style scoped>
.error-page {
    padding: 3rem 1.5rem;
    text-align: center;
}

.error-title {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
}

.error-body {
    margin: 0 0 1.5rem;
    color: var(--p-text-muted-color, #6b7280);
}
</style>
