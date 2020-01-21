import  * as fb from 'firebase'
export default{
    state:{
        lessons:[],
        currentlesson:null,
        currenttime:0
        },
        mutations:{
            setLessons(state,payload){
                state.lessons=payload
            },
            setCurrentLesson(state,payload){
                console.log('ples',payload.les)
                console.log('plesson',payload.lesson)
                state.currentlesson=payload.lesson
            },
            setCurrentTime(state,payload){
                console.log('pctime',payload)
                state.currenttime=payload;
            }
            

        },
        actions:{
            setLessons({commit},{course,lesson}){
                console.log('c-l',course,lesson)
                let les=[]
                let id=''
                fb.firestore().collection('Courses').where('category','==',course).get()
               .then(
                  data=>{
                    console.log('element id 1')
                      data.forEach(
                          el=>{
                              console.log(el.id)
                              id=el.id
                          }
                      )
                      fb.firestore().collection('Courses').doc(id).collection('Lessons').where('cat','==',lesson).get()
                      .then( dat =>{
                        console.log('lesson data :')
                        dat.forEach(
                            el=>{
                   les.push(el.data())             
                                console.log(el.data())

                            }
                        )
                        commit('setLessons',les)
                      })
                  }
            
                   
               )
                
                
               
            },
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
                               
                               console.log('paylooo',less)
                            console.log("trrry",tryit)
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
                                        console.log('lessonC',lesson)
                                        console.log('lesssonsC',)
                                        console.log("currrrent",les[lesson])
                                        console.log('prog',el.lprogress)
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
   
        
        }


