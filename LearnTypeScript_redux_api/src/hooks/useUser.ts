import { useSelector } from "react-redux";
import { RootState } from "~/slices";

export default function useUser() {
    //return useSelector((state: RootState) => state.auth.user);
    return useSelector((state) => state.auth.user);
}