import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDisptach, RootState } from "../store";

export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector
export const userTypedDispatch = () => useDispatch<AppDisptach>();
export const logger = useTypedSelector((state: RootState) => state.logger)
// 타입스크립트 에서는 타입 스크립트가 추론을 하지 못하는 경우 개발자가 타입을 지정해야한다