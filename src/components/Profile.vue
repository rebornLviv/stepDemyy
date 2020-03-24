<template>
    <div class="container-fluid cc">
     <div class="wrapper">

        <v-row>

            <v-col cols="4" class="userImgContainer">
                <p class="txtp">Профіль</p>
       <v-icon  class="iblc" size="240px">mdi-account</v-icon>
       <div class="btns">
       <v-btn>Змінити фото</v-btn>
       <v-btn to="courses">Мої курси</v-btn>
       <v-btn to="settings" >Налаштування    </v-btn>
       
       </div>
       


            </v-col>
            <router-view></router-view>
            
        </v-row>
     </div>
    </div>
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
    padding: 10px;
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