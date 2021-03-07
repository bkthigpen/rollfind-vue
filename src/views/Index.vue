<template>
  <div class="Index">
    <form
      class="Index__form"
      :class="{ 'Index__form--slide-up': searchResults }"
    >
      <section>
        <h1 class="my-2 text-center">
          <span class="text-blue-100">Roll</span>
          <span class="text-yellow-400 mr-2">Find </span>
          <img
            class="Index__vue-logo"
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
        <p>{{ searchResults.count || 0 }} found</p>
      </section>
      <section class="Results mt-4">
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
            <p class="truncate ..."><strong>Text</strong>: {{ result.text }}</p>
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
          <!-- Fun data parsing for undocumented data -_- -->
          <!-- <pre>{{ detailedResults }}</pre>
          <br />
          <br /> -->
          <h4 class="font-bold text-center">{{ detailedResults.name }}</h4>
          <div
            v-if="detailedResults.group || detailedResults.alignment"
            class="flex"
          >
            <template v-if="detailedResults.group">
              <p
                class="flex-1 font-bold bg-purple-700 rounded p-2 mt-4 text-center mr-1"
              >
                {{ detailedResults.group }}
              </p>
            </template>
            <template v-if="detailedResults.alignment">
              <p
                class="flex-1 font-bold bg-purple-400 rounded p-2 mt-4 capitalize text-center ml-1"
              >
                {{ detailedResults.alignment }}
              </p>
            </template>
          </div>
          <div class="flex text-center mt-4">
            <p class="DetailedResults__ac">
              <span class="absolute inset-1/2 z-10 transform rotate-45 w-full">
                Hit Points
                <br />
                {{ detailedResults.hit_points }}
              </span>
            </p>
            <p class="flex-1 bg-blue-700 rounded p-2 m-2 font-bold">
              Armor Class
              <br />
              {{ detailedResults.armor_class }}
            </p>
          </div>
          <p>hit_points: {{ detailedResults.hit_points }}</p>
          <p>hit_dice: {{ detailedResults.hit_dice }}</p>
          <p>strength: {{ detailedResults.strength }}</p>
          <p>dexterity: {{ detailedResults.dexterity }}</p>
          <p>constitution: {{ detailedResults.constitution }}</p>
          <p>strength: {{ detailedResults.intelligence }}</p>
          <p>wisdom: {{ detailedResults.wisdom }}</p>
          <p>charisma: {{ detailedResults.charisma }}</p>
          <p>challenge_rating: {{ detailedResults.challenge_rating }}</p>
          <br />
          <br />
          <div
            v-for="(ability, index) in detailedResults.special_abilities"
            :key="index"
            class="SpecialAbilities mt-4"
          >
            <p v-if="ability.name">
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
import TextInput from "../components/TextInput.vue";

export default {
  name: "Index",
  components: {
    Button,
    TextInput
  },
  setup() {
    const search = ref("");
    const searchResults = ref({});
    const detailedResults = ref("");
    const detailedResultsClass = ref("");

    const getSearchResults = () => {
      axios
        .get(`https://api.open5e.com/search/?text=${search.value}`)
        .then(response => (searchResults.value = response.data));
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
      resetResults,
      search,
      searchResults,
      setClass
    };
  }
};
</script>
