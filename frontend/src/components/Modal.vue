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
                <form @submit.prevent="handleSubmit">
                    <div class="grid grid-flow-row grid-cols-3 gap-3 items-center">

                        <label for="name"
                            class="  text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap text-end">Name</label>
                        <input type="text" id="name" :value="name" @input="handleInput"
                            class="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>


                        <label for="email"
                            class="  text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap text-end">Email</label>
                        <input type="text" id="email" :value="email" @input="handleInput"
                            class="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>

                        <label for="phone"
                            class=" text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap text-end">Phone</label>
                        <input type="text" id="phone" :value="phone" @input="handleInput"
                            class="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required>

                        <label for="provider"
                            class=" text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap text-end">Provider</label>
                        <input type="text" id="provider" :value="provider" @input="handleInput"
                            class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <button
                            class="bg-slate-300 text-slate-500 active:bg-slate-200 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button" @click="createProvider">
                            Add Provider
                        </button>

                        <div class="col-span-3 m-auto">
                            <div v-for="p of providersMaster"
                                class="grid justify-center items-center space-x-5 grid-flow-col grid-cols-2  ">
                                <div class="flex items-center gap-2">
                                    <input id="remember" type="checkbox" ref="items" :value="p._id"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                        :checked="providersId.includes(p._id)">

                                    <label for="remember"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                                            p.name }}</label>
                                </div>

                                <div class="flex gap-3">
                                    <img alt="Vue logo" class="cursor-pointer" src="../assets/pencil.svg" width="15"
                                        height="15" @click="editProvider(p._id, p.name)" />

                                    <img alt="Vue logo" class="cursor-pointer" src="../assets/delete.svg" width="15"
                                        height="15" @click="deleteProvider(p._id)" />
                                </div>



                            </div>
                        </div>








                    </div>
                    <!-- {/*footer*/} -->
                    <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b mt-5">
                        <button
                            class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button" @click="handleClose()">
                            Close
                        </button>
                        <button
                            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div v-if="id" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script lang="ts">
import { fetchClientApi, fetchProviderApi, createProviderApi, editProviderApi, deleteProviderApi, editClientApi, createClientApi } from '../services/api';
import { Provider } from '../models/provider';
import { CreateClient } from '../models/client';
import swal from 'sweetalert';

interface MyData {
    providersMaster: Provider[];
    providersId: String[];
    name: string;
    email: string;
    phone: string;
    provider: string;
    edit_id: string;
}

export default {
    data(): MyData {
        return {
            providersMaster: [],
            providersId: [],
            name: '',
            email: '',
            phone: '',
            provider: '',
            edit_id: ''
        }
    },
    props: {
        id: {
            type: String
        }
    },
    watch: {
        async id() {
            // fetch all masters then populate data
            await this.refreshProviderMaster();
            if (this.id && this.id != '-1') {
                const { data, error } = await fetchClientApi(this.id)

                if (!error) {
                    const firstClient = data[0]
                    this.providersId = firstClient?.provider?.map(({ _id }) => _id);
                    const { name, email, phone } = firstClient
                    this.name = name;
                    this.email = email;
                    this.phone = phone;

                }
            } else {
                this.name = '';
                this.email = '';
                this.phone = '';
                this.provider = '';
                this.edit_id = '';
                this.providersId = [];

            }


        }
    },
    methods: {
        async editProvider(id: string, name: string) {
            this.provider = name;
            this.edit_id = id;
        },
        async deleteProvider(id: string) {
            if (id) {
                const { error, data } = await deleteProviderApi(id)

                if (error) {
                    swal("Alert", error, "error");
                } else {
                    await this.refreshProviderMaster()
                }
            }
        },

        async refreshProviderMaster() {
            const { data, error } = await fetchProviderApi()

            if (!error)
                this.providersMaster = data

        },
        async createProvider() {
            if (this.edit_id && this.provider) {
                const { error, data } = await editProviderApi(this.edit_id, this.provider)

                if (error) {
                    swal("Alert", error, "error");
                } else {
                    this.edit_id = '';
                    this.provider = '';

                    await this.refreshProviderMaster()
                }
            }
            else if (this.provider) {
                const { error, data } = await createProviderApi(this.provider)

                if (error) {
                    swal("Alert", error, "error");
                } else {
                    await this.refreshProviderMaster()
                }
            }
        },
        async handleSubmit(e: Event) {
            const { name, phone, email } = this
            const ref = this.$refs.items as HTMLInputElement[]
            const provider = ref.filter(e => e.checked).map(e => e.value)
            const body: CreateClient = {
                name, phone, email, provider
            }
            if (this.id && this.id != '-1') {
                //edit
                const { data, error } = await editClientApi(this.id, body)

                if (!error) {
                    this.handleClose()
                } else
                    swal("Alert", error, "error");

            } else {
                //create
                const { data, error } = await createClientApi(body)

                if (!error) {
                    this.handleClose()
                } else
                    swal("Alert", error, "error");
            }

        },
        handleClose() {
            this.$emit('callModal', '')
        },
        handleInput(e: Event) {
            const { value, id } = (<HTMLInputElement>e.target)
            console.log(id, value)

            type t = Omit<MyData, 'providersMaster' | 'providersId'>

            this[id as keyof t] = value;
        }
    }
}
</script>