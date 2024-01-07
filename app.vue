<template>
    <NuxtLayout>
        <div v-if="isLoading" class="flex justify-center items-center h-screen">
            <Loader />
        </div>
        <NuxtPage v-else />
    </NuxtLayout>
</template>

<script setup>
let isLoading = ref(true);

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 3000)
})


</script>
