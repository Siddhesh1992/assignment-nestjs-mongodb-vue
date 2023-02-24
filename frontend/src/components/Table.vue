
<script lang="ts">
import { PartialClient } from '../models/client';

export default {
    data() {
        return {
            modifiedClient: [] as any[]
        }
    },
    props: {
        clients: {
            type: Array as () => any[],
            required: true,
        },
        isEditable: {
            type: Boolean,
            default: false
        },
        isDeletable: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        async editClient(id: string) {
            this.$emit('callModal', id);
        },
        async deleteClient(id: string) {
            // this.$emit('delete', id);
        }
    }
}
</script>
<template>
    <div class="bg-slate-400 font-bold py-2 pl-5 w-full mt-10">
        Clients
    </div>
    <div class="relative overflow-x-auto shadow-md border-collapse">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
                class="text-xs text-gray-700 uppercase border-2 shadow border-black border-opacity-25 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr class="border">
                    <template v-for="client of Object.keys(clients[0] || [])">
                        <th v-if="client !== '_id'" scope="col" class="px-6 py-3 border border-collapse shadow font-bold">
                            {{ client }}
                        </th>
                    </template>
                    <th v-if="isEditable == true">
                        Edit
                    </th>
                    <th v-if="isDeletable == true">
                        Delete
                    </th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="client of clients" class="bg-white border">
                    <template v-for="(c, key) of client">

                        <th v-if="typeof key === 'string' && key !== '_id'" scope="row" :attr-test="client"
                            class="px-6 py-4 font-mono border whitespace-nowrap">
                            {{ c }}
                        </th>

                    </template>
                    <th class="px-6 py-4 font-mono border whitespace-nowrap" v-if="isEditable == true">
                        <img alt="Vue logo" class="cursor-pointer" src="../assets/pencil.svg" width="15" height="15"
                            @click="editClient(client._id)" />
                    </th>
                    <th class="px-6 py-4 font-mono border whitespace-nowrap" v-if="isDeletable == true">
                        <img alt="Vue logo" class="cursor-pointer" src="../assets/delete.svg" width="15" height="15"
                            @click="deleteClient(client._id)" />
                    </th>


                </tr>


            </tbody>
        </table>
    </div>
</template>