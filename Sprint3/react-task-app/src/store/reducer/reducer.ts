import { loggerReducer } from "../slices/loggerSlice";
import { boardsReducer } from "../slices/boardSlices";
import { modalReducer } from "../slices/modalSlice";

const reducer = {
    logger : loggerReducer,
    boards : boardsReducer,
    modal : modalReducer
}

export default  reducer