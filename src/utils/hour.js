export const compareDate = (date1, date2) => {
    const dateSplit1 = date1.split('/')
    const dateSplit2 = date2.split('/')
    if( Number(dateSplit1[1])> Number(dateSplit2[1])){
        return true 
    } else if (dateSplit1[1] === dateSplit2[1]){
        return Number(dateSplit1[0])>=Number(dateSplit2[0])
    }
    else{
        return false
    }
} 