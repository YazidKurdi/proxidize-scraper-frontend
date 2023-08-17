<template>
    <!-- component -->
    <section v-if="authStore.isAuthenticated"
        class="flex flex-col justify-center items-center mt-12 antialiased text-gray-600 px-4 gap-y-5">
        <div class="flex flex-col justify-center h-full min-w-[100rem]">
            <!-- Table -->
            <div class="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <header class="px-5 py-4 border-b border-gray-100">
                    <h2 class="text-center font-semibold text-gray-800">Scraped Data - Page ({{ currentPage }})</h2>
                </header>
                <div class="p-3">
                    <div class="overflow-x-auto">
                        <table class="table-auto w-full">
                            <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-left"></div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-left">Product Title</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-left">Price</div>
                                    </th>
                                    <th class="p-2 whitespace-nowrap">
                                        <div class="font-semibold text-center">Tags</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="text-sm divide-y divide-gray-100">
                                <tr v-for="item in scrapedData" :key="item.index">
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="flex items-center justify-center">
                                            <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full"
                                                    :src="item.image" width="40" height="40" alt="Alex Shatov"></div>
                                        </div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="text-left"> {{ item.product_title }}</div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="text-left font-medium text-green-500">{{ item.price }}</div>
                                    </td>
                                    <td class="p-2 whitespace-nowrap">
                                        <div class="text-[0.65rem] text-center"> {{ item.info }}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Pagination v-model="currentPage" :total-pages="maxPage"></Pagination>
    </section>
    <section v-else class="bg-white mt-12 min-w-[50rem]">
        <div class="container flex items-center  px-6 py-12 mx-auto">
            <div class="flex flex-col items-center max-w-sm mx-auto text-center">
                <p class="p-3 text-sm font-medium text-primary-700 rounded-full bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </p>
                <h1 class="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">Login Required</h1>
                <p class="mt-4 text-gray-500">Please login to access your scraped data & the web scraping
                    feature</p>
                <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                    <router-link
                        class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-primary-700 rounded-lg shrink-0 sm:w-auto hover:bg-primary-900"
                        to="/login">Log In</router-link>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script  setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios';
import { Pagination } from 'flowbite-vue'
import { useAuthStore } from '@/store/index.js'

const authStore = useAuthStore()

const scrapedData = ref([])
const currentPage = ref(1)
const maxPage = ref(1)

const retrieveScraped = async () => {
    try {
        const response = await axios.get(`/api/user/scrape-results/?page=${currentPage.value}`)
        scrapedData.value = response.data.results
        maxPage.value = response.data.count / (response.data.results.length)
        console.log(response)
    }
    catch (error) {
        console.log(error)
    }
};

// Call the retrieveScraped function whenever the currentPage changes
watch(currentPage, retrieveScraped)

onMounted(() => {
    retrieveScraped()
})


</script>