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
 <h1>{{title}}</h1>

<img :src="img" width="200" alt="Course Image">

<p>{{description}}</p>
<v-btn dark color="green darken-1" :to="'/courses/'+this.$route.path.split('/')[2]+'/' + title.replace(' ','')" @click="manageCourse"> Get started</v-btn>

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
      ///  console.log('manage')
        //const email=fb.auth().currentUser.email;
       // console.log(type(id))


        this.$store.dispatch('addCourse',this.$route.path.replace('/courses/','').toString())
      }
    },
    computed :{
      userId(){
        return this.$store.getters.user.id;
      },
title(){
  return  this.$store.getters.getTitle
},
description(){
return  this.$store.getters.getDesc
},
img(){
return  this.$store.getters.getSrc
}


    },
    created(){

this.$store.dispatch('setTitle',this.$route.path.replace('/courses/',''))
this.$store.dispatch('setDesc',this.$route.path.replace('/courses/',''))
this.$store.dispatch('setSrc',this.$route.path.replace('/courses/',''))

    },
   /* updated(){
        this.$store.dispatch('setTitle',this.$route.path.replace('/courses/',''))
        this.$store.dispatch('setDesc',this.$route.path.replace('/courses/',''))
this.$store.dispatch('setDesc',this.$route.path.replace('/courses/',''))
    },*/
    watch:{

        $route(to){
            console.log('parid',to.params['id'])
            this.$store.dispatch('setTitle',this.$route.path.replace('/courses/',''))
this.$store.dispatch('setDesc',this.$route.path.replace('/courses/',''))
this.$store.dispatch('setSrc',this.$route.path.replace('/courses/',''))
this.id=to.params['id']


        }
        
    },
    

}
</script>


<style>
    
</style>