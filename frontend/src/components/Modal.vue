<template>
    <div v-if="id"
        class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div class="relative w-auto my-6 mx-auto max-w-3xl">
            <!-- {/*content*/} -->
            <div
                class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <!-- {/*header*/} -->
                <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 class="text-3xl font-semibold">
                        <span v-if="id == '-1'" class="text-blue-500">Create Client</span>
                        <span v-else="id" class="text-blue-500">Edit Client</span>
                    </h3>
                    <button
                        class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                        <span
                            class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                        </span>
                    </button>
                </div>
                <!-- {/*body*/} -->
                <div class="relative p-6">
                    <form class="grid grid-flow-row grid-cols-3 gap-3 items-center">
                        <label for="name"
                            class="  text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap text-end">Name</label>
                        <input type="text" id="name" :value="client.name"
                            class="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@flowbite.com" required>


                        <label for="email"
                            class="  text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap text-end">Email</label>
                        <input type="text" id="email" :value="client.email"
                            class="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>

                        <label for="phone"
                            class=" text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap text-end">Phone</label>
                        <input type="text" id="phone" :value="client.phone"
                            class="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>

                        <label for="provider"
                            class=" text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap text-end">Provider</label>
                        <input type="text" id="provider" :value="client.provider.map(({ name }) => name).join(', ')"
                        disabled
                            class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>
                        <button
                            class="bg-slate-300 text-slate-500 active:bg-slate-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button">
                            Add Provider
                        </button>

                        <div v-for="p of providersMaster" class="col-span-3 flex justify-center items-center">
                            <input id="remember" type="checkbox" value=""
                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                :checked="providersId.includes(p._id)">

                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                                p.name }}</label>


                        </div>





                    </form>

                </div>
                <!-- {/*footer*/} -->
                <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                        class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button" @click="handleClose()">
                        Close
                    </button>
                    <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="id" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script lang="ts">
import { fetchClient, fetchProvider } from '../services/api'
import { Provider } from '../models/provider'
import { Client } from '../models/client'
export default {
    data() {
        return {
            providersMaster: [] as Provider[],
            providersId: [] as String[],
            client: {} as Client
        }
    },
    props: {
        id: {
            type: String
        }
    },
    watch: {
        async id() {
            const { data, error } = await fetchProvider()

            this.providersMaster = data

            if (this.id) {
                const { data, error } = await fetchClient(this.id)

                if (!error) {
                    this.client = data[0];
                    this.providersId = data[0]?.provider?.map(({ _id }) => _id);
                }
            }


        }
    },
    methods: {
        handleClose() {
            this.$emit('callModal', '')
        }
    }
}
</script>