import { usersCollection ,coursesCollection , currentUser,db , auth } from "../firebase/firebaseConfig";




const calculateOveralRating = async(cid,videoUrl) => {
    let overalRating = null;
    let ratings = null;
    let allRates = [];
 let lessons =  await  coursesCollection.doc(cid).collection('Lessons').where("videoUrl","==",videoUrl).get();
 console.log('rLessons',lessons)
 lessons.forEach( l => ratings = l.data().ratings )
 console.log(ratings)
 for(let key in ratings ){
    allRates.push(ratings[key]) 
    console.log('key',key) 
  }
 overalRating = allRates.reduce((a,b) => a + b ,0) /allRates.length 
return overalRating;

}

const calculateCourseRating = async (category) => {
    let all = [] 
let rating = 0;
let lessons = await  db.collectionGroup('Lessons').where("course","==",category).get()
lessons.forEach( l=> l.data().rating !== 0 ? all.push(l.data().rating): '' )
rating =   all.reduce((a ,b)  =>  a+b,0) / all.length
return rating;
}
const getCourseId = async (category) => {
let cid ='';
let  course = await  coursesCollection.where("category","==",category).get()
course.forEach( c => cid = c.id)
return cid;
}

const getLessonId = async (cid,videoUrl) => {
let lid ='';
let lesson =  await  coursesCollection.doc(cid).collection('Lessons').where("videoUrl","==",videoUrl).get()
lesson.forEach( l => lid = l.id)
return lid;
}
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
           async setLessons({commit},payload){
                console.log('c-l',payload)
                let lessons=[]
                commit('setLoading', true)
                let id= await getCourseId(payload.course)

           let catlessons =     await      coursesCollection.doc(id).collection('Lessons').where('cat','==',payload.lesson).get()
           catlessons.forEach( les => lessons.push(les.data()))    
           console.log("Course Lessons",lessons)
           commit('setLessons',lessons)
           commit('setLoading', false)       
                
               
            },
           async  getCurrentLesson({commit},payload){
                let current;
                let currentTime;
                console.log('CurrentLessonPayload',payload)
        
       let userData =  await    usersCollection.doc(auth.currentUser.uid).get()
       if(userData.data().courses[payload]){
       current = userData.data().courses[payload].currentlesson
       currentTime = userData.data().courses[payload].lprogress
       commit("setCurrentLesson",current)
       commit('setCurrentTime',currentTime)
       }
       else return;
                
                },
             async   updateLesson({commit},payload){
                   let  uid=""
                   let finished=[]
                   let flessons=[]
                   console.log("to update",payload)
                   console.log("payload finished",payload.flessons.length);
                   console.log("payload Currles",payload.currentLesson);
                  
                 //  let cprogr=(payload.flessons.size * (100/payload.amount)) +'%'
          const userData =    await     usersCollection.doc(auth.currentUser.uid).get()
          flessons= userData.data().courses[payload.course].flessons
                    for (let x of payload.flessons){
                        if(!flessons.includes(x)){
                                flessons.push(x) 
                                 console.log('beforeInserted',flessons)  
                        }
                        }
                    await usersCollection.doc(auth.currentUser.uid).set({
                            courses:{
                            [payload.course]:{
                                flessons: flessons
                            }
                        }
                    },{merge:true})
       let userD =await  usersCollection.doc(auth.currentUser.uid).get()
       finished=userD.data().courses[payload.course].flessons
                
             await    usersCollection.doc(auth.currentUser.uid).set({
                    courses:{
                            [payload.course]:
                                        {
                                            currentlesson:payload.currentLesson,
                                            lprogress:payload.currentTime,
                                            cprogress:(finished.length * (100/payload.amount)) +"%" ,
                                }
                            }
                            },{merge:true})     

                },
                async finishedLessons({commit},payload){
                    let flessons = [];
                 let userData =   await usersCollection.doc(auth.currentUser.uid).get()
                 flessons = userData.data().courses[payload.course].flessons
                 for (let x of payload.flessons){
                    if(!flessons.includes(x)){
                     flessons.push(x) 
                     console.log('beforeInserted',flessons)  
        }
        } 
     await   usersCollection.doc(auth.currentUser.uid).set({
            courses:{
            [payload.course]:{
                flessons: flessons,
                
            }

        }
    },{merge:true})

                 
                },
            async   setProgress({commit},payload){
                  let  finished = []
           const userData =     await    usersCollection.doc(auth.currentUser.uid).get()
           finished = userData.data().courses[payload.course].flessons
            await   usersCollection.doc(auth.currentUser.uid).set({

                        courses:{
                            [payload.course]:{
                                cprogress:(finished.length * (100/payload.amount)) +"%",
                                
                            }
                        }

                    },{merge:true})       

                },
              async   rateLesson({commit},payload){
                    console.log('payloadR',payload)
                    let email = auth.currentUser.email
                    let cid = await getCourseId(payload.category)
                    let lid = await getLessonId(cid,payload.videoUrl)
                    console.log("cid",cid)
                    console.log("lid",cid)
                    let overalRating = null;
                    try{
                await    coursesCollection.doc(cid).collection('Lessons').doc(lid)
                    .set({
                        ratings:{  [email]:payload.rating } },{merge:true})
                    }
                    catch(e){
                        console.log("error",e)
                    }
                      
                 overalRating = await calculateOveralRating(cid,payload.videoUrl);   
                 console.log(overalRating)                         
              await   coursesCollection.doc(cid).collection('Lessons').doc(lid).set({
                                    rating:overalRating
                                    },{merge:true})                    
            let rating = await calculateCourseRating(payload.category)     
           await  coursesCollection.doc(cid).set({
                                     rating : rating },
                                         {merge:true})     
                    

                },
                async getAllLessons({commit},payload){
                    let all = [] 
                    commit('setLoading',true)
          let  lessons =     await    db.collectionGroup('Lessons').get()
          console.log(lessons.docs)
          lessons.docs.forEach( l => all.push(l.data()));
          commit('setAllLessons',all)
          commit('setLoading',false)
                        },
                     async   getTopLessons({commit},payload){
                         console.log(payload)
                        let top = [] 
                        let lessons =null;
                        commit('setLoading',true)
                        if(!payload) {
                            lessons =     await  db.collectionGroup('Lessons')
                            .orderBy('rating','desc')
                            .limit(12).get()
                            
                    
                            lessons.forEach( l => top.push(l.data()))
                            commit('setTopLessons',top)
                            commit('setLoading',false)
                            return;


                        }
                        if(payload.byName && payload.byRating){
                            console.log('payload.byName && payload.byRating')
                            lessons =     await  db.collectionGroup('Lessons')
                            .orderBy(payload.byRating,payload.optionRating)
                            .orderBy(payload.byName,payload.optionName)
                            .limit(payload.limit).get()

                        }
                        else if( payload.byRating && !payload.byName){
                            console.log('payload.byRating && !payload.byName')
                            lessons =     await  db.collectionGroup('Lessons')
                            .orderBy(payload.byRating,payload.optionRating)
                            .limit(payload.limit).get()

                        }
                        else if (!payload.byRating && payload.byName) {
                            console.log('!payload.byRating && payload.byName')
                            console.log(payload.byName,payload.optionName)
                            lessons =     await  db.collectionGroup('Lessons')
                            .orderBy(payload.byName,payload.optionName)
                            .limit(payload.limit).get()
                        }
                        else if (!payload.byRating && !payload.byName && payload.limit) {
                            console.log('only limit')
                            lessons =    await  db.collectionGroup('Lessons').limit(payload.limit).get()
                        }
                            
                            
                        lessons.forEach( l => top.push(l.data()))
                        commit('setTopLessons',top)
                        commit('setLoading',false)




                        },
                        async setCL({commit},payload){
                     await   usersCollection.doc(auth.currentUser.uid).set({
                            courses:{
                                [payload.course] :{
                                 currentlesson : payload.current   


                                } 
                            }
                        },{merge:true})
                        commit('setCurrentLesson',payload.current)
                        
                        },

                      async  setClesson({commit},payload){
                            console.log('Settt',payload)
                        
                           await  usersCollection.doc(auth.currentUser.uid).set({
                                    courses:{
                                        [payload.course]:{
                                            currentlesson: payload.lesson
                                        }
                                    }

                                },{merge:true})
                            commit('setCurrentLesson',payload.lesson)    
                            
                        },
                
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

        }


