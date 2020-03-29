import * as fb from 'firebase'
class User {
    constructor(id) {
        this.id = id
    }
}
export default {
    state: {
        user: null,
        userCourses:[],
        userName:'',
        userBirthDay:'',
        userPhoto:'ss'
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
                const user = await fb.auth().createUserWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
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
                const user = await fb.auth().signInWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                console.log(error)
                throw error

            }

        },
        autoLoginUser({
            commit
        }, payload) {
            commit('setUser', new User(payload.uid))
        },
        logoutUser({
            commit
        }) {
            fb.auth().signOut().then(
                    () => {
                        commit('setUser', null)
                    }
                )
                .catch(err => {
                    commit('setError', err.message)
                })

        },
        recoverUser({
            commit
        }, email) {
            console.log('wwww')
            commit('clearError')
            commit('setLoading', true)

            fb.auth().sendPasswordResetEmail(email)
                .then(() => {

                    commit('setLoading', false)
                })
                .catch((error) => {
                    commit('setLoading', false)
                    commit('setError', error.message)
                })


        },
    
        getMyCourses({commit}) {

            let email = fb.auth().currentUser.email;
            console.log('email',email)
            let courses =[]
          fb.firestore().collection('User').where('email','==',email).get()
          .then(
              userData => {
                  userData.forEach( 
                      el=> {
                        for(const key in el.data().courses){
                            console.log('key',key)
                          courses.push({
                              title:key,
                              progress:el.data().courses[key].cprogress,
                              clesson:el.data().courses[key].currentlesson
                          })
                        }
                            
                      }
                  )
              }
          )

          console.log('My courses',courses)
      
          
          commit('setUserCourses',courses)
        },
        changePassword({commit},payload){
            console.log('payload',payload)
            commit('setLoading',true)
        let user  =   fb.auth().currentUser;
        user.updatePassword(payload)
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
        getUserName({commit}){
            let email = fb.auth().currentUser.email;
            let name = '';
            fb.firestore().collection('User').where('email','==',email).get()
            .then(
                userData => {
                    userData.forEach( 
                        el=> {
                      name = el.data().userName
                              
                        }
                        
                    )
                    commit('setUserName',name)
                }
            )
            

        },
        getUserBirthDay({commit}){
            let email = fb.auth().currentUser.email;
            let bd = '';
            fb.firestore().collection('User').where('email','==',email).get()
            .then(
                userData => {
                    userData.forEach( 
                        el=> {
                      bd = el.data().birthday
                              
                        }
                        
                    )
                    commit('setUserBirthDay',bd)
                }
            )
            

        },
        setUserBirthDay({commit},payload){
            let user = fb.auth().currentUser.email;
            let id =''
            fb.firestore().collection('User').where('email','==',user).get()
            .then(
                userData=> {
                    userData.forEach(
                        el => {
                         id = el.id;
                        }
                    )
            fb.firestore().collection('User').doc(id).set(
                {
                    birthday:payload
                },{merge:true}
            )
            .then(
                ()=>{

                    commit('setUserBirthDay',payload)
                }
            )
                }
            )
        },
        setUserName({commit},payload){
            let user = fb.auth().currentUser.email;
            let id =''
            console.log(payload)

            fb.firestore().collection('User').where('email','==',user).get()
            .then(
                userData=> {
                    userData.forEach(
                        el => {
                         id = el.id;
                        }
                    )
                    fb.firestore().collection('User').doc(id).set(
                        {
                         userName: payload   
                        },{merge:true}
                    )
                    .then(
                        () =>{
                            commit('setUserName',payload)
                        }
                    )
                }
            )
            
        },
         setUserPhoto({commit},payload){
            console.log('Pload',payload)
        let user = fb.auth().currentUser.email;
         let newPhoto = ''   
         let id =''
         let userPhotos  =  fb.storage().ref('userPhotos/' + payload.name)
         userPhotos.put(payload)
         .then(
           async ( )=> {
                
                newPhoto =   await  userPhotos.getDownloadURL();
                console.log(newPhoto)
                
                    
                fb.firestore().collection('User').where('email','==',user).get()
            .then(
                userData=> {
                    userData.forEach(
                        el => {
                         id = el.id;
                        }
                    )
                    fb.firestore().collection('User').doc(id).set(
                        {
                         userPhoto: newPhoto   
                        },{merge:true}
                    )
                    .then(
                        () =>{
                            commit('setUserPhoto',newPhoto)
                        }
                    )
                }
            )
             }
         ) 
        },
        getUserPhoto({commit}){
            let user = fb.auth().currentUser.email;
            let photo = ''
            fb.firestore().collection('User').where('email','==',user).get()
            .then(
                userData=> {
                    userData.forEach(
                        el => {
                         photo = el.data().userPhoto ;
                        }
                    )

        commit('setUserPhoto',photo)                
        }
        
        )
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