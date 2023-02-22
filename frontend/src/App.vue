<script lang="ts">
import Table from './components/TableComp.vue';
import { fetchClient } from './services/api';

export default {

  data() {
    return {
      clients: []
    }
  },
  async mounted() {
    const { data, error } = await fetchClient()

    if (!error)
      this.clients = data
  }
}

</script>

<template>
  <div class="container mx-auto max-w-2xl">

    <Table :client="clients" />
  </div>
</template>
