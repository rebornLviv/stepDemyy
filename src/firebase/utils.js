export default (func) =>{
try{
    func()
}
catch(error){
    console.log("error",error)
}

}