<template>
<div>
            <v-list-item-title >
                            <v-row justify="center">
                                <v-dialog v-model="dialog" max-width="500px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn text class="black--text" color="primary" dark v-on="on" @click.stop="dialog = false">Увійти</v-btn>
                                    </template>

                                    <!-- Модалка Вхід  -->
                                    <v-card>
                                        <v-btn icon dark @click="dialog  = false">
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

                                                                <v-btn class="ma-2 bg-black"  color="white-text" text @click="OnLogin"  depressed to="/">Вхід</v-btn>

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
                                                            <v-btn class="nr elevation-0 mr-2 disabled white--text" @click="recover"  depressed color="rgb(20, 19, 19)" :disabled="valid===false">Продовжити</v-btn>
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
<v-list-item-title >
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
                                            <v-icon size="50">mdi-account</v-icon>
                                        </v-card-actions>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" sm="8" md="8">
                                                <v-form v-model="valid" lazy-validation ref="form">
                                                    <v-text-field v-model="email" color="secondary" name="login" :rules="emailRules" type="text" placeholder="Email" />

                                                    <v-text-field class="pa" color="secondary" v-model="password" id="password" :rules="passwordRules" placeholder="Password" name="password" type="password" />
                                                    <v-text-field class="pa" color="secondary" id="password" v-model="repassword" :rules="rePasswordRules" placeholder="Confirm password" name="password" type="password" />
                                                    <v-card-actions class="mt-4 bts">
                                                        <v-btn class="nr ml-2" text color="secondary" @click="dialog3 = false">Закрити</v-btn>
                                                        <v-btn @click="OnRegister"  class="nr elevation-0 mr-2" dark>Далі</v-btn>
                                                    </v-card-actions>
                                                </v-form>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-dialog>

                            </v-row>
                        </v-list-item-title>
</div>

                        </template> 

<script>
    export default {
    name:'auth-models',
    props:['registermode'],
    data: () => ({
        loader: null,
        loading: false,
        dialog: false,
        dialog3: false,
        email: "",
        password: "",
        valid: false,
        repassword: "",
        absolute: false,
        recoverDialog:false
    }),
    methods:{
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
                        this.dialog = !this.dialog;
                    })
                    .catch(err => console.log(err));
            }
        },
        recover() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('recoverUser', this.email)
                    .then(
                        () => {
                            if(this.$route.path !== '/'){
                             this.$router.push('/')   
                            }
                            
                        }
                    )
                    .catch(
                        err => console.log('err', err))
            }
        },
        OnRegister() {
            
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
                    .then(
                        ()=>{
                            if(this.$route.path !== '/'){
                             this.$router.push('/')   
                            }
                        }
                    )
                    .catch(
                        (err)=>{
                            console.log('err reg',err)
                        }
                    )
            }
        },





    },
    computed:{
        getModel(){
        return this.registermode ? this.dialog3 : this.dialog
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


    },
}

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