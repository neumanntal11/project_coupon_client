import { jwtDecode } from "jwt-decode";
import { jwtUser } from "./Login/Login";

/**
 * AuthFunctions Class
 *
 * - A utility class for managing user authentication and role-based access.
 * - It provides methods to check if a user is logged in, and if they have specific roles (Admin, Customer, Company).
 * - It also maps unauthorized users to appropriate routes based on their role.
 *
 */


class AuthFunctions {
  loggedIn() {
    if (sessionStorage.getItem("loggedIn") === "true")
      return true;
    const token = localStorage.getItem("token");
    if (token && token.trim() !== "") {
      console.log("logged in")
      return true;
    } else {
      console.log("logged out")
      return false;
    }
  }

  isAdmin() {
    if (sessionStorage.getItem("loggedIn") !== "true") 
      return false // Token does not exist
    try {
      const token = localStorage.token;
      const user = jwtDecode<jwtUser>(token);
      return user.type === "Administrator";
    } catch (error) {
      console.error("Invalid token:", error);
      return false; // Invalid token
    }
  }

  isCustomer() {
    if (sessionStorage.getItem("loggedIn") !== "true") 
      return false // Token does not exist
    try {
      const token = localStorage.token;
      const user = jwtDecode<jwtUser>(token);
      return user.type === "Customer";
    } catch (error) {
      console.error("Invalid token:", error);
      return false; // Invalid token
    }
  }

  isCompany() {
    if (sessionStorage.getItem("loggedIn") !== "true") 
      return false // Token does not exist
    try {
      const token = localStorage.token;
      const user = jwtDecode<jwtUser>(token);
      return user.type === "Company";
    } catch (error) {
      console.error("Invalid token:", error);
      return false; // Invalid token
    }
  }
  unauthorizedMapper(): string{
    if (sessionStorage.getItem("loggedIn") !== "true") 
      return "/login"; // Token does not exist
    try{
      const token = localStorage.token;
        const user = jwtDecode<jwtUser>(token);
        if(user.type === "Administrator")
            return "/companies"
        else if (user.type === "Customer")
            return "/coupons"
        else
        return "/our_coupons"
    } catch (error){
       return "/login"; 
    }
  }

}

const authFunctions = new AuthFunctions();
export default authFunctions;
