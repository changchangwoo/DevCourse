import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    boardId: "board-0",
    listId: "list-0",
    task : {
        taskId : "task-0",
        taskName : "task-0",
        taskDescription: "task description",
        taskOwner : "Chang"
    }
}
const modalSlice = createSlice({
    name : 'modal',
    initialState,
    reducers : {
    }
})

export const modalReducer = modalSlice.reducer;