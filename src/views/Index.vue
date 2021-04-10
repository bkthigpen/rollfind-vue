<template>
  <div class="Index">
    <form
      class="Index__form"
      :class="{ 'Index__form--slide-up': searchResults }"
    >
      <section>
        <h1 class="my-2 text-center">
          <span class="text-blue-100">Roll</span>
          <span class="text-yellow-400">Find </span>
          <img
            class="Index__vue-logo -ml-2 -mt-2"
            src="../assets/images/vue.png"
            alt="Vue"
          />
        </h1>
        <h2 class="w-full text-2xl text-center">
          Quick search of ⚔️ D&D rules, stats, details, and general info.
        </h2>
        <div class="mt-4 flex">
          <TextInput v-model="search" />
          <Button @click="getSearchResults" />
        </div>
        <p class="italic mt-2">{{ searchResults.count || 0 }} found</p>
        <!-- Look at better way to do this -->
        <div v-if="loadingResults">
          <div class="h-screen">
            <LoaderSkeleton />
            <LoaderSkeleton />
            <LoaderSkeleton />
            <LoaderSkeleton />
            <LoaderSkeleton />
            <LoaderSkeleton />
            <LoaderSkeleton />
            <LoaderSkeleton />
          </div>
        </div>
      </section>
      <section class="Results mt-8">
        <div
          v-for="(result, index) in searchResults.results"
          :key="index"
          class="Results__card my-4"
          :class="setClass('Results__card-', result.route)"
        >
          <div @click="getDetailedResults(result.route, result.slug)">
            <h3>
              <strong>{{ result.name }}</strong>
            </h3>
            <p class="truncate ...">{{ result.text }}</p>
            <p
              class="Results__category mt-4"
              :class="setClass('Results__category-', result.route)"
            >
              {{ formatRoute(result.route) }}
            </p>
            <br />
            <!-- {{ result }} -->
          </div>
        </div>
      </section>
    </form>
    <div
      class="DetailedResults"
      :class="{ 'DetailedResults--opened': detailedResults }"
    >
      <template v-if="detailedResults">
        <button @click="resetResults" class="DetailedResults__close-button" />
        <div class="DetailedResults__container">
          <h4 class="font-bold text-center">{{ detailedResults.name }}</h4>
          <Button
            @click="toggleDetailedResults = !toggleDetailedResults"
            text="Debug"
            class="Button--debug text-center"
            role="button"
          />
          <template v-if="toggleDetailedResults">
            <div class="relative h-64 bg-gray-900 overflow-auto mt-4 p-2">
              <pre>{{ detailedResults }}</pre>
            </div>
          </template>
          <div
            v-if="detailedResults.group || detailedResults.alignment"
            class="grid grid-cols-2 gap-4 text-center capitalize mt-4"
          >
            <template v-if="detailedResults.group">
              <p class="font-bold bg-purple-700 rounded px-4 py-2">
                {{ detailedResults.group }}
              </p>
            </template>
            <template v-if="detailedResults.alignment">
              <p class="font-bold bg-purple-400 rounded px-4 py-2">
                {{ detailedResults.alignment }}
              </p>
            </template>
          </div>
          <div
            v-if="detailedResults.hit_points || detailedResults.armor_class"
            class="grid grid-cols-2 gap-4 text-center mt-4"
          >
            <div
              v-if="detailedResults.hit_points"
              class="bg-red-700 px-4 py-2 rounded"
            >
              <p class="font-bold">Hit Points</p>
              <p>{{ detailedResults.hit_points }}</p>
            </div>
            <div
              v-if="detailedResults.armor_class"
              class="bg-gray-400 px-4 py-2 rounded"
            >
              <p class="font-bold">Armor Class</p>
              <p>{{ detailedResults.armor_class }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 text-center mt-4">
            <div
              v-if="detailedResults.strength"
              class="bg-red-900 px-4 py-2 rounded"
            >
              <p class="font-bold">Strength</p>
              <p>{{ detailedResults.strength }}</p>
            </div>
            <div
              v-if="detailedResults.dexterity"
              class="bg-green-900 px-4 py-2 rounded"
            >
              <p class="font-bold">Dexterity</p>
              <p>{{ detailedResults.dexterity }}</p>
            </div>
            <div
              v-if="detailedResults.constitution"
              class="bg-blue-700 px-4 py-2 rounded"
            >
              <p class="font-bold">Constitution</p>
              <p>{{ detailedResults.constitution }}</p>
            </div>
            <div
              v-if="detailedResults.intelligence"
              class="bg-blue-900 px-4 py-2 rounded"
            >
              <p class="font-bold">Intelligence</p>
              <p>{{ detailedResults.intelligence }}</p>
            </div>
            <div
              v-if="detailedResults.wisdom"
              class="bg-indigo-700 px-4 py-2 rounded"
            >
              <p class="font-bold">Wisdom</p>
              <p>{{ detailedResults.wisdom }}</p>
            </div>
            <div
              v-if="detailedResults.charisma"
              class="bg-yellow-700 px-4 py-2 rounded"
            >
              <p class="font-bold">Charisma</p>
              <p>{{ detailedResults.charisma }}</p>
            </div>
            <div
              v-if="detailedResults.challenge_rating"
              class="bg-red-700 px-4 py-2 rounded"
            >
              <p class="font-bold">Challenge Rating</p>
              <p>{{ detailedResults.challenge_rating }}</p>
            </div>
          </div>
          <div
            v-for="(ability, index) in detailedResults.special_abilities"
            :key="index"
            class="SpecialAbilities mt-8"
          >
            <p v-if="ability.name" class="font-bold">
              {{ ability.name }}
            </p>
            <p>{{ ability.desc }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import Button from "../components/Button.vue";
import LoaderSkeleton from "../components/LoaderSkeleton.vue";
import TextInput from "../components/TextInput.vue";

export default {
  name: "Index",
  components: {
    Button,
    LoaderSkeleton,
    TextInput
  },
  setup() {
    const search = ref("");
    const searchResults = ref("");
    const detailedResults = ref("");
    const detailedResultsClass = ref("");
    const loadingResults = ref(false);
    const toggleDetailedResults = ref(false);

    const getSearchResults = () => {
      searchResults.value = "";
      loadingResults.value = true;
      return axios
        .get(`https://api.open5e.com/search/?text=${search.value}`)
        .then(response => {
          searchResults.value = response.data;
        })
        .catch(error => {
          console.error(error);
          loadingResults.value = false;
        })
        .then(() => (loadingResults.value = false));
    };

    const getDetailedResults = (route, slug) => {
      axios.get(`https://api.open5e.com/${route}${slug}`).then(response => {
        detailedResults.value = response.data;
      });
    };

    const formatRoute = url => {
      let newUrl = url;
      newUrl = newUrl.replace("/", "");

      // maybe rework this?
      if (newUrl.toLowerCase() === "magicitems") {
        newUrl = newUrl.split("c").join("c ");
      }

      return newUrl;
    };

    const setClass = (component, category) => {
      let newCatory = category;

      newCatory = newCatory.replace("/", "");

      return `${component}${newCatory}`;
    };

    const resetResults = () => {
      searchResults.value = "";
      detailedResults.value = "";
    };

    return {
      detailedResults,
      detailedResultsClass,
      formatRoute,
      getDetailedResults,
      getSearchResults,
      loadingResults,
      resetResults,
      search,
      searchResults,
      setClass,
      toggleDetailedResults
    };
  }
};
</script>
