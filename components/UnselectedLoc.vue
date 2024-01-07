<template>
    <NuxtLayout name="block">
        <div class="bg-[#0000001a] p-2 w-full">
            <p class="text-center text-lg sm:text-sm">Search location to see information about weather conditions...</p>
        </div>
        <div class="text-left py-[30px] px-5 sm:py-4">
            <div class="">
                <div class="anim h-6 mb-4 bg-[#4bb1ee] w-full" v-for="row in [1, 2, 3, 4]" :key="row"></div>
            </div>
        </div>
    </NuxtLayout>
</template>

<style>
.anim {
    animation: anim 1.5s ease-in-out .5s infinite;
}

@keyframes anim {
    0% {
        opacity: 1;
    }

    50% {
        opacity: .4;
    }

    100% {
        opacity: 1;
    }
}
</style>