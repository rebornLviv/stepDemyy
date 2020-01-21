import  * as fb from 'firebase'
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


}