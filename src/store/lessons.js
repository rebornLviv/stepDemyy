import  * as fb from 'firebase'
export default{
   state:{
        lessons:[],
        currentlesson:0,
        currenttime:0,
        allLessons:[],
        topLessons:[]
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
            },
            setAllLessons(state,payload){

                state.allLessons = payload
            },
            setTopLessons(state,payload){

                state.topLessons = payload
            }
            

        },
        actions:{
            setInitialState({commit},payload){
                commit('setLessons',[])
                commit('setCurrentLesson',0)
                commit('setCurrentTime',0)

            },
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
                console.log('CurrentLessonPayload',payload)
                let email  = fb.auth().currentUser.email;
                fb.firestore().collection("User").where("email","==",email).get()
                .then(
        
                    user=>{
                        user.forEach(
                            data=>{
                               
                        console.log("Currrent",data.data().courses[payload].currentlesson)
                             current=data.data().courses[payload].currentlesson
                             commit("setCurrentLesson",current)
                             commit('setCurrentTime',data.data().courses[payload].lprogress)
                                
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
                   console.log("payload Currles",payload.currentLesson);
                   
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
                            console.log('payload.fless', payload.flessons)
                            for (let x of payload.flessons){
                                if(!flessons.includes(x)){
                                 flessons.push(x) 
                                 console.log('beforeInserted',flessons)  
                            fb.firestore().collection("User").doc(uid).set({
                                courses:{
                                [payload.course]:{
                                    flessons: flessons
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

                },
                async finishedLessons({commit},payload){
                    let email = fb.auth().currentUser.email;
                    let id  = '' ;
                    let flessons = [];
                  await   fb.firestore().collection('User').where("email","==",email).get()
                    .then(
                        udata=>{
                            udata.forEach(
                                u=>{
                                  id = u.id;
                                  flessons = u.data().courses[payload.course].flessons
                                }
                            )
                            for (let x of payload.flessons){
                                if(!flessons.includes(x)){
                                 flessons.push(x) 
                                 console.log('beforeInserted',flessons)  
                            fb.firestore().collection("User").doc(id).set({
                                courses:{
                                [payload.course]:{
                                    flessons: flessons,
                                    
                                }
        
                            }
                        },{merge:true})
                    }
                    }
                        }
                    )

                 
                },
                setProgress({commit},payload){
                    let email = fb.auth().currentUser.email
                    let id = ''
                  let  finished = []
                    fb.firestore().collection('User').where("email","==",email).get()
                    .then(
                        udata=>{
                            udata.forEach(
                                u=>{
                                  id =  u.id
                                  finished = u.data().courses[payload.course].flessons
                                }
                            )
                            console.log('LenOfArray',finished.length)
                            console.log('totalVids',payload.amount)
                            fb.firestore().collection('User').doc(id).set({

                                courses:{
                                    [payload.course]:{
                                        cprogress:(finished.length * (100/payload.amount)) +"%",
                                        
                                    }
                                }

                            },{merge:true})
                        }
                    )
                },
                rateLesson({commit},payload){
                    let email = fb.auth().currentUser.email
                    let cid = ''
                    let lid = ''
                    let allRates = []
                    let ratings = {}
                    let overalRating = null;
                    fb.firestore().collection('Courses').where("category","==",payload.category).get()
                    .then(
                        courseData=>{
                            courseData.forEach(
                                c=>{
                                    cid = c.id

                                    
                                 fb.firestore().collection('Courses').doc(cid).collection('Lessons').where("videoUrl","==",payload.videoUrl).get()
                                 .then(
                                     lessonData=>{

                                        lessonData.forEach(
                                            l=>{
                                                lid = l.id
                                            }
                                        )
                                    fb.firestore().collection('Courses').doc(cid).collection('Lessons').doc(lid).set(
                                            {
                                                ratings:{
                                                    [email]:payload.rating
                                                }
                                            },{merge:true}
                                            ).then(
                                                ()=>{
                                                    fb.firestore().collection('Courses').doc(cid).collection('Lessons').where("videoUrl","==",payload.videoUrl).get()
                                                    .then(
                                                        lData=>{
                                                            lData.forEach(
                                                                l=>{
                                                                    ratings = l.data().ratings
                                                                }
                                                            )
                                                            console.log('ratings',ratings)    
                                                            for(let key in ratings ){
                                                              allRates.push(ratings[key]) 
                                                              console.log('key',key) 
                                                            }
                                                            var sum = 0;
                                                            for (let x of allRates){
                                                                sum+=x;

                                                            }
                                                            console.log('sum',sum)
                                                            console.log('allRates',allRates)
                                                            overalRating = sum/allRates.length
                                                            fb.firestore().collection('Courses').doc(cid).collection('Lessons').doc(lid).set({

                                                            rating:overalRating
                                                            },{merge:true})
                                                        }
                                                    )

                                                }
                                            )
                                     }
                                 )   
                                }
                            )
                        }
                    )
                    

                },


                getAllLessons({commit},payload){
                    let all = [] 
                    commit('setLoading',true)
                    fb.firestore().collectionGroup('Lessons').get().then(

                        lessons=>{
                            lessons.docs.forEach(
                                l=>{

                                    console.log('lessons',l.data())
                                    all.push(l.data())
                                }
                               
                            )
                            console.log('allllllllllll',all)
                            commit('setAllLessons',all)
                            commit('setLoading',false)
                        }
                            )
                        },
                        getTopLessons({commit},payload){

                            let top = [] 
                            commit('setLoading',true)
                            fb.firestore().collectionGroup('Lessons').orderBy('rating','desc').limit(12).get().then(
        
                                lessons=>{
                                    lessons.docs.forEach(
                                        l=>{
        
                                            console.log('lessons',l.data())
                                            top.push(l.data())
                                        }
                                       
                                    )
                                    console.log('allllllllllll',top)
                                    commit('setTopLessons',top)
                                    commit('setLoading',false)
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
            },
            getAllLessons(state){
                return state.allLessons

            },
            getTopLessons(state){
                return state.topLessons
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


