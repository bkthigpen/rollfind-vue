<template>
  <div class="Index grid md:grid-cols-2">
    <form class="Index__form transform md:translate-x-1/2 py-96">
      <h1 class="my-2 text-center">
        <span class="text-blue-100">Roll</span>
        <span class="text-yellow-400 mr-2">Find</span>
        <img class="Index__vue-logo" src="../assets/images/vue.png" />
      </h1>
      <p class="w-full text-2xl text-center">
        Quick search of ⚔️ D&D rules, stats, details, and general info.
      </p>
      <div class="mt-4 flex">
        <TextInput v-model="search" />
        <Button @click="getSearchResults" />
      </div>
      <div class="Results mt-4">
        <p>{{ searchResults.count }} found</p>
        <div
          v-for="(result, index) in searchResults.results"
          :key="index"
          class="Results__content my-4"
        >
          <div @click="getDetailedResults(result.route, result.slug)">
            <p>
              <strong>{{ result.name }}</strong>
            </p>
            <p class="truncate ..."><strong>Text</strong>: {{ result.text }}</p>
            <p class="capitalize">
              <strong>Route</strong>: {{ formatRoute(result.route) }}
            </p>
            <br />
            {{ result }}
          </div>
        </div>
      </div>
    </form>
    <div v-if="detailedResults" class="DetailedResults">
      <div class="px-4 pt-10">
        {{ detailedResults }}
      </div>
    </div>
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
    const searchResults = ref("");
    const detailedResults = ref("");

    const getSearchResults = () => {
      axios
        .get(`https://api.open5e.com/search/?text=${search.value}`)
        .then(response => (searchResults.value = response.data));
    };

    const getDetailedResults = (route, slug) => {
      axios
        .get(`https://api.open5e.com/${route}${slug}`)
        .then(response => (detailedResults.value = response.data));
    };

    const formatRoute = url => {
      let newUrl = url;
      newUrl = newUrl.replace("/", "");

      // maybe rework this?
      if (newUrl === "magicitems") {
        newUrl = newUrl.split("c").join("c ");
      }

      return newUrl;
    };

    return {
      detailedResults,
      formatRoute,
      getDetailedResults,
      getSearchResults,
      search,
      searchResults
    };
  }
};
</script>
