import firebase from 'firebase/app';

const  getUserEmail =  async () =>{

return await firebase.auth().currentUser.email;

}
const calculateOveralRating = async(cid,videoUrl) => {
    let overalRating = null;
    let ratings = null;
    let allRates = [];
  await  firebase.firestore().collection('Courses').doc(cid).collection('Lessons').where("videoUrl","==",videoUrl).get()
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
                    
                }
            )

            return overalRating;





}
const calculateCourseRating = async (category) => {
    let all = [] 
let rating = 0;
await  firebase.firestore().collectionGroup('Lessons').where("course","==",category).get()
.then(

    lessons => {
        lessons.forEach(
            l =>{
                if(l.data().rating !== 0){
                all.push(l.data().rating)
                }
            }
        )
        rating =   all.reduce((a ,b)  =>  a+b,0) / all.length
    }
)

return rating;



}
const getCourseId = async (category) => {
    let cid ='';
  await  firebase.firestore().collection('Courses').where("category","==",category).get()
    .then(
        courseData=>{
            courseData.forEach(
                c=>{
                    cid = c.id
                }
            )
            }
    )
    return cid;
                

}

const getLessonId = async (cid,videoUrl) => {
    let lid ='';
   await  firebase.firestore().collection('Courses').doc(cid).collection('Lessons').where("videoUrl","==",videoUrl).get()
    .then(
        lessonData=>{

           lessonData.forEach(
               l=>{
                   lid = l.id
               }
           )
          
}
    )
    return lid;
}
const getUserId = async () =>{
    let email = await getUserEmail();
    let id = "";
 await   firebase.firestore().collection('User').where('email','==',email).get()
    .then(
        userData=> {
            userData.forEach(
                el => {
                 id = el.id;
                }
            )
        }
    )
    return id;

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

                await      firebase.firestore().collection('Courses').doc(id).collection('Lessons').where('cat','==',payload.lesson).get()
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
                        commit('setLoading', false)
                        
                      })            
                
               
            },
           async  getCurrentLesson({commit},payload){
                let current;
                console.log('CurrentLessonPayload',payload)
                let email  = await getUserEmail();
            await    firebase.firestore().collection("User").where("email","==",email).get()
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
             async   updateLesson({commit},payload){
                   let  uid=""
                   let finished=[]
                   let flessons=[]
                   console.log("payload finished",payload.flessons.length);
                   console.log("payload Currles",payload.currentLesson);
                   let email = await getUserEmail()
                 //  let cprogr=(payload.flessons.size * (100/payload.amount)) +'%'
              await      firebase.firestore().collection("User").where("email","==",email).get()
                    .then(
                        user=>{
                            user.forEach(
                                el=>{

                                  uid = el.id
                                  flessons= el.data().courses[payload.course].flessons
                                  console.log("db flessons",flessons)
            console.log('payload.fless', payload.flessons)
                                }
                            )      
                             
                        }

                    )
                    for (let x of payload.flessons){
                        if(!flessons.includes(x)){
                                flessons.push(x) 
                                 console.log('beforeInserted',flessons)  
                                firebase.firestore().collection("User").doc(uid).set({
                                    courses:{
                                    [payload.course]:{
                                        flessons: flessons
                                    }
                                }
                            },{merge:true})
                        }
                        }
            await  firebase.firestore().collection("User").doc(uid).get().then( data=>{ finished=data.data().courses[payload.course].flessons})  
                
             await    firebase.firestore().collection("User").doc(uid).set({
                    courses:{
                            [payload.course]:
                                        {
                                            currentlesson:payload.currentLesson,
                                            lprogress:payload.currentTime,
                                            cprogress:(finished.length * (100/payload.amount)) +"%" ,
                                }
                            }
                            },{merge:true}).then(()=>{

                                console.log(finished)
                                console.log("finished.length",finished.length)
                                console.log("progress",(finished.length * (100/payload.amount)) +"%");
                                })        

                },
                async finishedLessons({commit},payload){
                    let email = firebase.auth().currentUser.email;
                    let id  = '' ;
                    let flessons = [];
                  await   firebase.firestore().collection('User').where("email","==",email).get()
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
                            firebase.firestore().collection("User").doc(id).set({
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
            async   setProgress({commit},payload){
                    let email = await getUserEmail()
                    let id = ''
                  let  finished = []
                await    firebase.firestore().collection('User').where("email","==",email).get()
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
                        }
                    )
                await   firebase.firestore().collection('User').doc(id).set({

                        courses:{
                            [payload.course]:{
                                cprogress:(finished.length * (100/payload.amount)) +"%",
                                
                            }
                        }

                    },{merge:true})       

                },
              async   rateLesson({commit},payload){
                    console.log('payload',payload)
                    let email = firebase.auth().currentUser.email
                    let cid = await getCourseId(payload.category)
                    let lid = await getLessonId(cid,payload.videoUrl)
                    console.log("cid",cid)
                    console.log("lid",cid)
                    let overalRating = null;
                    try{
                await    firebase.firestore().collection('Courses').doc(cid).collection('Lessons').doc(lid)
                    .set({
                        ratings:{  [email]:payload.rating } },{merge:true})
                    }
                    catch(e){
                        console.log("error",e)
                    }
                      
                 overalRating = await calculateOveralRating(cid,payload.videoUrl);                            
              await   firebase.firestore().collection('Courses').doc(cid).collection('Lessons').doc(lid).set({
                                    rating:overalRating
                                    },{merge:true})                    
            let rating = await calculateCourseRating(payload.category)     
             firebase.firestore().collection('Courses').doc(cid).set({
                                     rating : rating },
                                         {merge:true})     
                    

                },
                async getAllLessons({commit},payload){
                    let all = [] 
                    commit('setLoading',true)
                await    firebase.firestore().collectionGroup('Lessons').get().then(

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
                            firebase.firestore().collectionGroup('Lessons').orderBy('rating','desc').limit(12).get().then(
        
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




                        },
                      async  setClesson({commit},payload){
                            console.log('Settt',payload)
                         let id = await getUserId();
                           await     firebase.firestore().collection('User').doc(id).set({

                                    courses:{
                                        [payload.course]:{
                                            currentlesson: payload.lesson
                                        }
                                    }

                                },{merge:true}).then(

                                    ()=>{
                                        commit('setCurrentLesson',payload.lesson)
                                    }
                                )
                            
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


