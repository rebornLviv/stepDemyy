<template>
<v-app>
    <Header />
    <v-progress-linear v-if="isLoading" class="pb" indeterminate color="black"></v-progress-linear>
    <v-content>

        <router-view></router-view>
    </v-content>

    <template v-if="error">
        <v-snackbar color="dark" :timeout="30000" :multi-line="true" @input="closeError" :value="true">
            {{ error }}
            <v-btn text dark @click.native="closeError">Close</v-btn>
        </v-snackbar>
    </template>

    <Footer />
</v-app>
</template>

<script>
import {
    mdiAccount
} from "@mdi/js";
import user from './store/user';
import AuthModals from './components/subComponents/AuthModals.vue';
import Footer from './components/subComponents/Footer';
import Header from './components/subComponents/Header.vue';

export default {
    name: "App",
    components: {
        Footer,
        Header
    },
    methods: {
        closeError() {
            this.$store.dispatch("clearError");
        }
    },
    computed: {
        error() {
            return this.$store.getters.error;
        },
        isLoading() {
            return this.$store.getters.loading
        }
    },
    async created() {
        await this.$store.dispatch('setCat');
    }
};
</script>

<style scoped >

.v-btn__content .v-icon--left,
.v-btn__content .v-icon--right {
    font-size: 34px;
}

.navText {
    font-size: 25px;
    font-weight: 300;
    color: black;
}

.logo {
    width: 100px !important;
}

.pb {
    height: 5px;
    position: fixed;
    bottom: 0px;
    top: 65px;
}

.navitems {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 1034px;
}

.navitems>div {
    width: 200px !important;
}

.log {
    justify-content: end !important;
}

.barrr div {
    width: 100%;
    display: flex;

}

.txt {
    font-size: 50px;
}

.c1 {
    height: 550px;
    width: 100%;
    background-image: url("./img/laptop.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    padding: 0;
    background-size: cover;
}

.blackt {
    height: 130px;
    background: rgba(0, 0, 0, 0.75);
    background-size: 100%;
    width: 100%;
    margin-top: 60px;

    justify-content: center;
}

.comp {
    width: 500px;
    height: 45px;
    background: rgba(128, 128, 128, 0.5);
    font-size: 20px;
}

.courses>div {
    border: 1px solid black;
    height: 200px;
    width: 300px;
    background-size: contain;
    border-style: none;
    background-position: center;
    background-image: url("https://tadtadya.com/en/wp-content/uploads/sites/2/2017/09/html5-css3.png");
    background-color: lightgray;
}

.ft {
    background: black;
}

.sbox {
    background: rgba(128, 128, 128, 0.7);
    height: 50px;
    width: 500px;
    font-size: 25px;
    padding-left: 30px;
}

.blacktm {
    height: 90px;
    background: rgba(0, 0, 0, 0.75);
    background-size: 100%;
    margin-top: 50px;
    width: 100%;
}

.courses>div>div {
    height: 90px;
    background: rgba(0, 0, 0, 0.75);
    background-size: 100%;
    margin-top: 50px;
    width: 100%;
    text-align: center;
}

.logo:hover {
    cursor: pointer;
}

.blacktm:hover {
    display: none;
}

.v-application .headline {
    margin: 0 auto;
    font-size: 32px !important;
}

.v-card {
    height: 390px;
    overflow-y: hidden;
}

.v-card__text {
    height: 190px;
}

.ma-2 {
    color: white !important;
}

.v-card__actions {
    display: flex;
    justify-content: center;
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-o-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

.bg-black {
    background-color: black;
    color: white;
}

.pr {
    display: flex;
    justify-content: space-center;
}

.sz {
    margin: 0 auto;
}

.v-card__title {
    content: "";
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 0px;
}

.v-dialog>.v-card>.v-card__title {
    font-size: 30px;
    padding-top: 5px;
}

.theme--dark.v-btn.v-btn--icon {
    color: #707070;
    float: right;
}

.v-icon--svg {
    height: 100px;
    width: 100px;
    fill: currentColor;
    color: #4e5256;
}

.theme--light.v-icon {
    color: #4e5256;
}

.bts {
    justify-content: center;
}

.v-card {
    overflow-x: hidden;
}

.register-wrap {
    height: 500px;
}

.v-menu__content--fixed {
    margin-top: 0px;
}

.v-list-item {
    display: block;
    padding-top: 10px;
    cursor: pointer;
}

.v-list-item__title {
    padding-bottom: 15px;
}

.recover-dialog {
    height: 230px;
}

.userSearch {
    width: 100px !important;
    display: flex;
    align-items: center;
}

.srch+div {
    display: none;
}
</style>
