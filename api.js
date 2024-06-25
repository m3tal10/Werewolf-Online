import { useContext } from "react";
import { AuthContext } from "./src/components/ContextApi/Context";


const [userName]=useContext(AuthContext)


export function