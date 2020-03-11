<template>
  <v-app>
    <v-app-bar app color="white" dark class="barrr">
      <div class="black--text font-italic mr-5">
        <router-link to="/" tag="h2" class="font-weight-regular logo">Stepdemy</router-link>
      </div>
      <div class="navitems">
        <div>
          <v-menu offset-y>
            <template v-slot:activator="{on}">
              <v-btn text v-on="on">
                <span class="black--text">Категорії</span>

                <v-icon class="grey--text">{{idef}}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="cat in categories" :key="cat" :to="'/courses/' + cat">{{cat}}</v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div>
          <v-menu offset-y>
            <template v-slot:activator="{on}">
              <v-btn text v-on="on">
                <span class="black--text">Категорії</span>

                <v-icon class="grey--text">{{idef}}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="cat in categories" :key="cat" :to="'/courses/' + cat">{{cat}}</v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div>
          <v-menu offset-y>
            <template v-slot:activator="{on}">
              <v-btn text v-on="on">
                <span class="black--text">Категорії</span>

                <v-icon class="grey--text">{{idef}}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="cat in categories" :key="cat" :to="'/courses/' + cat">{{cat}}</v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>

      <div class="log">
        <v-btn text class="grey--text">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn v-if="!isUserLoggedIn" to="/login" text class="black--text">Вхід</v-btn>

        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="!isUserLoggedIn"
                text
                class="black--text"
                color="primary"
                dark
                v-on="on"
              >Open Dialog</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <strong class="headline">Вхід</strong>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row align="center" justify="center">
                    <v-col cols="12">
                      <v-form v-model="valid" lazy-validation ref="form">
                        <v-text-field
                          color="secondary"
                          name="login"
                          v-model="email"
                          type="text"
                          placeholder="Email"
                          :rules="emailRules"
                          required
                        />
                        <v-text-field
                          class="pa"
                          v-model="password"
                          color="secondary"
                          id="password"
                          placeholder="Password"
                          name="password"
                          type="password"
                          :rules="passwordRules"
                          required
                        />
                      </v-form>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <!-- <v-btn color="blue darken-1" text @click="dialog = false">Реєстрація</v-btn> -->
                <!-- <v-btn class="ma-2" outlined color="indigo" text @click="dialog = false">Реєстрація</v-btn> -->
                <v-btn
                  tag="a"
                  outlined
                  class="secondary--text sz ma-2"
                  to="/"
                  text
                  @click="dialog3 = !dialog3"
                >Зареєструватися</v-btn>
                <!-- <v-btn color="blue darken-1" text @click="dialog = false">Вхід</v-btn> -->
                <v-btn
                  class="ma-2 bg-black"
                  :loading="loading"
                  :disabled="loading"
                  color="white-text"
                  text
                  @click="loader = 'loading', dialog = !dialog"
                  v-if="!isUserLoggedIn"
                  depressed
                  to="/"
                >Вхід</v-btn>
                <!-- <v-btn
                  class="nr elevation-0 mr-2 disabled white--text"
                  @click="OnSubmit"
                  depressed
                  :disabled="valid === false"
                >Увійти</v-btn>-->
              </v-card-actions>
              <div class="pr">
                <v-btn
                  tag="a"
                  class="secondary--text sz"
                  to="/recover"
                  
                  text
                >Забули логін або пароль?</v-btn>
                <!-- <router-link tag="a" class="secondary--text sz" to="/register">Зареєструватися</router-link> -->
              </div>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialog3"
            max-width="500px"
            >
            <v-card>
              <v-card-title>
                <span>Реєстрація</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  @click="dialog3 = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <v-btn v-if="isUserLoggedIn" to="/" text @click="onLogout" class="black--text">Вийти</v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <template v-if="error">
      <v-snackbar
        color="dark"
        :timeout="30000"
        :multi-line="true"
        @input="closeError"
        :value="true"
      >
        {{ error}}
        <v-btn text dark @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>
<script>
import * as fb from "firebase";

export default {
  name: "App",
  data: () => ({
    //
    loader: null,
    loading: false,
    idef: "mdi-menu-down",
    idw: "mdi-menu-down",
    iup: "mdi-menu-up",
    dialog: false,
    dialog3: false,
    email: "",
    password: "",
    valid: false,
    emailRules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v =>
        (v && v.length >= 6) ||
        "Password must be equal or more than 6 characters"
    ]
  }),

  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser").catch(error => {
        console.log(error);
      });
      this.$router.push("/");
    },
    OnSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(err => console.log(err));
      }
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
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  }
};
</script>


<style  scoped>
.navitems:nth-child(1) {
  background: red;
}
.log {
  justify-content: end !important;
}
.barrr div {
  width: 100%;
  display: flex;
  justify-content: space-between;
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
.courses > div {
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
.courses > div > div {
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
  height: 360px;
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
  display: flex;
  justify-content: center;
}


</style>
