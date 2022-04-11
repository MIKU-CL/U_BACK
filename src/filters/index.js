import Vue from "vue";
let Filters = {

};

for (let key in Filters) {
    Vue.filter(key, Filters[key]);
}