import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import authFunctions from "../../AuthArea/AuthFunctions";

/**
 * NotFound Component
 *
 * - A React component that displays a "404 Page Not Found" error message when a user navigates to a nonexistent page.
 * - Includes a button to redirect users to the home page or a designated page based on the user's authentication status.
 */


export function NotFound(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className="NotFound">
            <div className="content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Oops! The page you are looking for does not exist.</p>
                <button onClick={() => navigate(authFunctions.unauthorizedMapper())}>Go Back Home</button>
            </div>
        </div>
    );
}
