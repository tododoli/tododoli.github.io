export const checkColor = (color) => {
    // if it's ok
    if(/^#[0-9A-F]{6}$/i.test(color)) return color

    // Backward compatibility
    switch (color) {
        case 'red':
            return  '#e76f51'
        case 'blue':
            return '#0077b6'
        case 'green':
            return '#40916c'
        case 'dark': // yeah, i know
            return '#ff5d8f'
        default:
            return '#495057'
    }
}
// Turns #FFFFFF into [255,255,255]
const getRGB = (color) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(checkColor(color))
    return result ? [
         parseInt(result[1], 16),
         parseInt(result[2], 16),
         parseInt(result[3], 16)
    ] : [236, 236, 236]
}

export const getFGStyle = (color) => {
    return {
        color: checkColor(color),
        borderColor: checkColor(color)
    }
}
export const getBGStyle = (color) => {
    let rgb = getRGB(color)
    return {
        backgroundColor: `rgba(${rgb[0]},${rgb[1]},${rgb[2]},.7)`
    }
}

export const palette = [
    '#577590',
    '#f2a541',
    '#cc0029',
    '#ce4760',
    '#3ab795',
    '#495057'
]
