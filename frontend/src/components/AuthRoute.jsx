import { Navigate } from "react-router-dom";
import { useUser } from "./Hooks/UserContext";

function AuthRoute({ children }) {

      const { user } = useUser();

  return user ? children : <Navigate to="/login" />;
}
  

export default AuthRoute
