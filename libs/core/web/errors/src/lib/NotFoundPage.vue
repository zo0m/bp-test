<script setup lang="ts">
defineOptions({ name: 'NotFoundPage' });
</script>

<template>
    <div class="not-found-page">
        <h1 class="not-found-title">Page not found</h1>
        <p class="not-found-body">There is nothing at this address.</p>
        <RouterLink to="/">Go back</RouterLink>
    </div>
</template>

<style scoped>
.not-found-page {
    padding: 3rem 1.5rem;
    text-align: center;
}

.not-found-title {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
}

.not-found-body {
    margin: 0 0 1.5rem;
    color: var(--p-text-muted-color, #6b7280);
}
</style>
