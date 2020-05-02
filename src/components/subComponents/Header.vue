<template>
<v-app-bar app color="white" dark class="barrr">
        <div class="black--text font-italic mr-5 logo">
            <router-link to="/" tag="h2" class="font-weight-regular logo">Stepdemy</router-link>
        </div>
        <div class="navitems">
            <div>
                <v-menu offset-y>
                    <template v-slot:activator="{on}">
                        <v-btn text v-on="on">
                            <span class="black--text  navText">Предмети
                                <i aria-hidden="true" class="v-icon notranslate hidden-md-and-down v-icon--right mdi mdi-menu-down theme--light"></i>
                            </span>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="cat in categories" :key="cat" @click="setCourses(cat)">{{cat}}</v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <div>
                <v-btn text to="/lessons" >
                    <span class="black--text navText">
                        Уроки
                    </span>
                </v-btn>
            </div>

            <div>
                <v-btn text to="/teachers">
                    <span class="black--text navText">Викладачі</span>
                </v-btn>
            </div>
        </div>

        <div class="userSearch">
            <v-spacer></v-spacer>
            <v-btn text class="grey--text srch">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-menu bottom origin="center center" transition="scale-transition" :absolute="absolute">

                <template v-slot:activator="{ on }">
                    <v-btn fab dark icon v-on="on">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item>
                            <auth-modal v-if="!isUserLoggedIn" />
                            
                        <!-- Profile -->
                        <v-list-item-title >
                            <div class="userPanel">
                            <v-btn v-if="isUserLoggedIn" to="/" text @click="onLogout" class="black--text">Вийти</v-btn>
                            <v-btn v-if="isUserLoggedIn" to="/profile/settings">Профіль </v-btn>
                            </div>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>

    </v-app-bar>
    </template>
<script>
import AuthModals from './AuthModals'
export default {
    data: () => ({
        loader: null,
        loading: false,
        idef: "mdi-menu-down",
        idw: "mdi-menu-down",
        iup: "mdi-menu-up",
        absolute: false
    }),
    components:{
        authModal: AuthModals,
        
    },

    methods: {
        closeError() {
            this.$store.dispatch("clearError");
        },
        onLogout() {
            console.log(this.isUserLoggedIn);
            this.$store.dispatch('setInitialState')
            this.$store.dispatch("logoutUser")
            .then(()=>{
                console.log('successfuly loged out')
            })
            .catch(error => {
                console.log(error);
            });
            if(this.$route.path !== '/'){
                             this.$router.push('/')   
                            }
        },
        async setCourses(cat) {
            console.log('asss', cat)
            await this.$store.dispatch("setCourse", cat)
            this.$router.push({
                path: '/courses/' + cat
            })
        }
    },
    computed: {
        categories() {
            return this.$store.getters.getCat;
        },
        error() {
            return this.$store.getters.error;
        },
        isUserLoggedIn() {
            return this.$store.getters.isUserLoggedIn;
        },
        isLoading() {
            return this.$store.getters.loading
        }
    },
    watch: {
        loader() {
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 3000);

            this.loader = null;
        }
    },
 
};
</script>

<style scoped>
    .userPanel{
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .userPanel > a:first-child{
        margin-bottom: 10px;
    }
.v-btn__content .v-icon--left, .v-btn__content .v-icon--right {
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
