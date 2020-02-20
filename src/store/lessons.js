import  * as fb from 'firebase'
export default{
   state:{
        lessons:[],
        currentlesson:[],
        currenttime:0
        },
        mutations:{
            setLessons(state,payload){
                state.lessons=payload
            },
            setCurrentLesson(state,payload){
       
                state.currentlesson=payload
            },
            setCurrentTime(state,payload){
                state.currenttime=payload;
            }
            

        },
        actions:{
            setLessons({commit},payload){
                console.log('c-l',payload)
                let lessons=[]
                let id=''
                fb.firestore().collection('Courses').where('category','==',payload.course).get()
               .then(
                  cdata=>{
                
                      cdata.forEach(
                          el=>{
                              console.log("elid",el.id)
                              id=el.id
                          }
                      )
                      fb.firestore().collection('Courses').doc(id).collection('Lessons').where('cat','==',payload.lesson).get()
                      .then( dat =>{
                        console.log('lesson data :')
                        dat.forEach(
                            el=>{
                   lessons.push(el.data())             
                                console.log(el.data())

                            }
                        )
                        console.log("Course Lessons",lessons)
                        commit('setLessons',lessons)
                      })
                  }
            
                   
               )
                
                
               
            },
            getCurrentLesson({commit},payload){
                let current;
                fb.firestore().collection("User").where("email","==",fb.auth().currentUser.email).get()
                .then(
        
                    user=>{
                        user.forEach(
                            data=>{
                        console.log("Currrent",data.data().courses[payload])
                             current=data.data().courses[payload]
                             commit("setCurrentLesson",current)
                            }
                        )
                    }
                )
                
                },
                updateLesson({commit},payload){
                   let  uid=""
                   let finished=[]
                   let flessons=[]
                   console.log("payload finished",payload.flessons.length);
                   
                 //  let cprogr=(payload.flessons.size * (100/payload.amount)) +'%'
                    fb.firestore().collection("User").where("email","==",fb.auth().currentUser.email).get()
                    .then(
                        user=>{
                            user.forEach(
                                el=>{

                                  uid = el.id
                                  flessons= el.data().courses[payload.course].flessons
                                }
                            )
                            console.log("db flessons",flessons)
                            for (let x in payload.flessons){
                                if(!flessons.includes(x)){
                            fb.firestore().collection("User").doc(uid).set({
                                courses:{
                                [payload.course]:{
                                    flessons: fb.firestore.FieldValue.arrayUnion(Number(x))
                                }

                            }
                        },{merge:true})
                    }
                    }
                            fb.firestore().collection("User").doc(uid).get()
                            .then(
                                data=>{

                                  finished=data.data().courses[payload.course].flessons

                                  fb.firestore().collection("User").doc(uid).set({
                                    courses:{
        
                                        [payload.course]:{
                                    currentlesson:payload.currentLesson,
                                    lprogress:payload.currentTime,
                                    cprogress:(finished.length * (100/payload.amount)) +"%" ,
                                       
        
                                        }
                                    }
        
        
        
        
        
                                    },{merge:true})  
                                }



                            )
                            console.log(finished)
                            console.log("finished.length",finished.length)
                            console.log("progress",(finished.length * (100/payload.amount)) +"%");
                            
                             
                        }

                    )

                }


        },
       
        getters:{
            getLessons(state){
                return state.lessons
               },
            getCurrentLesson(state){
               return state.currentlesson 
            },
            getCurrentTime(state){
                return state.currenttime
            }
               
   }

       /*  actions:{
           ,
            getUserLesson({commit},{less,cs}){
                let cid=''
                console.log("------------------------------------------------")
                var les=[]
                var tryit={};
                let dd=[]
                var cnt=0
                console.log("less",less,"cs",cs)
                fb.firestore().collection('Courses').where('category','==',cs).get()
                .then(
                    
                   data=>{
                       console.log('element id 2')
                       data.forEach(
                           el=>{
                               console.log(el.id)
                               cid=el.id
                           }
                       )
                       
                       fb.firestore().collection('Courses').doc(cid).collection('Lessons').where('cat','==',less).get()
                       .then( dat =>{
 console.log(" el data 2222")
                         dat.forEach(
                             el=>{
                                 dd.push(cnt)
                                 tryit['les'+cnt]=el.data()
                                 cnt++;
                    les.push(el.data())             
                                 console.log(el.data())
 
                             }
                         )
                        console.log(les)
                       })
                   }
             
                    
                )
            
                let id = null;
                let lesson=0;
                console.log("qPauLoad",less)
                if(less){
                fb.firestore().collection('User').where('email','==',fb.auth().currentUser.email).get()
                .then(
                   doc=>{
                    
                       doc.forEach(
                           el=>{
            
                             id=el.id
                               console.log(el.data())
                               console.log(id)
                               el.data().courses.forEach(
                                   e=>{
                                      //  console.log(e)
                                   }
                               )
                           }
                       )
                       fb.firestore().collection('User').doc(id).get()
                       .then(
                           doc=>{
                            dd.forEach(
                                el=>{
                                    console.log(el)
                                }
                            )
                               console.log(doc.data())
                               doc.data().courses.forEach(
                                   el=>{
                                       console.log('trimmed',el.cname.replace(" ",''),"less",less)
                                    console.log(el)
                                    if(el.cname.replace(" ",'')==less){
                                        console.log('tut')
                                        lesson= el.currentlesson
                                         commit('setCurrentLesson',{les,lesson})
                                        commit('setCurrentTime',el.lprogress)
                                    }
                         
                                   }
                                   
                               )

                           }
                       )
                        }
                )
                    }
                    else {
                        console.log('No lessons')
                    }
                console.log("------------------------------------------------")
            }
        
        },
       
   
        */
        }


