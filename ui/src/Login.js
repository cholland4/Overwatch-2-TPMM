import React, {useState, useEffect, Fragment} from 'react';
import API from './API_Interface/API_Interface';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';


export default function Login({setUser}) {
    const [userInput, setUserInput] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);
    const [createUserPress, setCreateUserPress] = useState(false);



    const handleInputChange = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserInput(event.target.value);

        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
        console.log(`new userInput value is: ${JSON.stringify(userInput)}`);
    };


    const handleCreateUser = () => {
        // if button is pressed we set it to true and we know that we're going to want to
        // create a new user rather than just grab userInfo

        //console.log("handleCreateUser called.");

        async function createAccountStatus() {
            await setCreateUserPress(true);

            console.log(`Create account pressed ${JSON.stringify(createUserPress)}`)
        }

        createAccountStatus();

    }



    useEffect(() => {

        if( ! verifyUser || userInput.length === 0)
            return;

        const api = new API();


        async function createUserInTable() {
            // api call for createUser
            let new_user_id = userInput.replace('#', '-')

            let newUserDictionary = {
                user_id: new_user_id,
                tank_rank: 0,
                dps_rank: 0,
                support_rank: 0
            }

            await api.insertNewUser(newUserDictionary);


        }



        async function getUserInfo() {
            api.getUserInfo(userInput.replace('#','-'))
                .then( userInfo => {
                    console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                    const user = userInfo.user;
                    if( userInfo.status === "OK" ) {
                        setUser(user);
                    } else  {
                        setVerifyUser(false);
                        setAuthFailed(true);
                    }
                });
        }


        if (createUserPress) {
            // if createAccount was pressed, call this function to insert new user into database
            createUserInTable();
        }

        getUserInfo();

    }, [verifyUser, setUser, userInput]);


    return (
       <Fragment>
           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Login name"
                    placeholder=""
                    value={userInput}
                    helperText="Only for existing users!"
                    onChange={handleInputChange}
                />
                <Divider />
           </Box>

           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
           <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {setVerifyUser(true)}}
                >Proceed</Button>
           </Box>
           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
               <Button
                   variant="outlined"
                   size="medium"
                   onClick={() => {handleCreateUser(); setVerifyUser(true);}}
               >Create Account</Button>
           </Box>
       </Fragment>

    );
}