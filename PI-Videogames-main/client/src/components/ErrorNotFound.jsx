import React from "react";
import { Link } from "react-router-dom";
import error from "../images/error404.jpg";
import styles from './styles/ErrorNotFound.module.css'



export default function ErrorNotFound(){
 return (

     <div className={styles.container}>
         <div>
         <h1 className={styles.text}>Error 404 Not found!</h1>
         <h2 className={styles.text1}> There are no puppies here 👀</h2>
         </div>
        <div className={styles.btnDiv}>
        <Link to="/home">
        <button className={styles.btn}> Back to home</button>
        </Link>
        </div>
         <img className={styles.img} src={error} alt="img not found!" />
     </div>
 )
}