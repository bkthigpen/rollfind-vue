<template>
  <div class="index">
    <TextInput v-model="search">
      <Button class="ml-2" @click="getSearchResults" />
    </TextInput>
    <p>{{ searchResults }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import Button from "../components/Button.vue";
import TextInput from "../components/TextInput.vue";

export default {
  name: "Index",
  components: {
    Button,
    TextInput
  },
  setup() {
    const search = ref("");
    const searchResults = ref([]);

    function getSearchResults() {
      axios
        .get(`https://api.open5e.com/search/?text=${search.value}`)
        .then(response => (searchResults.value = response.data));
    }

    return { getSearchResults, search, searchResults };
  }
};
</script>
