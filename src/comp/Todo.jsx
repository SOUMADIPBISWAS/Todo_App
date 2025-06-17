import React, {useEffect, useRef, useState } from 'react'
import Todocss from "./Todo.module.css"
import {toast} from "react-hot-toast"

const Todo = () => {
  const taskData = JSON.parse(localStorage.getItem("todo")) || [
    {task:"Buy Car", complete: false},
    {task:"Buy Cat", complete: true},
  ]

  const [alldata, setalldata] = useState(taskData);
  const [todoTask, setTodoTask] = useState("");
  const [search, setSearch] = useState("");
  const [ctask , setCtask] = useState(0);
  const [rtask , setRtask] = useState(0)
  const bgColor = useRef();
  const Button = useRef();
  
  
  

 

  function handleForm (e){
    e.preventDefault()
    // console.log({task:todoTask});
    const myTask = todoTask.trim();

    if(!myTask){
      toast.error('please add task',
  {
    icon: '❌',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
    }
    else{

       const isVerified = alldata.some((value,index)=>{
       return value.task.toLowerCase() === todoTask.toLowerCase()
      })

      if (isVerified){
        toast.error('Task Already added...',
  {
    icon: '❌',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
setTodoTask("");
      }

      else{
        setalldata([...alldata, {task: todoTask, complete: false}]);
        toast.success("Task Added 👍")
        setTodoTask("");
      }

        
    }
  }

  function handleDelete (id){
    const copyOfAlldata = [...alldata];
    const filterValue = copyOfAlldata.filter((value,index)=>{    
      return index !== id;
      
    }
  );

  if(filterValue){
    const taskDelete = window.confirm("Are you sure you want to delete task 🤔");

    if(taskDelete){
      setalldata(filterValue);
    toast('Task Delete', {
          icon: '🚮',
          });
    }
  }
  else{
    setalldata(copyOfAlldata);
  }
    
  }

  function handleCheckbox (id){
    const copyOfAlldata = [...alldata];
    copyOfAlldata[id].complete = !copyOfAlldata[id].complete;
    setalldata(copyOfAlldata);

    
  }

  function handleClear(){
    let copyOfAlldata = [...alldata];
    copyOfAlldata = [];
    setalldata(copyOfAlldata);
    toast('All Tasks Deleted!', {
          icon: '🚮',
});
  }

  function handleEdit(id){
    console.log(id);
    const copyOfAlldata = [...alldata];
    const oldData = copyOfAlldata[id].task;
    const newTask = prompt(`Update Task :- ${oldData}`, oldData);
    const newObj = {task: newTask, complete: false};
    copyOfAlldata.splice(id, 1, newObj);
    setalldata(copyOfAlldata);
    toast.success("Task Changed 👍")
  }

  const filterTask = alldata.filter((items)=>{
    return items.task.toLowerCase().includes(search.toLowerCase())
  });

  useEffect(()=>{
    const copyOfAlldata = [...alldata];
    const allCompleteTask = copyOfAlldata.filter((value)=>{
      return value.complete
    });
    setCtask(allCompleteTask.length);

    const allRemaningTask = copyOfAlldata.filter((value)=>{
      return !value.complete
    })
    setRtask(allRemaningTask.length);

    localStorage.setItem("todo", JSON.stringify(copyOfAlldata));

  },[alldata])


  function handleDarkmode (){
    const bodyBg = bgColor.current.style.backgroundColor;

    if(bodyBg === "" || bodyBg === "rgb(248, 230, 27)"){
      bgColor.current.style.backgroundColor = "rgb(31, 31, 31)";
      bgColor.current.style.color = "rgb(255, 255, 255)";
      Button.current.className = "bi bi-brightness-high-fill"
    }
    else{
      bgColor.current.style.backgroundColor = "rgb(248, 230, 27)";
      bgColor.current.style.color = "black";
      Button.current.className = "bi bi-moon-fill"
    }
  }
  return (
    <div>
    <div className={Todocss.main} ref={bgColor}>
            <h1>Todo-App 📃 <i className="bi bi-moon-fill" onClick={handleDarkmode} ref={Button} ></i></h1>
            <div className={Todocss.task}>
              <form action="" onSubmit={handleForm}>
                <input type="text" name='' id='' placeholder='Add task here....' className='form-control'
                value={todoTask} onChange={(e)=>{setTodoTask(e.target.value)}} />
                <input type="search" name="" id="" placeholder='Search Task here ✨' className='form-control mt-3' value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                <button type='submit' className='form-control btn btn-success mt-3'>Add</button>
              </form>
                {filterTask.length===0 ?<h3 className='text-center text-danger'>No Matching Result...🔍</h3> : filterTask.map((items,index)=>(
                    <div key={index} className={Todocss.alltask}>
                      <input type="checkbox" name="" id="" className={Todocss.checkbox} checked={items.complete} 
                        onClick={()=>{handleCheckbox(index)}}
                      />
                      <span style={{textDecoration: items.complete ? "line-through #880808":""}}  >{items.task}</span>

                      <i className="bi bi-trash text-danger float-end me-2" onClick={()=>{handleDelete(index)}}></i>

                      <i className="bi bi-pencil-square text-success float-end mx-2"
                      onClick={()=>{handleEdit(index)}}></i>
                      
                    </div>
                
                  ))
                }
                <button className='btn btn-outline-danger form-control mt-4' onClick={handleClear}>All Clear 🫧</button>
            </div>
            
            <span className='fw-bolder'>Complete Task :- {ctask}</span>
            <span className='fw-bolder'>Remaning Task :- {rtask}</span>
    </div>
    </div>
  )
}

export default Todo