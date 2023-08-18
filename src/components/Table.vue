<template>
    <!-- Scraping Functionality -->
    <div v-if="authStore.isAuthenticated">
        <div
            class="flex justify-between items-center lg:flex p-6 w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-5">
            <form class="flex gap-x-5" @submit.prevent="scrapeKeyword">
                <div>
                    <label class="relative block min-w-[15rem]">
                        <input v-model="keyword"
                            class="w-full bg-white placeholder:font-italitc placeholder:text-sm border border-slate-400 drop-shadow-md rounded-md py-2 pl-3 pr-10 focus:outline-none"
                            placeholder="Enter your keyword to scrape" type="text" required />
                        <button class="absolute inset-y-0 right-0 flex items-center pr-3" type="submit">
                            <svg class="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                                height="30" viewBox="0 0 30 30">
                                <path
                                    d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                                </path>
                            </svg>
                        </button>
                    </label>
                </div>
                <div>
                    <input v-model="minRows" type="number"
                        class="max-w-[10rem] bg-white placeholder:font-italitc placeholder:text-sm border p-2 border-slate-400 drop-shadow-md rounded-md py-2 focus:outline-none"
                        placeholder="Rows to scrape" required>
                </div>
                <div role="status" v-show="isLoading">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 mt-1 text-gray-200 animate-spin fill-blue-600"
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill" />
                    </svg>
                </div>
            </form>
            <div class="flex justify-between gap-x-3 min-w-[25rem]">
                <div id="toast-default" class="flex w-full p-1 text-gray-500 bg-white rounded-lg items-center" role="alert">
                    <div
                        class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg text-green-500 bg-green-100">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="text-sm font-normal ml-3"> {{ newlyScraped }} Newly Scraped </div>
                </div>
                <div id="toast-default" class="flex w-full p-1 text-gray-500 bg-white rounded-lg items-center" role="alert">
                    <div
                        class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg text-orange-500 bg-orange-100">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="text-sm font-normal ml-3"> {{ duplicatedScraped }} Ignored Duplicated </div><!---->
                </div>
            </div>
        </div>
        <!-- Table -->
        <section class="flex flex-col justify-center items-center mt-4 antialiased text-gray-600 px-4 gap-y-5">
            <div class="flex flex-col justify-center h-full min-w-[100rem]">
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
                                                <!-- Update image when finished -->
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
    </div>

    <!-- Unauthenticated User -->
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
                <div class="flex items-center justify-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                    <router-link
                        class="px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-primary-700 rounded-lg shrink-0 w-auto hover:bg-primary-900"
                        to="/login">Log In</router-link>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script  setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { Pagination } from 'flowbite-vue'
import { useAuthStore } from '@/store/index.js'
import { notify } from "notiwind"


const authStore = useAuthStore()

// Table logic
const scrapedData = ref([])
const currentPage = ref(1)
const maxPage = ref(1)
const isLoading = ref(false)

const retrieveScraped = async () => {
    try {
        const response = await axios.get(`/api/user/scrape-results/?page=${currentPage.value}`)
        scrapedData.value = response.data.results
        maxPage.value = Math.ceil(response.data.count / response.data.page_size)
    }
    catch (error) {
        console.log(error)
    }
}

// Scraping logic
const keyword = ref('')
const minRows = ref('')

const newlyScraped = ref(0)
const duplicatedScraped = ref(0)

const scrapeKeyword = async () => {
    try {
        isLoading.value = true

        const response = await axios.post(`/api/scrape/`, { keyword: keyword.value, rows: minRows.value })
        keyword.value = ''
        minRows.value = ''

        newlyScraped.value = response.data.count_summary.new_added_count
        duplicatedScraped.value = response.data.count_summary.duplicate_count

        if (currentPage.value == maxPage.value || currentPage.value == 1) {
            await retrieveScraped()
        }

        isLoading.value = false
    }
    catch (error) {
        isLoading.value = false;
        keyword.value = '';
        minRows.value = '';
        if (error.response && error.response.status === 400) {
            notify({
                group: "error",
                title: "Error",
                text: "Ensure number of scraped rows is less than or equal to 50.",
            });
        } else {
            notify({
                group: "error",
                title: "Error",
                text: "Whoops, something went wrong, please try again.",
            });
        }
    }
}

// Call the retrieveScraped function whenever the currentPage changes
watch(currentPage, retrieveScraped)

onMounted(() => {
    retrieveScraped()
})




</script>