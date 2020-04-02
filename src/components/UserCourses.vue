<template>
    <v-col cols="8" class="userData">
                <p class="txtp">Мої курси</p>
 
                <div class="courseCont">
                    <v-card    class="course" v-for="x in userCourses " :key="x.title"   >
                        <p>{{x.title}}</p>
                        <p>Поточний урок : {{x.clesson+1}}</p>

                        <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :value="x.progress"
      :color="parseInt(x.progress) >= 0 && parseInt(x.progress) < 25 ? 'red' : parseInt(x.progress) >= 25 && parseInt(x.progress) < 50 ? 'yellow' : parseInt(x.progress) >= 50 && parseInt(x.progress) < 75 ? 'orange': parseInt(x.progress) >= 75 ? 'green' : ''   "
      
    >
      {{ parseInt(x.progress) + '%' }}
    </v-progress-circular>
  
                        <v-btn @click="goToCourse(x.title,x.ctitle)">Продовжити</v-btn>
                    </v-card>
                </div>
            </v-col>
</template>



<script>
export default {
    data: ()=> ({

        confP:false

    }),

    methods:{

   goToCourse(course,lesson){

       this.$router.push({path:`/courses/${course}/${lesson}`})

   }

    },
    computed:{
        userCourses(){
            return  this.$store.getters.getMyCourses
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