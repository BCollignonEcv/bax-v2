/**************************************
 **************** MAIN ****************
 *************************************/

export const sortTasks = (tasks) => {
    return tasks;
}

/**************************************
 *************** UTILS ****************
 *************************************/

export const formatData = (formData) => {
    if(formData.subtasks) {
        formData.subtasks = formData.subtasks.map(subtask => subtask.subtask_label)
    }
    return formData;
}