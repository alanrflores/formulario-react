import { useEffect, useState } from "react";
import styles from "./App.module.css";

const initialState = {
  email: "",
  password: "",
  descripcion: "",
};
const App = () => {
  const [todo, setTodo] = useState({ initialState });
  const [error, setError] = useState({});

useEffect(()=>{
    console.log("leer todo local")
    if(localStorage.getItem("todo")){
        setTodo(JSON.parse(localStorage.getItem("todo")))
    }
},[])




  const handleSubmit = (e) => {
    e.preventDefault(e);
    console.log(todo);

   setTodo(initialState)
   localStorage.setItem("todo", JSON.stringify(todo))
   
  };

  const handleChange = (e) => {
    setTodo((todo) => ({ ...todo, [e.target.name]: e.target.value }));
    setError(validate({
        ...todo,
        [e.target.name]: e.target.value
   })); 
  };

  const validate = (todo) => {
    let error = {};
    if (!todo.email) {
        error.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(todo.email)) {
         error.email = 'Email is invalid';
    }
    if (todo.password && todo.password === 'invalid password') {
         error.password = 'Password is required';
    } else if (!/(?=.*[0-9])/.test(todo.password)) {
         error.password = 'Password is invalid';
    }
    return error;
};



  return (
    <>
      <div className={styles.container}>
        <title className={styles.title}>
          <h1 className={styles.h1}>Hola mundo!</h1>
        </title>
        <br />
        <br />
        
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <input
            className={styles.inputEmail}
            type="email"
            name="email"
            placeholder="Ingrese su Email"
            value={todo.email}
            onChange={handleChange}
          />
          {error && error.email && <h2 style= {{color: "red"}}>{error.email}</h2>}

          <input
            className={styles.inputPassword}
            type="password"
            name="password"
            placeholder="****..."
            value={todo.password}
            onChange={handleChange}
          />
          {error && error.password && <h2 style= {{color: "red"}}>{error.password}</h2>}

          <textarea
            className={styles.textarea}
            placeholder="Ingrese su Descripcion"
            name="descripcion"
            value={todo.descripcion}
            onChange={handleChange}
          />
          <button className={styles.button}>Enviar!</button>
        </form>
      </div>
    </>
  );
};

export default App;
