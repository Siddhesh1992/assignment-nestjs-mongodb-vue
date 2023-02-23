
<script lang="ts">
import { PartialClient } from '../../models/client';
import { fetchClient } from '../../services/api';
import TableComp from '../Table.vue'
// const count = ref(0)
export default {
  data() {
    return {
      clients: [] as PartialClient[],
    }
  },
  components: {
    TableComp,
  },
  async mounted() {
    const { data, error } = await fetchClient();
    console.log(data)

    if (!error) {
      this.clients = data.map(res => {
        const { name, email, phone, _id } = res;
        const provider = res.provider.map(p => p.name).join(", ");
        return { name, email, phone, provider, _id }
      })
    }
  }
}
</script>

<template>
  <TableComp :clients="clients" :isEditable="true" :isDeletable="true" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
