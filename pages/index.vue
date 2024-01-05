<template>
    <div class="flex justify-center items-center p-10 flex-col">
        <p class="text-4xl font-semibold text-nowrap text-white sm:text-2xl">Weather Forecast</p>
        <div class="pt-[10px] pb-[50px]">
            <form action="#" class="flex flex-nowrap rounded-[30px] outline-none my-5" @submit.prevent="findLocation">
                <input type="text" class="rounded-[30px] outline-none py-3 px-6 rounded-tr-none rounded-br-none sm:px-2 sm:py-1 sm:max-w-[330px] sm:w-full"
                    placeholder="Find your location..." v-model="location">
                <input type="submit" class="bg-blue-300 cursor-pointer py-3 px-5 rounded-tl-none rounded-bl-none rounded-[30px] outline-none sm:py-1 sm:px-2"
                    value="Search">
            </form>
        </div>
        <DetailsPart v-if="getLocation" :location="weatherDetails" />
        <NuxtLayout v-else :name="layout">
            <div class="flex justify-center items-center w-full h-[300px]">
                <p class="text-2xl">Search Location to see information</p>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const layout = "block"
let location = ref();
let weatherDetails = ref({});;
let getLocation = ref(false)
const findLocation = async () => {
    const API_KEY = "05add20bc4874a9dadb104317233004";
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.value}`);
        if (response.ok) {
            const newWeatherData = await response.json();
            Object.assign(weatherDetails.value, newWeatherData); 
            getLocation.value = true
            location.value = "";
            console.log(weatherDetails.value);
        } 
        else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    }
    catch (error) {
        // this.showDialog = true;
        // this.notVisible = true;
        console.log(error);
    } finally {
        // this.spinnerVisibility = false;
    }
}
</script>