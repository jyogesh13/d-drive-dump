function getUserInfo(username:string, password: string){
    console.log(`User logged in with username: ${username} and password: ${password}`)
}
getUserInfo("yogesh12","12345678")

function getPassword():string{
    return "12345678"
}

function makeOrder(order: string){
    if(!order) return null
    return order
}

// agar function kuch return nhi kr rha
function logUser():void{
    console.log("User is logged in")
}

// optional argument: usually the optional arguments are passed at the very end
// function isAdmin(userId?:string){

// } or
function isAdmin(userId: string = "123"){
    console.log("userId is admin")
}

