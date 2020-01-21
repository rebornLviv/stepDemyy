<template>
<v-content>
      <v-container
        class="fill-height"
        fluid
      >
<v-row
align="center"
          justify="center"
>

</v-row>
       
        <v-row
          align="center"
          justify="center"
        >
    
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
     <video  ref="source" width="650" height="420"   :src="lessons[currentLesson].videoUrl" type="video/mp4" controls>


        </video>
          </v-col>
          <div  class="playlist mt-6"  >
              <v-list>
                  <v-list-item v-for="lesson in lessons" :key="lesson.title" @click="changeVideo(lesson)">{{lesson.title}}</v-list-item>
                  
              </v-list>
           
              </div>
              
        </v-row>
        <v-row>
                <p ref="desc">{{lessons[currentLesson].description}}</p>
        </v-row>
      </v-container>
    </v-content>
</template>


<script>
import * as fb from 'firebase' 
export default {
    
data() {
    return {
      
    }
},

    methods: {
        changeVideo(lesson){
this.$refs.source.src= lesson.videoUrl
this.$refs.desc.textContent= lesson.description
console.log("duration",this.$refs.source)
console.log("duration",this.$refs.source.currentTime)



        },
    

        
    },
    computed: {
        lessons(){
            console.log('lessonsssss',this.$store.getters.getLessons)
          return  this.$store.getters.getLessons
        },
        currentLesson(){
          return this.$store.getters.getCurrentLesson
          
        },
       
        
    },
    mounted(){
      console.log(this.$store.getters.getCurrentTime)
this.$refs.source.currentTime=this.$store.getters.getCurrentTime;
    },
    created(){
        let course=this.$route.path.split('/')[2];
        console.log("kers",course)
        let lesson = this.$route.path.split('/')[3]
        console.log('lesssssson',lesson)
        this.$store.dispatch('setLessons',{course,lesson})
        

    },
  beforeCreate(){
let cs=this.$route.path.split('/')[2];
        console.log("Ekers",cs)
        let less = this.$route.path.split('/')[3]
        console.log('Elesssssson',less)
        this.$store.dispatch('getUserLesson',{less,cs})
        
  },

    
    beforeRouteLeave (to, from, next) {
      console.log("ctime",this.$refs.source.currentTime)

      next()
      // ...
    }
}
</script>



<style scoped>
.playlist{
border:1px solid gray; 
height: 400px;
margin-left: 170px;
}

</style>