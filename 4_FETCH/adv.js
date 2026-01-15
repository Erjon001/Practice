const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

let tasks = [];

const loadTasksFromAPI=async()=>{
    try{
        const response =await fetch(API_URL);
        if(!response){
            console.log(`HTTP error, code: ${response.status}`)
        }
        const data=await response.json()

       tasks=data.map((item)=>({ id:item.id,
        title:item.title,
        completed: Boolean(item.completed)
       }))
       

       }catch(){
        
       }
    }