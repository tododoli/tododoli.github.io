import React, {useEffect, useState} from 'react'
import styles from './Home.module.css'
import colors from '../../Colors.module.css'
import {NavLink, Redirect} from "react-router-dom";
import {API} from "../../API/API";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import QR from "../QR";


const Home = () => {

    let [color, setColor] = useState('red')
    let [title, setTitle] = useState('')
    let [link, setLink] = useState('')

    const createList = () => {
        API.createList(title !== '' ? title : 'New list', color).then(
            (r) => {
                setLink('/' + r.name)
            }
        )
    }
    const listenKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            createList()
        }
    }

    if (link !== '') return <Redirect to={link}/>
    return <div className={styles.wrapper}>
        <div>
            <SyncParams/>
            <div className={styles.form}>
                <div className={styles.input}>
                    <input onKeyPress={listenKey} placeholder={'New List...'} value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
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
            <History/>
        </div>
    </div>
}

const History = (props) => {

    let [items, setItems] = useState([])
    let [pins, setPins] = useState([])
    useEffect(
        () => {
            getPins()
            getHistory()
        }, []
    )
    const getPins = () => {
        let key = localStorage.getItem('syncKey')
        if (key!=null)
        {
            API.fetchPins(key).then(
                r=>{
                    if(r != null) {
                        setPins(r.pins)
                        localStorage.setItem('pins', JSON.stringify(r.pins))
                    }
                    else {
                        setPins([])
                        localStorage.setItem('pins', JSON.stringify([]))
                    }
                }
            )
        }
        else {
            let pins = localStorage.getItem('pins')
            if (pins != null)
                setPins(JSON.parse(pins))
        }
    }

    const getHistory = () => {
        let history = localStorage.getItem('history')
        if (history != null)
            setItems(JSON.parse(history))
    }

    let historyItems = items.map(
        (el) => {
            return <ListCard id={el} key={el} pin={false}/>
        }
    )
    let pinnedItems = pins.map(
        (el) => {
            return <ListCard id={el} key={el} pin={true}/>
        }
    )

    return <div className={styles.history}>
        {pinnedItems}
        {historyItems}
    </div>
}

const ListCard = (props) => {

    let [listProps, setListProps] = useState({})

    useEffect(() => {
        getListProps()
    }, [props.id])

    const parseColor = (colorString) => {
        switch (colorString) {
            case 'red':
                return colors.red
            case 'green':
                return colors.green
            case 'dark':
                return colors.dark
            case 'blue':
                return colors.blue
            default:
                return colors.default
        }
    }

    const getListProps = () => {
        API.fetchList(props.id).then(
            (r) => {
                if (r != null)
                    setListProps({name: r.name, color: parseColor(r.color)})
                else
                    setListProps({name: `It's a bug, lol`, color: colors.default})
            }
        )
    }

    return <NavLink to={`/${props.id}`}
                    style={{textDecoration: "none", color: "black"}}>
        <div className={styles.itemWrapper} style={listProps.name ? {opacity: 1} : {opacity: 0}}>
            <div className={styles.circle + ' ' + listProps.color}>
                {listProps.color && <i className={props.pin ? 'fas fa-star' : 'fas fa-circle'}/>}
            </div>
            <div className={styles.listName}>{listProps.name || ''}</div>
        </div>
    </NavLink>
}

const SyncParams = () => {
    let [isSynced, setSynced] = useState(false)
    let [syncKey, setSyncKey] = useState(null)
    let [link, setLink] = useState('')
    let [isCopied, setCopied] = useState(false)
    let [isQRShown, showQR] = useState(false)
    let [isHintShown, showHint] = useState(false)

    useEffect(() => {
        checkSync()
    }, [isSynced])

    const checkSync = () => {
        let storedKey = localStorage.getItem('syncKey')
        setSynced(storedKey != null)
        setSyncKey(storedKey)
        setLink(generateLink)
    }

    const generateLink = () => {
        return window.location.href + 'sync/' + syncKey
    }
    const createUser = () => {
        API.createUser().then(
            r => {
                if (r != null) {
                    let localPins = JSON.parse(localStorage.getItem('pins'))
                    API.setPins(r.name, localPins).then(()=>{
                        setSyncKey(r.name)
                        setSynced(true)
                        setLink(generateLink())
                        localStorage.setItem('syncKey', r.name)
                    })
                }
            }
        )
    }

    return <div className={styles.syncWrapper} style={isHintShown || isQRShown ? {}:{opacity: .6}}>
        {
            isSynced ?
                <div className={styles.isSynced}>
                    {isHintShown && <div className={styles.hint}>Your pinned lists are cloud stored. You can sync a new device using the link below. <NavLink style={{color: 'black'}} to={'/nosync'}>Disable sync</NavLink></div>}
                    <div className={styles.syncedOptions}>
                        <CopyToClipboard text={link} onCopy={()=>setCopied(true)}><div className={styles.btn}><i className={isCopied ? 'fas fa-check': 'fas fa-link'}/>{isCopied ? 'Copied': 'Copy link'}</div></CopyToClipboard>
                        <div className={styles.btn} onClick={()=>showQR(true)}><i className={'fas fa-qrcode'}/>QR</div>
                        {isQRShown && <QR link={link} hideFun={()=>showQR(false)}/>}
                        <div className={styles.btn} onClick={()=>showHint(!isHintShown)}><i className={isHintShown ? 'fas fa-chevron-up' :'fas fa-chevron-down'}/>Hint</div>
                    </div>
                </div>


                :
                <div className={styles.isSynced}>
                    {isHintShown && <div className={styles.hint}>This devise shows your local pins. Start with creating a Cloud for pins. You'll be able to sync your connected devices</div>}
                    <div className={styles.localOptions}>

                        <div className={styles.btn} onClick={createUser}><i className={'fas fa-cloud'}/>New Cloud</div>

                        <div className={styles.btn} onClick={()=>showHint(!isHintShown)}><i className={isHintShown ? 'fas fa-chevron-up' :'fas fa-chevron-down'}/>Hint</div>
                    </div>
                </div>
        }
    </div>
}

export default Home