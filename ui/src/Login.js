import React, {useState, useEffect, Fragment} from 'react';
import API from './API_Interface/API_Interface';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Overwatch_2 from "./Icons/Overwatch_2_resized.png";
import {Typography} from "@mui/material";
import {Tooltip} from "@mui/material"


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
            //console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
        //console.log(`new userInput value is: ${JSON.stringify(userInput)}`);
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

            setCreateUserPress(false);

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
           <Box display="flex" justifyContent="center" alignItems="center" mt={15}>
            <img src={Overwatch_2}/>
            </Box>
           <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
           <Typography variant="h2">
               Matchmaker
           </Typography>
               <Typography variant="h5" marginLeft={3} marginTop={2} fontStyle={"italic"}>
                      The hub for higher quality Solo Queue.
               </Typography>
            </Box>
           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={8} >


                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Battletag"
                    placeholder=""
                    value={userInput}
                    helperText="Please enter your Battletag."
                    onChange={handleInputChange}
                />
                <Divider />
           </Box>

           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
           <Button
                    color={"secondary"}
                    variant="outlined"
                    size="medium"
                    onClick={() => {setVerifyUser(true)}}
                >Login</Button>
           </Box>
           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
               <Tooltip title={'May take a moment to add account to our database - please be patient'}>
               <Button
                   variant="outlined"
                   size="medium"
                   onClick={() => {handleCreateUser(); setVerifyUser(true);}}
               >Create Account</Button>
               </Tooltip>
           </Box>
           <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
           </Box>
       </Fragment>

    );
}