<template>
    <div class="flex items-center p-10 flex-col">
        <p class="text-4xl font-semibold text-nowrap text-white sm:text-2xl">Weather Forecast</p>
        <div class="pt-[10px] pb-[50px]">
            <form action="#" class="flex flex-nowrap rounded-[30px] outline-none my-5"
                @submit.prevent="findLocation(location)">
                <input type="text"
                    class="rounded-[30px] bg-white outline-none py-3 px-6 rounded-tr-none rounded-br-none sm:px-2 sm:py-1 sm:max-w-[330px] sm:w-full"
                    placeholder="Find your location..." v-model="location">
                <input type="submit"
                    class="bg-blue-300 cursor-pointer py-3 px-5 rounded-tl-none rounded-bl-none rounded-[30px] outline-none sm:py-1 sm:px-2"
                    value="Search">
            </form>
        </div>
        <DetailsPart v-if="getLocation && !isLoading && !error" :location="weatherDetails" @findMyLoc="findUserLocation" />
        <Loader v-if="isLoading" />
        <UnselectedLoc v-if="!isLoading && !getLocation && !error" />

        <v-overlay class="flex justify-center items-center w-full h-full" v-model="error">
            <div class="w-[550px] custom:max-w-[300px] custom:w-full shadow-md rounded-md">
                <p class="bg-[#4e89ef] rounded-t-md p-2 text-xl font-bold text-white custom:p-1 custom:text-base">Not found</p>
                <p class="p-2 text-lg bg-white text-black py-7 rounded-b-md text-center custom:text-sm custom:p-4">{{ error }}</p>
            </div>
        </v-overlay>
    </div>
</template>

<script setup>
useSeoMeta({
    title: "Weather Forecast",
    description: "Weather forecast by your location."
})

let location = ref();
let weatherDetails = ref({});
let getLocation = ref(false);
let isLoading = ref(false);

const findUserLocation = (loc) => {
    let userLoc = loc.address.city ? loc.address.city : loc.address.village;
    findLocation(userLoc);
}

let error = ref();

const findLocation = async (loc) => {
    const API_KEY = "05add20bc4874a9dadb104317233004";
    try {
        isLoading.value = true
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${loc}`);
        if (response.ok) {
            const newWeatherData = await response.json();
            Object.assign(weatherDetails.value, newWeatherData);
            getLocation.value = true
            location.value = "";
            isLoading.value = false
            console.log(weatherDetails.value);
        }
        else {
            error.value = `Request failed with status ${response.status}. No location found `;;
            getLocation.value = false;
        }
    }
    catch (error) {
        console.log(error);
    } finally {
        location.value = ""
        isLoading.value = false;
    }
}
</script>