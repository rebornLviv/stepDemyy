<template>
    <v-col cols="8" class="userData">
                <p class="txtp">Налаштування профілю</p>
                <div class="inpC" >
             <input type="text" v-model="name" v-if="editName" class="inp"><p v-if="!editName" class="uName">{{userName}}</p> <v-spacer></v-spacer>
              <v-icon v-if="!editName" class="edit" @click="()=>{ editName = ! editName,name=userName}">mdi-lead-pencil</v-icon>
              <v-icon v-if="editName" class="edit" @click="changeName">mdi-check</v-icon>
              <v-icon v-if="editName" class="edit" @click="()=>{ editName = ! editName}">mdi-window-close</v-icon>
                </div>
                <div class="inpC" >
             <v-menu v-if="editDate"
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
             
             <p v-if="!editDate" class="uName">{{userBirthDay}}</p> <v-spacer></v-spacer>
              <v-icon v-if="!editDate" class="edit" @click="()=>{ editDate= ! editDate}">mdi-lead-pencil</v-icon>
              <v-icon v-if="editDate" class="edit" @click="changeBday">mdi-check</v-icon>
              <v-icon v-if="editDate" class="edit" @click="()=>{ editDate = ! editDate}">mdi-window-close</v-icon>
                </div>
                <div class="btns">
       <v-btn v-if="!confP" dark @click="configuratePassword" class="chP" > <span>Налаштування паролю</span>
       <v-spacer></v-spacer> 
        <v-icon color="white" >mdi-chevron-down</v-icon>
        </v-btn>
       <div v-if="confP" class="changepsw">
        <input type="password" v-model="password" name="" id="" placeholder="Введіть новий пароль">
        <input type="password"  v-model="repassword" name="" id="" placeholder="Підтвердіть новий пароль">
        <v-btn class="changeP" :disabled="(!password && !repassword ) || password !== repassword"
        :loading="isLoading"
        @click="changePassword"
        >Зберегти</v-btn>
<v-icon color="white" size="40px" @click="configuratePassword"  >mdi-chevron-up</v-icon>


       </div>
        <v-btn  @click="onLogout()" class="chP" > <span>Вийти з  аккаунту</span>
        </v-btn>
      
       </div>

            </v-col>
</template>

<script>
export default {
    data: () => ({

        confP:false,
        password:'',
        repassword:'',
        name:'',
        editName:false,
        editDate:false,
        date:null,
        menu:false

    }),
    methods: {
  onLogout() {
      console.log(this.isUserLoggedIn);
      this.$store.dispatch("logoutUser").catch(error => {
        console.log(error);
      });
      this.$router.push("/");
    },
    configuratePassword(){
    this.confP = !this.confP

    },
    changeName(){
    this.$store.dispatch('setUserName',this.name)
    this.editName = false;

    },
     changeBday(){
    this.$store.dispatch('setUserBirthDay',this.date)
this.editDate = false;
    },
    changePassword(){
    this.$store.dispatch('changePassword',this.password)
    
    setTimeout(()=>{
this.confP = false;
this.password = ''
    this.repassword = ''
    },1000)
    
    
        }
    

    },
    computed:{
        isLoading(){
            return this.$store.getters.loading
        },
        userName(){
            return this.$store.getters.getUserName
        },
        userBirthDay(){
            return this.$store.getters.getUserBirthDay
        }
        
    
    },

}
</script>

<style scoped>
.uName{
    margin-bottom: 0;
}
.changeP{
    margin-top: 10px;
}
.changepsw{
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 165px;
    background: #323232;
    border-radius: 10px;
    align-items: center;
    transition-duration: 5000ms;
}

.chP {
    width: 400px !important;

}

.changepsw>input {
    border-bottom: 1px solid white;
    padding: 10px;
    color: white;
    width: 70%;
    padding-bottom: 7px;

}

.cc {
    display: flex;
    justify-content: flex-start;
    height: 100%;
}

.iblc {

    width: 272px;
    height: 272px;
    border: 1px solid black;
    margin-top: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
}

.wrapper {
    width: 70%;
    height: 100%;
}

.inp {
    border-bottom: 1px solid black;
    margin-right: 5px;
}
.inpC{
    display: flex;
    padding: 15px;
    width: 300px;
}

.userData {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.btns {

    display: flex;
    flex-direction: column;
    justify-content: center;

}

.btns>button {
    margin: 10px;
    width: 200px;
}

.userImgContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-right: 2px solid black;
}

.txtp {
    font-size: 50px;
    padding: 0px;
    margin: 1px;
}

.edit:hover {
    color: black;
}
</style>
