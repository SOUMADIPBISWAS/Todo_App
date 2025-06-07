import React, { useState } from 'react'
import Todocss from "./Todo.module.css"

const Todo = () => {
  const taskData = [
    {task:"Buy Car", complete: false},
    {task:"Buy Bike", complete: true},
    {task:"Buy Phone", complete: false},
    {task:"Buy Car", complete: false},
    {task:"Buy Bike", complete: true},
    {task:"Buy Phone", complete: false},


  ]

  const [alldata, setalldata] = useState(taskData)
  return (
    <div>
    <div className={Todocss.main}>
            <h1>Todo-App 📃</h1>
            <div className={Todocss.task}>
              <form action="">
                <input type="text" name='' id='' placeholder='Add task here....' className='form-control' />
                <button type='submit' className='form-control btn btn-success mt-3'>Add</button>
              </form>
                {alldata.map((items,index)=>(
                    <div key={index} className={Todocss.alltask}>
                      <li>{items.task}</li>
                    </div>
                    
                  ))
                }
            </div>
            
    </div>
    </div>
  )
}

export default Todo