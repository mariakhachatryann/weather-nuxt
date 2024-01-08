<template>
    <NuxtLayout name="block">
        <div class="bg-[#0000001a] p-2 w-full">
            <div class="mb-2 cursor-pointer">
                <p v-if="userLoc" @click="handleLocation(userLoc)" class="text-center text-xl">My Location: {{ userLoc.address.city ? userLoc.address.city :
                    userLoc.address.village }}/{{ userLoc.address.country }}</p>
                <p v-else @click="getUserLocation" class="text-center text-lg">Get my location</p>
            </div>
            <div class="w-full flex justify-between">
                <div class="text-lg">{{ getDate }}</div>
                <div class="text-lg">{{ getDay }}</div>
                <div class="text-lg">{{ currentTime }}</div>
            </div>
        </div>
        <div class="text-left py-[30px] px-5">
            <div class="text-2xl font-normal custom:text-center">{{ location.location.name }}/{{ location.location.country }} </div>
            <div class="custom:text-center">{{ location.location.localtime }}</div>
            <div class="flex gap-5 custom:justify-center custom:gap-0 mt-2">
                <div class="text-[80px] custom:text-[50px]">{{ location.current.temp_c }}<sup>o</sup>C</div>
                <div class="forecast-icon">
                    <!-- <img :src="location.current.condition.icon" /> -->
                    <component :is="getIconComponent(location.current.condition.icon)"></component>
                </div>
            </div>
            <div class="flex justify-between flex-row items-center custom:flex-col">
                <p class="text-xl">{{ location.current.condition.text }}</p>
                <div class="flex items-center gap-2">
                    <IconsUmbrella />
                    <p class="text-xl">{{ location.current.humidity }}%</p>
                </div>
                <div class="flex gap-2 items-center mt-2">
                    <IconsWind />
                    <p class="text-xl">{{ location.current.wind_kph }}km/h</p>
                </div>
                <div class="flex gap-2 items-center mt-2">
                    <IconsCl />
                    <p class="text-xl">{{ location.current.cloud }}%</p>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
const props = defineProps(["location"]);
const emit = defineEmits(["findMyLoc"]);

let { location } = props;
import IconsSun from '~/components/Icons/Sun.vue';
import IconsSunCloud from '~/components/Icons/SunCloud.vue';
import IconsSnow from '~/components/Icons/Snow.vue';
import IconsClearNight from '~/components/Icons/ClearNight.vue';
import IconsCloud from '~/components/Icons/Cloud.vue';
import IconsRain from '~/components/Icons/Rain.vue';
import NightCloud from './Icons/NightCloud.vue';
import Mist from "./Icons/Mist.vue";

const getIconComponent = (icon) => {
    if (icon.includes('113.png') && icon.includes('day')) {
        return IconsSun;
    } else if (icon.includes('116.png') && icon.includes('day')) {
        return IconsSunCloud;
    } else if (icon.includes('326.png') || icon.includes('329.png') || icon.includes('338.png')) {
        return IconsSnow;
    } else if (icon.includes('113.png') && icon.includes('night')) {
        return IconsClearNight;
    } else if (icon.includes('122.png')) {
        return IconsCloud;
    } else if (icon.includes('116.png') && icon.includes('night')) {
        return NightCloud;
    } else if (icon.includes('143.png')) {
        return Mist;
    } else if (icon.includes('311.png') || icon.includes('302.png') || icon.includes('296.png')) {
        return IconsRain;
    } else {
        return null;
    }
};

const getDay = computed(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[new Date().getDay()]
})

const getDate = computed(() => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${new Date().getDate()} ${months[new Date().getMonth()]}`
});

function handleLocation(loc) {
    emit("findMyLoc", loc)
}

const currentTime = ref(getCurrentTime());

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

setInterval(() => {
    currentTime.value = getCurrentTime();
}, 1000);

let userLoc = ref()

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
           async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
               await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.display_name) {
                            console.log(data);
                            userLoc.value = data
                        } else {
                            console.error('No results found.');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching location:', error);
                    });
            },
            // (error) => {
            //     switch (error.code) {
            //         case error.PERMISSION_DENIED:
            //             console.error("User denied the request for Geolocation.");
            //             break;
            //         case error.POSITION_UNAVAILABLE:
            //             console.error("Location information is unavailable.");
            //             break;
            //         case error.TIMEOUT:
            //             console.error("The request to get user location timed out.");
            //             break;
            //         case error.UNKNOWN_ERROR:
            //             console.error("An unknown error occurred.");
            //             break;
            //         default:
            //             console.error("An error occurred:", error.message);
            //     }
            // }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

// onMounted(() => {
//     getUserLocation();
// })
</script>

