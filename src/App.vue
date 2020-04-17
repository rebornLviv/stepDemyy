<template>
<v-app>
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
                        <v-list-item-title v-if="!isUserLoggedIn">
                            <v-row justify="center">
                                <v-dialog v-model="dialog" max-width="500px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn text class="black--text" color="primary" dark v-on="on" @click.stop="dialog = false">Увійти</v-btn>
                                    </template>

                                    <!-- Модалка Вхід  -->
                                    <v-card>
                                        <v-btn icon dark @click="dialog = false">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                        <v-card-title>
                                            <strong class="headline">Вхід</strong>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-row align="center" justify="center">
                                                    <v-col cols="12">
                                                        <v-form v-model="valid" lazy-validation ref="form">
                                                            <v-text-field color="secondary" name="login" v-model="email" type="text" placeholder="Email" :rules="emailRules" required />
                                                            <v-text-field class="pa" v-model="password" color="secondary" id="password" placeholder="Password" name="password" type="password" :rules="passwordRules" required />
                                                            <v-card-actions>

                                                                <v-btn tag="a" outlined class="secondary--text sz ma-2" to="/" text @click="dialog3 = !dialog3, dialog = !dialog">Зареєструватися</v-btn>

                                                                <v-btn class="ma-2 bg-black" :loading="isLoading" color="white-text" text @click="OnLogin" v-if="!isUserLoggedIn" depressed to="/">Вхід</v-btn>

                                                            </v-card-actions>
                                                            <div class="pr">
                                                                <v-btn tag="a" class="secondary--text sz" to="/" @click="recoverDialog = !recoverDialog, dialog = !dialog" text>Забули логін або пароль?</v-btn>
                                                            </div>
                                                        </v-form>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>
                                    </v-card>
                                    <!--Модалка Вхід  -->
                                </v-dialog>
                            </v-row>

                            <!-- Recover Dialog -->
                            <v-row justify="center" align="center">
                                <v-dialog v-model="recoverDialog" persistent max-width="600px">
                                    <v-card class="recover-dialog">
                                        <v-card-title class="card-title">
                                            <span class="headline">Введіть свій емейл</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <v-row align="center" justify="center">
                                                    <v-col cols="12" sm="8" md="4">
                                                        <v-form v-model="valid" lazy-validation ref="form">
                                                            <v-text-field color="secondary" name="login" v-model="email" type="text" placeholder="Email" :rules="emailRules" />
                                                        </v-form>

                                                        <v-card-actions class="mt-4 bts">
                                                            <v-btn class="nr ml-2" text to="/" color="secondary" @click="recoverDialog = false">Закрити</v-btn>
                                                            <v-btn class="nr elevation-0 mr-2 disabled white--text" @click="recover" :loading="isLoading" depressed color="rgb(20, 19, 19)" :disabled="valid===false">Продовжити</v-btn>
                                                        </v-card-actions>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </v-row>
                            <!-- Recover Dialog -->
                        </v-list-item-title>

                        <!-- Register -->

                        <!-- Register -->
                        <v-list-item-title v-if="!isUserLoggedIn">
                            <v-row>
                                <v-dialog v-model="dialog3" max-width="600px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn text class="black--text" color="primary" dark v-on="on" @click.stop="dialog = false">Зареєструватись</v-btn>
                                    </template>

                                    <v-card class="register-wrap">
                                        <v-btn icon dark @click="dialog3 = false">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                        <v-card-title>
                                            <span>Реєстрація</span>
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-icon>{{ icons.mdiAccount }}</v-icon>
                                        </v-card-actions>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" sm="8" md="8">
                                                <v-form v-model="valid" lazy-validation ref="form">
                                                    <v-text-field v-model="email" color="secondary" name="login" :rules="emailRules" type="text" placeholder="Email" />

                                                    <v-text-field class="pa" color="secondary" v-model="password" id="password" :rules="passwordRules" placeholder="Password" name="password" type="password" />
                                                    <v-text-field class="pa" color="secondary" id="password" v-model="repassword" :rules="rePasswordRules" placeholder="Confirm password" name="password" type="password" />
                                                    <v-card-actions class="mt-4 bts">
                                                        <v-btn class="nr ml-2" text color="secondary" @click="dialog3 = false">Закрити</v-btn>
                                                        <v-btn @click="OnRegister" :loading="isLoading" class="nr elevation-0 mr-2" dark>Далі</v-btn>
                                                    </v-card-actions>
                                                </v-form>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-dialog>

                            </v-row>
                        </v-list-item-title>

                        <!-- Register -->
                        <v-list-item-title>

                            <v-btn v-if="isUserLoggedIn" to="/" text @click="onLogout" class="black--text">Вийти</v-btn>
                            <v-btn v-if="isUserLoggedIn" to="/profile/settings">Профіль </v-btn>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>

    </v-app-bar>
    <v-progress-linear v-if="isLoading" class="pb" indeterminate color="black"></v-progress-linear>
    <v-content>

        <router-view></router-view>
    </v-content>
    <template v-if="error">
        <v-snackbar color="dark" :timeout="30000" :multi-line="true" @input="closeError" :value="true">
            {{ error}}
            <v-btn text dark @click.native="closeError">Close</v-btn>
        </v-snackbar>
    </template>
    <v-content>
        <v-footer absolute dark class="font-weight-medium  white--text  ">
            <v-col class="text-center" cols="12">
                <strong>Львів</strong> {{ new Date().getFullYear() }}
            </v-col>
        </v-footer>

    </v-content>
</v-app>
</template>

<script>
import * as fb from "firebase";

import {
    mdiAccount
} from "@mdi/js";

export default {
    name: "App",
    data: () => ({
        loader: null,
        loading: false,
        idef: "mdi-menu-down",
        idw: "mdi-menu-down",
        iup: "mdi-menu-up",
        dialog: false,
        dialog3: false,
        recoverDialog: false,
        email: "",
        password: "",
        valid: false,
        repassword: "",
        icons: {
            mdiAccount
        },
        items: [{
            title: "Вхід"
        }, {
            title: "Зареєструватись"
        }],
        absolute: false
    }),

    methods: {
        closeError() {
            this.$store.dispatch("clearError");
        },
        onLogout() {
            console.log(this.isUserLoggedIn);
            this.$store.dispatch('setInitialState')
            this.$store.dispatch("logoutUser").catch(error => {
                console.log(error);
            });
            this.$router.push("/");
        },
        OnLogin() {

            if (this.$refs.form.validate()) {
                const user = {
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch('setInitialState')
                this.$store
                    .dispatch("loginUser", user)
                    .then(() => {
                        this.loader = "loading";
                        this.dialog = !this.dialog;

                        this.$router.push("/");
                    })
                    .catch(err => console.log(err));
            }
        },
        OnRegister() {
            console.log(this.isLoading)
            if (this.$refs.form.validate()) {
                const reguser = {
                    email: this.email,
                    password: this.password
                };
                const user = {
                    email: this.email.toLowerCase(),
                    password: this.password,
                    courses: {}
                };
                this.$store.dispatch('setInitialState')
                this.$store
                    .dispatch("registerUser", reguser)
                    .then(() => {
                        fb.firestore()
                            .collection("User")
                            .add(user);
                        this.dialog3 = !this.dialog3;
                        this.$router.push("/");
                    })
            }
        },
        recover() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('recoverUser', this.email)
                    .then(
                        () => {
                            this.$router.push('/')
                        }
                    )
                    .catch(
                        err => console.log('err', err))
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
        emailRules() {
            return [
                v => !!v || "E-mail is required",
                v =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "E-mail must be valid"
            ];
        },
        passwordRules() {
            return [
                v => !!v || "Password is required",
                v =>
                (v && v.length >= 6) ||
                "Password must be equal or more than 6 characters"
            ];
        },
        rePasswordRules() {
            return [
                v => !!v || "Please repeat password",
                v => v === this.password || "Passwords didn`t match"
            ];
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
    updated() {
        console.log("Signed?", this.isUserLoggedIn)
    }
};
</script>

<style scoped>
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
