import React, {useState} from 'react'
import styles from './Sync.module.css'
import {NavLink, Redirect, useParams} from 'react-router-dom'
import logo from '../../assets/logo.png'

const Sync = (props) => {
    let { id } = useParams()
    let [isDone, setDone] = useState(false)
    const sync = () => {
       localStorage.setItem('syncKey', id)
        setDone(true)
    }
    const noSync = () => {
        localStorage.removeItem('syncKey')
        setDone(true)

    }
    if (isDone) return <Redirect to={'/'}/>

    if (props.nosync) return <div className={styles.wrapper}>
        <div className={styles.form}>
            <img src={logo} className={styles.logo} alt='logo'/>
            <div>Note that this device will be no longer synchronized with your cloud pins.</div>
            <div className={styles.btn} onClick={noSync}><i className={'fas fa-plane'}/> Disable sync</div>
            <div className={styles.link}><NavLink to={'/'} style={{color: 'black'}}>Cancel</NavLink></div>
        </div>
    </div>


    return <div className={styles.wrapper}>
        <div className={styles.form}>
            <img src={logo} className={styles.logo} alt='logo'/>
            <div>Your device is going to be synchronized with your cloud pins. Your local pins will be erased.</div>
            <div className={styles.btn} onClick={sync}><i className={'fas fa-cloud'}/>Enable sync</div>
            <div className={styles.link}><NavLink to={'/'} style={{color: 'black'}}>Cancel</NavLink></div>
        </div>
    </div>
}

export default Sync