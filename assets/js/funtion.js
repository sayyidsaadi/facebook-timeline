/**
 * Alert Funtion
 */
const alertFuntion = (ms, alertType ='danger')=>{
    return `<p class="alert alert-${alertType} d-flex justify-content-between">${ms} <button data-bs-dismiss="alert" class="btn-close"></button> </p>`
}


/**
 * Set Ls Data
 */
const setLsData = (key, value)=>{

    // Check exist Ls Data 
    let lsData =[];
    if(localStorage.getItem(key)){
        lsData = JSON.parse(localStorage.getItem(key));
    }

    // Set Ls Data 
    lsData.push(value);
    localStorage.setItem(key, JSON.stringify(lsData));
}

/**
 * Get Ls Data
 */
const getLsData = (key)=>{
    
    // Check Exsit Ls data 
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }else{
        return false;
    }
}


/**
 * Update Ls Data
 */
const updateLsData = (key, val)=>{
    localStorage.setItem(key, JSON.stringify(val));
}