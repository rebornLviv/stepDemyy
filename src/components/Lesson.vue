<template>



<div class="container">


<v-row class="rr">
<v-col>
<video  ref="source" width="650" height="420"  @ended="setFlessons"  :src="lessons[this.$store.getters.getCurrentLesson].videoUrl " type="video/mp4" controls>


        </video>

</v-col>
<v-col>
<div  class="playlist mt-6"  >
              <v-list>
                  <v-list-item ref="lesson"  v-for="(lesson,index) in lessons" :key="index"  @click="changeVideo(lesson,index)">{{lesson.title}}{{getLesson(index)}}</v-list-item>
                  
              </v-list>
           
              </div>

  
</v-col>


</v-row>
<v-row>
  <div>
    <p ref="desc">Desc:{{lessons[currentLesson].description}}</p>
  </div>



</v-row>
<v-row>
  <div class="rate">
    <template>
  <div  class="text-center">
    <v-rating v-model="rating"
    background-color="black"
    half-increments
    dark
    size="30px"
    ripple
    color="yellow"
   @input="rateStars"
    ></v-rating>
  </div>
</template>
  </div>
</v-row>
</div>
    <!-- <v-rating v-model="rating"></v-rating> -->
  <!-- <v-icon  v-for="x in 5" :key="x" @click="rateStars(x)" :class="'star'+x" >mdi-star-outline</v-icon> -->
                    







      <!-- <v-container
        class="fill-height"
        fluid
      >
       
        <v-row
          align="center"
          justify="center"
        >
    
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
     <video  ref="source" width="650" height="420"  @ended="setFlessons"  :src="lessons[this.$store.getters.getCurrentLesson].videoUrl " type="video/mp4" controls>


        </video>
          </v-col>
          <div  class="playlist mt-6"  >
              <v-list>
                  <v-list-item ref="lesson"  v-for="(lesson,index) in lessons" :key="index"  @click="changeVideo(lesson,index)">{{lesson.title}}{{getLesson(index)}}</v-list-item>
                  
              </v-list>
           
              </div>
              
        </v-row>
        <v-row>
          
                <v-col>
<p ref="desc">{{lessons[currentLesson].description}}</p>
<div class="rate">
  <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
                        <v-icon>mdi-star-outline</v-icon>
</div>

                </v-col>



                
        </v-row>
      </v-container>
    -->
</template>


<script>
import * as fb from 'firebase' 
export default {
    
data() {
    return {
      clesson:null,
      flessons:[],
      rating:0
    }
},

    methods: {
        changeVideo(lesson,index){
          console.log(index)
          this.clesson=index
this.$refs.source.src= lesson.videoUrl
this.$refs.desc.textContent= lesson.description
this.rating = 0
        },
    getLesson(index){
          this.clesson = index
      },
      setFlessons(){

      let crs = this.$route.path.split('/')[2]
      console.log("Crrrs",crs)
      console.log('thisFlessons',this.flessons.includes(this.clesson))
      this.flessons.push(this.clesson)
      console.log(this.flessons)
      let res = this.flessons
        console.log('fired')
        this.$store.dispatch('finishedLessons',{flessons:res,course:crs}).
        then(
          ()=>{
                this.$store.dispatch('setProgress',{course:crs,amount:this.lessons.length})
          }
        )
      
      },
      saveProgress(){
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
      let coursed=this.$route.path.split('/')[2];
       console.log("Course Name",coursed)
      let lesson =this.$route.path.split('/')[3]
       console.log('Lesson Name',lesson)


      },
      rateStars(){
          console.log('stars',this.rating)
          let rating = this.rating
          console.log('videoUrl',this.$refs.source.src)
          let videoUrl = this.$refs.source.src
          console.log('category',this.$route.path.split('/')[2])
         let  category = this.$route.path.split('/')[2]
         this.$store.dispatch('rateLesson',{rating,videoUrl,category})
      }
      

        
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
      this.$refs.source.currentTime=this.$store.getters.getCurrentTime;
      
      


    },
    created(){
      this.clesson = this.$store.getters.getCurrentLesson;
      window.addEventListener('beforeunload',this.saveProgress)
    },
  async beforeCreate(){
    
    
    console.log("cUrrLessC",this.$store.getters.getCurrentLesson)
    console.log('LesssSCCC',this.$store.getters.getLessons)
     let course=this.$route.path.split('/')[2];
       console.log("Course Name",course)
     let lesson =this.$route.path.split('/')[3]
      console.log('Lesson Name',lesson)
   await  this.$store.dispatch('setLessons',{course,lesson})
   await    this.$store.dispatch('getCurrentLesson',course) 
        
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
      let coursed=this.$route.path.split('/')[2];
       console.log("Course Name",coursed)
      let lesson =this.$route.path.split('/')[3]
       console.log('Lesson Name',lesson)
      
      
      this.$store.dispatch('setInitialState')
      next()
      // ...
    },
}
</script>



<style scoped>
.rr{
  display: flex;
  align-items: center;
  justify-content: center;
}
.playlist{
border:1px solid gray; 
height: 400px;
margin-left: 170px;
}

</style>