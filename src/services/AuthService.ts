import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Customer } from "../Models/Customer";

//Service class to manage auth-related API calls.

class AuthService{

    async login(email:string, password:string, clientType:string){
        return(await axios.post<string>(`/login/${email}/${password}/${clientType}`)).data
    } 
   
    /**
     * after logout remove the token, logged in boolean and last update.
     */
    
    async logout(){   
        const res = (await axios.post<string>(`logout/${localStorage.token}`)).data
            localStorage.removeItem("token")
            sessionStorage.removeItem("loggedIn")
            localStorage.removeItem("lUpd")
          return res;
      }

      async signUp(customer:Customer){
        return (await axios.post<Customer>("signup", customer)).data
      }
}

const authService = new AuthService();
export default authService;