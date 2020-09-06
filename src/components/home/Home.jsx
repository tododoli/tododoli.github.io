import React, {useState} from 'react'
import styles from './Home.module.css'
import colors from '../../Colors.module.css'
import {Redirect} from "react-router-dom";
import {API} from "../../API/API";


const Home = () => {

    let [color, setColor] = useState('red')
    let [title, setTitle] = useState('')
    let [link, setLink] = useState('')

    const createList = () => {
        API.createList(title!=='' ? title : 'New list', color).then(
            (r) => {
                setLink('/' + r.name)
            }
        )
    }
    const listenKey = (e) => {
        if (e.key === 'Enter')  {
            e.preventDefault()
            createList()
        }
    }

    if (link !== '') return <Redirect to={link}/>
    return <div className={styles.wrapper}>
        <div className={styles.form}>
            <div className={styles.input}>
                <input autoFocus={true} onKeyPress={listenKey} placeholder={'New List...'} value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className={styles.colorsSection}>
                <div className={styles.colors}>
                    <div className={(color === 'red' ? styles.colorActive : styles.color) + ' ' + colors.redB}
                         onClick={() => setColor('red')}/>
                    <div className={(color === 'green' ? styles.colorActive : styles.color) + ' ' + colors.greenB}
                         onClick={() => setColor('green')}/>
                    <div className={(color === 'blue' ? styles.colorActive : styles.color) + ' ' + colors.blueB}
                         onClick={() => setColor('blue')}/>
                    <div className={(color === 'dark' ? styles.colorActive : styles.color) + ' ' + colors.darkB}
                         onClick={() => setColor('dark')}/>
                </div>
            </div>
            <div className={styles.buttonSection}>
                <div className={styles.button} onClick={createList}>Create List</div>
            </div>
        </div>
    </div>
}

export default Home