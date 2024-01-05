<template>
    <div class="forecast-container max-w-[700px] w-full table tab overflow-hidden text-black shadow-md rounded-[10px]">
        <div class="rounded-[10px]">
            <slot />
        </div>
    </div>
</template>

<style>
.forecast-container {
    background: rgb(155, 223, 248);
    background: linear-gradient(315deg, #9bdff8 5%, #4bb1ee 100%);
}
</style>