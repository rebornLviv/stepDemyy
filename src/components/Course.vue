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
 <h1 ref="titl">{{course.title}}</h1>

<img :src="course.imgSrc" width="200" alt="Course Image">

<p>{{course.description}}</p>
<v-btn dark color="green darken-1" :to="'/courses/'+this.$route.path.split('/')[2]+'/' + course.title.replace(' ','')" @click="manageCourse"> Get started</v-btn>

          </v-col>

        </v-row>
      </v-container>



    </v-content>
</template>



<script>
import * as fb from 'firebase'

export default {
    data() {
        return {
            name: this.$route.path.replace('/courses/',''),
            id:this.$route.params['id'] 
            
        }
    },
    methods: {
      manageCourse(){
      console.log('manage')
        //const email=fb.auth().currentUser.email;
       // console.log(type(id))
 let course=this.$route.path.replace('/courses/','')
let title = this.course.title.replace(" ",'')
        this.$store.dispatch('addCourse',{course,title})
      }
    },
    computed :{
      userId(){
        return this.$store.getters.user.id;
      },
course(){

  return  this.$store.getters.getCourse
},


    },
    beforeCreate(){
      


    },
    created(){



    },
   /* updated(){
        this.$store.dispatch('setTitle',this.$route.path.replace('/courses/',''))
        this.$store.dispatch('setDesc',this.$route.path.replace('/courses/',''))
this.$store.dispatch('setDesc',this.$route.path.replace('/courses/',''))
    },*/
    watch:{

        $route(to){
            console.log('parid',to.params['id'])
  this.$store.dispatch('setCourse',this.$route.path.replace('/courses/',''))
  //          this.$store.dispatch('setTitle',this.$route.path.replace('/courses/',''))
//this.$store.dispatch('setDesc',this.$route.path.replace('/courses/',''))
//this.$store.dispatch('setSrc',this.$route.path.replace('/courses/',''))
this.id=to.params['id']


        }
        
    },
    

}
</script>


<style>
    
</style>