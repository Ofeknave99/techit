import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PageNotFondProps {
    
}
 
const PageNotFond: FunctionComponent<PageNotFondProps> = () => {
    let navigate = useNavigate();
    return ( <><>
      <h1 className="display-1">404 - Page Not Found</h1>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>
        Back
      </button>
    </></> );
}
 
export default PageNotFond;