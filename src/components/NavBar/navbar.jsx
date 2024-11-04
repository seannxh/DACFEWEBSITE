import {Link} from 'react-router-dom';
import { signout } from "../../services/authService"
//link is a tage
//usenavigation is a morel ike a hook that is attached to buttons

const NavBar = (props) => {
    // const navbar = {token, setToken} // if i do this i dont have to use props if i do this and I dont have to use props
    return(
        <>
            <div>
                <ul>
                    {/* {if there is a user token i just want a sign ouit link} */}
                    {props.token ? 
                    <>
                        <li>
                            <Link onClick={() => {signout()
                            // when signed out it makes the token null
                                props.setToken(null);
                            }}>
                                Sign Out
                            </Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <Link to="/home">
                                Home
                            </Link>
                        </li>
                    <li>
                        <Link to="/menu">
                            Menu
                        </Link>
                    </li>
                    <li>
                        <Link to="/contactus">
                            Contact Us
                        </Link>
                    </li>
                </>
                }
                    {/* {if there is not a user token i just want a sign in and signout link} */}
                </ul>
            </div>
        </>
    )
}

export default NavBar