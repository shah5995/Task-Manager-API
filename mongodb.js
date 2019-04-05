const {MongoClient,ObjectID}= require("mongodb");
//const MongoClient=mongodb.MongoClient;
const connectionUrl="mongodb://127.0.0.1:27017";
const databaseName='taskManager';
MongoClient.connect(connectionUrl,{useNewUrlParser: true},(error,client)=>{
    if(error)
    {
        console.log("unable to connect to database")
        return;
    }
    console.log("connected correctly");
    // create----------------------------------
    const db=client.db(databaseName);
    // db.collection('users').insertOne({
    //     name:"shah",
    //     age:21
    // })
    // db.collection('works').insertMany([{
    // job:"eat the meal"    ,
    // done:true},
    // {
    //     job:"done homework",
    //     done:false
    // },{
    //     job:"gone to college",
    //     done:true
    // }
        
    
    // ],(error, result)=>{
    //     if(error)
    //     {
    //         console.log("there is something wrong");
    //         return;
    //     }
    //     console.log(result.ops);
    // })
    //-------------------------------findimg objects from database_--------------------
    // db.collection("works").findOne({ job:"eat the meal"},(error,user)=>{
    //     if(error)
    //     {
    //         console.log("something went wrong");
    //     return;}
    //     console.log(user);


    // })
//     db.collection("works").find({ done:true}).toArray((error,user)=>{
// console.log(user);
//     })
//     db.collection("works").find({ done:true}).count((error,user)=>{
//         console.log(user);
//             })
//-------------------------------------------------------------------------------
//-----------------------------------------------update------------------------------------------
// db.collection("works").updateOne({
//     _id:new ObjectID("5c991b202bde911b10ec928c")
// },{
//     $set :{
//         job: "solved question"
//     }
// }).then((mes)=>{
//     console.log(mes)
// }).catch((error)=>{
//     console.log(error)
// })
// db.collection("works").updateMany({ done : false},{
// $set :{
//     done: true}
// }).then((mes)=>{
//     console.log(mes)
// }).catch((error)=>{
//     console.log(error)
// })
//----------------------DELETE-----------------------------------------------------
db.collection("works").deleteOne({
    job:"done homework"
}).then((mes)=>{
    console.log(mes)

}).catch((error)=>{
    console.log(error)
})
})
//-----------------------------------------------------------------------------