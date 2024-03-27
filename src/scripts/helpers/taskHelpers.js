/**************************************
 **************** MAIN ****************
 *************************************/

export const sortTasks = (tasks) => {
    return tasks;
}

export const enhancedDBTask = (task) => {
    let lastDate = getLastDate(task);
    let dueDate = getDueDate(lastDate, task.periodicity);
    let remainingDays = getRemainingDays(dueDate)
    let remainingTime = getRemainingPercentage(remainingDays, task.periodicity)
    let status = getTastStatus(remainingTime, task.require)

    return {
        lastDate: lastDate,
        dueDate: dueDate,
        remainingDays: remainingDays,
        remainingTime: remainingTime,
        status: status
    }
}



/**************************************
 *************** UTILS ****************
 *************************************/

export const getTastStatus = (remainingTime, require) => {
    if(remainingTime <= 0 || require) {
        return 'urgent'
    } else if (remainingTime <= 35) {
        return 'medium'
    } else {
        return 'normal'
    }
}


export const getLastDate = (db_task) => {
    if (db_task.history && db_task.history.length > 0) {
        return db_task.history[0].date
    } else {
        return new Date()
    }
}

export const getDueDate = (lastDate, periodicity) => {
    let dueDate = lastDate.setDate(lastDate.getDate() + periodicity)
    return new Date(dueDate);
}

export const getRemainingDays = (dueDate) => {
    let remainingTime = dueDate - new Date();
    return Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
}

export const getRemainingPercentage = (remainingDays, periodicity) => {
    return remainingDays / periodicity * 100;
}

