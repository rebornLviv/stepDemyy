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
     <video  ref="source" width="650" height="420"   :src="lessons[currentLesson.currentlesson].videoUrl" type="video/mp4" controls>


        </video>
          </v-col>
          <div  class="playlist mt-6"  >
              <v-list>
                  <v-list-item ref="lesson" v-for="(lesson,index) in lessons" :key="lesson.title" @click="changeVideo(lesson,index)">{{lesson.title}}</v-list-item>
                  
              </v-list>
           
              </div>
              
        </v-row>
        <v-row>
                <p ref="desc">{{lessons[currentLesson.currentlesson].description}}</p>
        </v-row>
      </v-container>
    </v-content>
</template>


<script>
import * as fb from 'firebase' 
export default {
    
data() {
    return {
      clesson:null
    }
},

    methods: {
        changeVideo(lesson,index){
          console.log(index)
          this.clesson=index
this.$refs.source.src= lesson.videoUrl
this.$refs.desc.textContent= lesson.description
//console.log("duration",this.$refs.source)
//console.log("duration",this.$refs.source.currentTime)



        },
    

        
    },
    computed: {
        lessons(){
            //console.log('lessonsssss',this.$store.getters.getLessons)
          return  this.$store.getters.getLessons
        },
        currentLesson(){
          return this.$store.getters.getCurrentLesson
          
        },
       
        
    },

    updated(){
      this.$refs.source.currentTime=this.$store.getters.getCurrentLesson.lprogress
this.clesson=this.$store.getters.getCurrentLesson.currentlesson

    },
    created(){
       // let course=this.$route.path.split('/')[2];
        //console.log("kers",course)
        //let lesson = this.$route.path.split('/')[3]
        //console.log('lesssssson',lesson)
        //this.$store.dispatch('setLessons',{course,lesson})
        
        // let course=this.$route.path.split('/')[2];
        // console.log("Course Name",course)
        // let lesson = this.$route.path.split('/')[3]
        // console.log('Lesson Name',lesson)
        // this.$store.dispatch('setLessons',{course,lesson})
        // this.$store.dispatch('getCurrentLesson',course)   
        

    },
  beforeCreate(){
     let course=this.$route.path.split('/')[2];
      console.log("Course Name",course)
      let lesson =this.$route.path.split('/')[3]
      console.log('Lesson Name',lesson)
 this.$store.dispatch('setLessons',{course,lesson})
      this.$store.dispatch('getCurrentLesson',course) 
        
  },

    
    beforeRouteLeave (to, from, next) {
     //console.log("Current time",this.$refs.source.currentTime)
      let course=this.$route.path.split('/')[2];
      let finished =this.$refs.source.ended
      let currentTime=this.$refs.source.currentTime
      let currentLesson=this.clesson
      let amount= this.lessons.length
      let courseprogress= (( finished  ? currentLesson+1 : 0  ) * (100/amount)) +'%'
      let flessons =[]

      if (finished){
      if(!flessons.includes(currentLesson)){
      flessons.push(currentLesson)
      }

      }
      this.$store.dispatch("updateLesson",{currentTime,currentLesson,flessons,course,amount})

      console.log("currentTime",currentTime)
      console.log("currentLesson",currentLesson)
      console.log("Course progress",courseprogress)
      console.log("Ended",this.$refs.source.ended)
      
      
      
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