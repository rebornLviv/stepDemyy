import * as firebase from 'firebase';


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
console.log('Maaaaaaaaaaaaaaaaaaaaanaging')
var uid= '';
var udata = null;    
let email = firebase.auth().currentUser.email;
console.log(email)
await firebase.firestore().collection("User").where("email","==",email).get()
.then(

     (user)=>{
        commit('setLoading', true)
        console.log("User Data")
        user.forEach(
            u=>{
            uid= u.id
            udata=u.data()
            console.log(u.data())
            }
        )
        console.log(udata)
        
    }
)
if(udata.courses[payload.course]){
    console.log("Already in")
     }
     else{
 console.log("in else");
 console.log('AddCoursePayload',payload)
 console.log("udata.courses",udata.courses[payload.course])
 console.log('userId',uid)
 
    await     firebase.firestore().collection("User").doc(uid).set({
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
         .then(
             ()=>{
                 commit('setLoading', false)
                 console.log('success')
             }
         )
         .catch(
             err=>{
                 commit('setLoading', false)
                 console.log("err",err)
             }
         )
 
 
     }



},
setCat({commit},payload){
 var tcourses=[]
firebase.firestore().collection('Courses').get()
.then(
courses=>{
    commit('setLoading', true)

    courses.forEach(
        course=>{

  tcourses.push(course.data().category) 
            
        }
    )
    console.log("All courses",tcourses)
    
} 

).then(
    ()=>{
        commit("setCat",tcourses)
        commit('setLoading', false)
    }
)


},


async setCourse({commit},payload){
    console.log('settingCourses',payload)
var tcourse = null;   
await  firebase.firestore().collection("Courses").where("category","==",payload).get()
.then(

    course=>{
        commit('setLoading', true)
 course.forEach(
    data=>{
        console.log("Course data:",data.data())
        tcourse=data.data();
        
    }
 )

 
 console.log('Returned data',tcourse)
 commit("setCourse",tcourse)
 commit('setLoading', false)
    }
)



},

 async getJoined({commit},payload){
    let crs = null;    
    let email = firebase.auth().currentUser.email;
    console.log(email)
  await  firebase.firestore().collection("User").where("email","==",email).get().then(
        user => {
            user.forEach(
                u=>{
                 crs = u.data().courses
                 console.log(crs)
                }
            )
            if(crs.hasOwnProperty(payload)){
                commit('setJoined',true)
                console.log("joined",crs)
            }
            else{
                commit('setJoined',false)  
                console.log("not joined",crs)
            }
        }
    )




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
