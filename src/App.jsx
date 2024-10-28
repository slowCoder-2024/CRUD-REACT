import {useState} from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
const App = () => {
    const [totalUser,setTotalUser] = useState([]);
    const [singleUser,setSingleUser] = useState(
                         {
                          id:uuidv4(),
                          name:"",
                          age:"",
                          mail:"",
                          phone:""
                         }
                       );
    //thsi is a state to change the buttons while editing
    const [chageBtns,setChangeBtns]=useState("add");
    // function to set the user input to object
    const inputChange = (e) =>{
          const {name,value} = e.target;
          setSingleUser((currentValue)=>{return {...currentValue,[name]:value,}});
    }
    // function to set the singleuserInput to the array
    const bunchUsers = (e) =>{
      //total user is array
         setTotalUser((curr)=>[...curr,singleUser]);
         setSingleUser({
          id:uuidv4(),
          name:"",
          age:"",
          mail:"",
          phone:""
         });
    }
    // function to delete the user
    const deleteUser = (unique) =>{
          return setTotalUser((curr)=>curr.filter((user)=>user.id !== unique));
    }
    // function to update the users detail
    let editUser=(editableValue)=>{
     
         setSingleUser(editableValue);
         
        //  change the state of button
         setChangeBtns("edit");    
    }
    // function to update the userDetail 
    const updateDetails = () =>{
        setTotalUser((curr)=>{
          return curr.map((user)=>{
            if(user.id===singleUser.id){
              return singleUser;
            }else{
              return user;
            }
          })
        })
        setChangeBtns('add');
        editCancel();
    }
    // function to cancel the edit
    let editCancel = () =>{
        setSingleUser(
          {name:"",
          age:"",
          mail:"",
          phone:""});
          setChangeBtns("add");   

    }
  return (
    <div className="container">
        <div className="formContainer">
          <input type="text" placeholder='enter Your Name' name="name" value={singleUser.name} onChange={inputChange }/>
          <br/>
          <input type="number" placeholder='enter Your Age' name="age" value={singleUser.age} onChange={inputChange }/>
          <br/>
          <input type="email" placeholder='enter Your email' name="mail" value={singleUser.mail} onChange={inputChange }/>
          <br/>
          <input type="number" placeholder='enter Your Number' name="phone" value={singleUser.phone} onChange={inputChange }/>
          <br/>
          <div className="buttonContainer">
              {chageBtns==="add"?<button onClick={bunchUsers} className="add">AddUser</button>:
              <div className='editBtnGroup'>
                <button onClick={updateDetails}>update</button>
                <button onClick={editCancel}>cancel</button>
              </div>}
          </div>
        </div>

        <div className="tableContainer">
               <table>
                 <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Mail</th>
                    <th>phone</th>
                    <th>Actions</th>
                  </tr>
                 </thead>
                 <tbody>
                  {totalUser?.map((value)=>{
                    return <tr key={value.id}>
                              <td>{value.name}</td>
                              <td>{value.age}</td>
                              <td>{value.mail}</td>
                              <td>{value.phone}</td>
                              <td className='actionBtns'><button className="editBtn" onClick={()=>editUser(value)}>Edit</button><button onClick={()=>deleteUser(value.id)} className="deleteBtn">Delete</button></td>
                           </tr>
                  })}
                 </tbody>
               </table>
        </div>
    </div>
  )
}

export default App;
