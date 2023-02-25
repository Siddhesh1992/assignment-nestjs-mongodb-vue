
<script lang="ts">
import { deleteClientApi } from '../services/api'
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
            await deleteClientApi(id);
            this.$emit('callModal', "");
        }
    }
}
</script>
<template>
    <div class="bg-blue-400 font-bold py-2 pl-5 w-full mt-10 flex justify-between items-center">
        <div>
            Clients
        </div>

        <button @click="() => editClient('-1')"
            class="mx-5 border rounded-lg px-5 bg-[#d2d2d2] border-[#d2d2d2] shadow-lg font-normal py-1 text-sm">
            New Client
        </button>
    </div>

    <div class="relative overflow-x-auto shadow-md border-collapse">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
                class="text-xs text-gray-700 uppercase border-2 shadow border-black border-opacity-25 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr class="border">
                    <template v-for="client of Object.keys(clients[0] || [])">
                        <th v-if="client !== '_id'" scope="col"
                            class=" py-3 border border-collapse shadow font-bold text-center whitespace-nowrap">
                            {{ client }}
                        </th>
                    </template>
                    <th v-if="isEditable == true"
                        class="px-3 py-3 border border-collapse shadow font-bold text-center whitespace-nowrap">
                        Edit
                    </th>
                    <th v-if="isDeletable == true"
                        class="px-3 py-3 border border-collapse shadow font-bold text-center whitespace-nowrap">
                        Delete
                    </th>

                </tr>
            </thead>
            <tbody>

                <tr v-for="client of clients" class="bg-white border">
                    <template v-for="(c, key) of client">

                        <td v-if="typeof key === 'string' && key !== '_id'" scope="row" :attr-test="client"
                            class="text-center py-4 font-mono border whitespace-nowrap">
                            {{ c }}
                        </td>

                    </template>
                    <td class="px-3 py-4 font-mono border text-center" v-if="isEditable == true">
                        <img alt="Vue logo" class="cursor-pointer block mx-auto" src="../assets/pencil.svg" width="15"
                            height="15" @click="editClient(client._id)" />
                    </td>
                    <td class="py-4 font-mono border text-cente" v-if="isDeletable == true">
                        <img alt="Vue logo" class="cursor-pointer  block mx-auto" src="../assets/delete.svg" width="15"
                            height="15" @click="deleteClient(client._id)" />
                    </td>


                </tr>


            </tbody>
        </table>
    </div>
</template>