import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const useInfo = ()=>{
    const context = useContext(AuthContext)
    return context
}

export default useInfo