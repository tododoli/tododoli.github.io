import React from 'react'
import styles from './QR.module.css'
import QRCode from 'qrcode.react'

const QR = (props) => {
    return <div className={styles.wrapper} onClick={props.hideFun}>
        <QRCode value={props.link}/>
    </div>
}

export default QR