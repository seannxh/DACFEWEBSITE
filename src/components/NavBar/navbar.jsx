import {Link, Navigate} from 'react-router-dom';
import { signout } from "../../services/authService"


const NavBar = (props) => {
    return(
        <>
            <div>
                <ul>
                    {props.token ? 
                    <>
                    <div>
                        <li>
                            <Link to="/home">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/viewmenu">
                             View Menu
                            </Link>
                        </li>
                        <li>
                            <Link to="/contactus">
                                Contact Us
                            </Link>
                        </li>
                    </div>
                    {props.isAdmin && (
                            <li>
                                <Link to="/menuform">Admin Menu Form</Link>
                            </li>
                        )}
                        <li>
                            <Link onClick={() => {signout()
                                props.setToken(null);
                                Navigate('/home')
                            }}>
                                Sign Out
                            </Link>
                        </li>
                    </>
                    :
                    //LOGO HERE 
                    <>
                    <div>
                        <li>
                            <Link to="/home">
                                Home
                            </Link>
                        </li>
                    </div>
                    <div>
                        <li>
                             <Link to="/users/signup">
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link to="/users/signin">
                                Sign In
                            </Link>
                        </li>
                        <div>
                            <li>
                                <Link to="/contactus">
                                    Contact Us
                                </Link>
                            </li>
                        </div>
                    </div>
                </>
                }
                </ul>
            </div>
        </>
    )
}

export default NavBar