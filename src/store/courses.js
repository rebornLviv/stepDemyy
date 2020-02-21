import  * as fb from 'firebase'
export default{
    state:{
        course:[],
        description:'',
        src:'',
        categories:[]
          },
          mutations:{
  setCourse(state,payload){
      state.course=payload
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
addCourse({commit},payload){

var uid= null;
var udata = null;    
var fless = new Set();
fb.firestore().collection("User").where("email","==",fb.auth().currentUser.email).get()
.then(

    user=>{
        console.log("User Data")
        user.forEach(
            u=>{

            uid= u.id
            udata=u.data()
            console.log(u.data())
            }
        )
        console.log(udata.courses[payload.course])
        if(udata.courses[payload.course]){
   console.log("Already in")
    }
    else{
console.log("in else");
console.log("udata.courses",udata.courses[payload.course])

        fb.firestore().collection("User").doc(uid).firestore.set({
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
    }
)



},
setCat({commit},payload){
 var tcourses=[]
fb.firestore().collection('Courses').get()
.then(
courses=>{

    courses.forEach(
        course=>{

  tcourses.push(course.data().category) 
            
        }



    )
    console.log("All courses",tcourses)
    commit("setCat",tcourses)
} 

)


},
setCourse({commit},payload){
    
var tcourse;   
fb.firestore().collection("Courses").where("category","==",payload).get()
.then(

    course=>{
 course.forEach(
    data=>{
        console.log("Course data:",data.data())
        tcourse=data.data();
        
    }
 )

 
 console.log('Returned data',tcourse)
 commit("setCourse",tcourse)
    }
)



},





        
    },
    getters:{
        getCourse(state){
         return state.course
        },
        getCat(state){
         
        return state.categories
        }


}
}
/*
export default{
    state:{
      title:'',
      description:'',
      src:''
        },
        mutations:{
setTitle(state,payload){
    state.title=payload
},
setDesc(state,payload){
    state.description=payload
},
setSrc(state,payload){
    state.src=payload
},

        },
        actions:{
            addCourse(payload){
                let id=null;
                let alr=false;
                    fb.firestore().collection('User').where('email','==',fb.auth().currentUser.email).get()
                    .then(
                       doc=>{
                        
                           doc.forEach(
                               el=>{
                
                                 id=el.id
                                   console.log("this users data",el.data())
                                   console.log(id)
                              
                                   el.data().courses.forEach(
                                       e=>{
                                        if(e.cname==payload.getters.getTitle){
                                            alr=true
                                            
                                        }
                                            console.log("this users eeee",e)
                
                                       }
                                   )
                               }
                           )
                if(alr==false){
                        
                           fb.firestore().collection('User').doc(id).set({
                            
                            courses: fb.firestore.FieldValue.arrayUnion({
                    cname:payload.getters.getTitle,
                    cprogress:0,
                    currentlesson:1,
                    lprogress:0          
                    
                            })
                    
                           })
                }
                            }
                    )
                       .catch(
                           e=>{
                               console.log("errrrror",e)
                           }
                       )
                
                       
                fb.firestore().collection('User').doc(id).update({
                
                courses:courses.push(course)
                
                })
                
                },




            setTitle({commit},payload){
                console.log(payload)
                let cname=''
                fb.firestore().collection('Courses').where('category','==',payload).get()
                .then(
                    (data)=>{
                data.forEach(
                    el=>{
                        console.log(el.data())
                cname= el.data().title
                    }
                    
                )
                commit('setTitle',cname)
                console.log(cname)
                    }
                )
                .catch(
                    er=>{
                        console.log("er",er)
                    }
                )
                
                
               
            },
            setDesc({commit},payload){
                let cname=''
                fb.firestore().collection('Courses').where('category','==',payload).get()
                .then(
                    (data)=>{
                data.forEach(
                    el=>{
                cname= el.data().description
                    }
                )
                commit('setDesc',cname)
                    }
                    
                )
                
                commit('setDesc',cname)
                console.log(cname)
            },
            setSrc({commit},payload){
                console.log(payload)
                let cname=''
                fb.firestore().collection('Courses').where('category','==',payload).get()
                .then(
                    (data)=>{
                data.forEach(
                    el=>{
                        console.log(el.data())
                cname= el.data().imgSrc
                    }
                    
                )
                commit('setSrc',cname)
                console.log(cname)
                    }
                )
                .catch(
                    er=>{
                        console.log("er",er)
                    }
                )
                
                
               
            }
        
        
        },
        getters:{
   getTitle(state){
    return state.title
   },
   getDesc(state){
    return state.description
   },
   getSrc(state){
    return state.src
   }
   
        
        }
*/        