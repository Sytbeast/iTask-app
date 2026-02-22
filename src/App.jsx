import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaSave } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  



  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id==id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((items) => {
      return items.id!==id
    });
    setTodos(newTodos)
    saveToLs()

  }
  const handleDelete = (e, id)=>{
    let newTodos = todos.filter((items) => {
      return items.id!==id
    });
    setTodos(newTodos)
    saveToLs()

  }
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(),  todo, isCompleted: false}])
    setTodo("")
    saveToLs()


  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLs()

  }
  

  return (
    <>
    <Navbar/>
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-xl text-center'>iTask - Manage your Works at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex">

          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full   px-5 py-2' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm rounded-xl font-bold disabled:bg-zinc-800 text-white flex items-center justify-center gap-2 mx-2 '><FaSave />Save</button>

          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" className='mx-2 my-3' checked={showFinished} />Show Finished tasks
        <div className="h-[0.1px] bg-black opacity-15 my-5 w-3/4 mx-auto"></div>
        <h2 className='text-lg font-bold'>Your tasks here</h2>
        <div className="todos">
          {todos.length==0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item=>{

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-full my-3" >
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>

            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm rounded-md font-bold text-white mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm rounded-md font-bold text-white mx-1'><RiDeleteBin6Line /></button>
            </div>
          </div>

          })}
        </div>
      </div>
    </>
  )
}

export default App
