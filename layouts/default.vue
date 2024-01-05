<template>
    <div class="grad w-full h-screen">
        <slot />
    </div>
</template>

<style>
.grad {
    background: rgb(69, 114, 190);
    background: linear-gradient(315deg, rgba(69, 114, 190, 1) 36%, rgba(58, 222, 255, 1) 100%);
}
</style>