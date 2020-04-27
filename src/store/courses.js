import { auth ,currentUser,coursesCollection,usersCollection} from "../firebase/firebaseConfig";
export default{
    state:{
        course:{title:'',description:'',imgSrc:''},
        description:'',
        src:'',
        categories:[],
        joined: false
          },
          mutations:{
  setCourse(state,payload){
      state.course=payload;
  },
  setJoined(state,payload){

state.joined = payload;
  },
  setDesc(state,payload){
      state.description=payload
  },
  setSrc(state,payload){ 
      state.src=payload
  },
  setCat(state,payload){
    state.categories=payload
}
          },
          

    actions:{
async  addCourse({commit},payload){
 console.log('Adding a course')
 const userData = await usersCollection.doc(auth.currentUser.uid).get()
if(userData.data().courses[payload.course]){
    console.log("You have already joined that course!")
    return;
     }
     else{
 console.log("Adding course");
 console.log('AddCoursePayload',payload)
 
    await     usersCollection.doc(auth.currentUser.uid).set({
             courses:{
                 [payload.course]:{  
                    ctitle:payload.title,
                    cprogress:0,
                    currentlesson:0,
                    lprogress:0 ,
                    flessons: []
             }
 
             }
         },{merge:true})
     }



},
async setCat({commit},payload){
let cats = []
let courses =   await  coursesCollection.get()
courses.forEach( course => cats.push(course.data().category) )
commit("setCat",cats)

},


async setCourse({commit},payload){
    console.log('settingCourses',payload)
var tcourse = null;
commit('setLoading', true)
let course = await  coursesCollection.where("category","==",payload).get()
course.forEach( c => tcourse = c.data() )
console.log('Returned data',tcourse)
 commit("setCourse",tcourse)
 commit('setLoading', false)

},

 async getJoined({commit},payload){
    const userData = await usersCollection.doc(auth.currentUser.uid).get()
    if(userData.data().courses.hasOwnProperty(payload)){
        commit('setJoined',true)
        console.log("joined",userData.data().courses)
    }
    else{
        commit('setJoined',false)  
        console.log("not joined",userData.data().courses)
    }
   




}



        
    },
    getters:{
        getCourse(state){
         return state.course
        },
        getCat(state){
         
        return state.categories
        },
        getJoined(state){
            return state.joined
        }
}
}
