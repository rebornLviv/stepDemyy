<template>
    <v-col cols="8" class="userData">
                <p class="txtp">Налаштування профілю</p>
                <div class="inpC" >
                    <input type="text" class="inp"> <v-icon class="edit" @click="()=>{}">mdi-lead-pencil</v-icon>
                </div>
                <div class="btns">
       <v-btn v-if="!confP" dark @click="configuratePassword" class="chP" > <span>Налаштування паролю</span>
       <v-spacer></v-spacer> 
        <v-icon color="white" >mdi-chevron-down</v-icon>
        </v-btn>
       <div v-if="confP" class="changepsw">
        <input type="password" name=""  placeholder="Введіть дійсний пароль" id="">
        <input type="password" name="" id="" placeholder="Введіть новий пароль">
        <input type="password" name="" id="" placeholder="Підтвердіть новий пароль">
<v-icon color="white" size="40px" @click="configuratePassword"  >mdi-chevron-up</v-icon>

       </div>
        <v-btn  @click="true" class="chP" > <span>Вийти з  аккаунту</span>
        </v-btn>
      
       </div>

            </v-col>
</template>



<script>
export default {
    data: ()=> ({

        confP:false

    }),

    methods:{

    configuratePassword(){
    this.confP = !this.confP

    }

    }
}
</script>

<style scoped>
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

.chP{
    width: 400px !important;

}
.changepsw>input{
    border-bottom: 1px solid white;
    padding: 10px;
    color: white;
    width: 70%;
    padding-bottom: 7px;
    
}
.cc{
    display: flex;
    justify-content: flex-start;
    height: 100%;
}
.iblc{

    width: 272px;
    height: 272px;
    border:1px solid black;
    margin-top: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
}
.wrapper{
 width: 70%;
 height: 100%;
}
.inp{
    border-bottom: 1px solid black ;
    margin-right: 5px;
}
.inpC{
    padding: 15px;
}
.userData{
    display:flex;
    flex-direction: column;
    align-items: center;
}
.btns{
    
    display: flex;
    flex-direction: column;
    justify-content: center;

}
.btns>button{
    margin: 10px;
    width: 200px;
}
.userImgContainer{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-right: 2px solid black;
}
.txtp{
    font-size: 50px;
    padding:0px;
    margin: 1px;
}
.edit:hover{
    color: black;
}
</style>