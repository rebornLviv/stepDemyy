import {  auth ,storage, usersCollection, currentUser  } from "../firebase/firebaseConfig";

export default {
    state: {
        user: null,
        userCourses:[],
        userName:'',
        userBirthDay:'',
        userPhoto:null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setUserName(state, payload) {
            state.userName = payload
        },
        setUserCourses(state, payload) {
            state.userCourses = payload
        },
        setUserBirthDay(state, payload) {
            state.userBirthDay = payload
        },
        setUserPhoto(state, payload) {
            state.userPhoto = payload
        },

    },
    actions: {
        async registerUser({
            commit
        }, {
            email,
            password
        }) {
            
            commit('setLoading', true)
            try {
                const user = await auth.createUserWithEmailAndPassword(email, password)
                commit('setUser', user)
                commit('setLoading', false)
                console.log('successful register')
                usersCollection.doc(auth.currentUser.uid).set({
                email:email,
                userName:'',
                birthday:'',
                userPhoto:null,
                courses:{}
                })
                
            } catch (error) {
                commit('setLoading', false)
                console.log('err registering')
                commit('setError', error.message)
                console.log(error)
                throw error


            }

        },
        async loginUser({
            commit
        }, {
            email,
            password
        }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await auth.signInWithEmailAndPassword(email, password)
                commit('setUser', user)
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                console.log("error hapenned",error)
                throw error
            }

        },
        autoLoginUser({
            commit
        }, payload) {
            commit('setUser',payload);
        },
        logoutUser({
            commit
        }) {
           auth.signOut().then(
                    () => {
                        commit('setUser', null)
                    }
                )
                .catch(err => {
                    console.log('err',err)
                    commit('setError', err.message)
                })

        },
        recoverUser({
            commit
        }, email) {
            console.log('wwww')
            commit('clearError')
            commit('setLoading', true)

           auth.sendPasswordResetEmail(email)
                .then(() => {

                    commit('setLoading', false)
                })
                .catch((error) => {
                    commit('setLoading', false)
                    commit('setError', error.message)
                })


        },
    
     async   getMyCourses({commit}) {
        let courses = []
        const userData =  await  usersCollection.doc(auth.currentUser.uid).get()
        if(!userData.data().courses) {
            console.log('no courses yet!')
            return;
        }
        for(const key in userData.data().courses){
            console.log('key',key)
          courses.push({
              title:key,
              progress:userData.data().courses[key].cprogress,
              clesson:userData.data().courses[key].currentlesson,
              ctitle:userData.data().courses[key].ctitle
          })
        }        
          commit('setUserCourses',courses)
        },
        changePassword({commit},payload){
            console.log('payload',payload)
            commit('setLoading',true)
        auth.currentUser.updatePassword(payload)
        .then( ()=>{
            
            commit('setError','Your password was successfully updated')
            commit('setLoading',false)
        })
        .catch( 
            error=>{
                commit('setError',error.message)
                commit('setLoading',false)
            }
        )
            
        },
       async  getUserName({commit}){
     const userData =  await usersCollection.doc(auth.currentUser.uid).get();
     console.log('userData',userData.data())
     commit('setUserName',userData.data().userName)
        },
    async    getUserBirthDay({commit}){
        const userData =  await usersCollection.doc(auth.currentUser.uid).get();
        commit('setUserBirthDay',userData.data().birthday)
        },
      async  setUserBirthDay({commit},payload){
         await   usersCollection.doc(auth.currentUser.uid).set({birthday:payload},{merge:true})
            commit('setUserBirthDay',payload)              
        
        },

     async    setUserName({commit},payload){
        await   usersCollection.doc(auth.currentUser.uid).set({userName:payload},{merge:true})
        commit('setUserName',payload)        
        },
    async  setUserPhoto({commit},payload){
        let  photo ='' 
      let userPhotos  = storage.ref('userPhotos/' + payload.name)
   await  userPhotos.put(payload)
   photo = await userPhotos.getDownloadURL()
   console.log(photo)
     
      await   usersCollection.doc(auth.currentUser.uid).set({userPhoto:photo},{merge:true})
      commit('setUserPhoto',photo)
        },
      async   getUserPhoto({commit}){
        const userData =  await usersCollection.doc(auth.currentUser.uid).get();
        commit('setUserPhoto',userData.data().userPhoto)  
    }
        



    },
    getters: {
        user(state) {
            return state.user
        },
        getMyCourses(state){
             return state.userCourses   
        },
        getUserName(state){
            return state.userName  
       },
       getUserBirthDay(state){
        return state.userBirthDay  
   },   getUserPhoto(state){
        return state.userPhoto
       },
        isUserLoggedIn(state) {
            return state.user != null
        }
    }


}