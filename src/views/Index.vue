<template>
  <div class="Index">
    <form
      class="Index__form"
      :class="{ 'Index__form--slide-up': searchResults }"
    >
      <h1 class="my-2 text-center">
        <span class="text-blue-100">Roll</span>
        <span class="text-yellow-400 mr-2">Find </span>
        <img class="Index__vue-logo" src="../assets/images/vue.png" alt="Vue" />
      </h1>
      <p class="w-full text-2xl text-center">
        Quick search of ⚔️ D&D rules, stats, details, and general info.
      </p>
      <div class="mt-4 flex">
        <TextInput v-model="search" />
        <Button @click="getSearchResults" />
      </div>
      <div class="Results mt-4">
        <p>{{ searchResults.count || 0 }} found</p>
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
            <!-- {{ result }} -->
          </div>
        </div>
      </div>
    </form>
    <div
      class="DetailedResults"
      :class="{ 'DetailedResults--opened': detailedResults }"
    >
      <template v-if="detailedResults">
        <button @click="resetResults">
          Close
        </button>
        <div class="px-4 pt-10 transition ease-in-out duration-300">
          {{ detailedResults }}
        </div>
      </template>
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

    const resetResults = () => {
      searchResults.value = "";
      detailedResults.value = "";
    };

    return {
      detailedResults,
      formatRoute,
      getDetailedResults,
      getSearchResults,
      resetResults,
      search,
      searchResults
    };
  }
};
</script>
