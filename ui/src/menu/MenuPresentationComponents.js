import {Fragment, useEffect, useRef} from "react";
import {Button, Grid, Typography} from "@mui/material";
import tankIcon from "../Icons/TankIcon.png";
import damageIcon from "../Icons/DamageIcon.png";
import supportIcon from "../Icons/SupportIcon.png";
import React, { useState } from 'react';
import Box from "@mui/material/Box";



function ChooseRole(props) {
    return (
        <Fragment>
            <div style={{textAlign:'center'}}>
                <Button style={{position:'absolute', left:'5px', top:'5px'}} variant="contained">User Profile</Button>
                <Button style={{position:'absolute', right:'5px', top:'5px'}} variant="contained">Logout</Button>
                <Typography variant={'h3'}>Choose A Role</Typography>
                <Grid container
                      spacing={12}
                      justifyContent="center"
                      direction="row"
                      alignItems="stretch"
                      paddingTop={'50px'}>
                    <Grid item xs={3}>
                        <button>
                            <Typography variant="h3">Tank</Typography>
                            <img src={tankIcon}/>
                        </button>
                    </Grid>
                    <Grid item xs={3}>
                        <button>
                            <Typography variant="h3">Damage</Typography>
                            <img src={damageIcon}/>
                        </button>
                    </Grid>
                    <Grid item xs={3}>
                        <button>
                            <Typography variant="h3">Support</Typography>
                            <img src={supportIcon}/>
                        </button>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
}

function InQueueScreen(props) {
    // const {numTanks, numDamage, numSupport} = props;
    const numTanks = 0;
    const numDamage = 0;
    const numSupport = 0;
    return (
        <Fragment>
            <div style={{textAlign:'center'}}>
                <Typography variant={'h3'}>Queue</Typography>
                <Grid container
                      spacing={12}
                      justifyContent="center"
                      direction="row"
                      alignItems="stretch"
                      paddingTop={'50px'}>
                    <Grid item xs={3}>
                        <Typography variant="h3">Tank</Typography>
                        <img src={tankIcon}/>
                        <Typography variant="h3">{numTanks}/2</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h3">Damage</Typography>
                        <img src={damageIcon}/>
                        <Typography variant="h3">{numDamage}/4</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h3">Support</Typography>
                        <img src={supportIcon}/>
                        <Typography variant="h3">{numSupport}/4</Typography>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
}


function LobbyScreen(props) {
    // const {players} = props;
    const players = ['player 1', 'player 2', 'player 3', 'player 4', 'player 5',
        'player 6', 'player 7', 'player 8', 'player 9', 'player 10'];
    const [csvData, setCsvData] = useState([]);
    useEffect(() => {
        console.log(csvData);
    }, [csvData]);

    const readerRef = useRef(new FileReader());
    const handleCsvUpload = (event) => {
        const file = event.target.files[0];
        const reader = readerRef.current;

        reader.readAsText(file);

        reader.onload = () => {
            const csv = reader.result;
            const lines = csv.split('\n');
            const result = [];

            for (let i = 1; i < lines.length; i++) {
                const obj = {};
                const currentline = lines[i].split(',');

                obj["Player Name"] = currentline[4];
                obj["Hero Damage Dealt"] = currentline[11];
                obj["Healing Dealt"] = currentline[12];

                result.push(obj);
            }

            setCsvData(result);
            console.log(csvData);
        };

    };

    return (
        <Fragment>
            <div style={{textAlign:'center'}}>
                <Typography variant={'h3'}>Lobby</Typography>
                <Grid container columns={2}>
                    {
                        players.map((element, idx) =>
                            <Grid item
                                  key={idx}
                                  xs={1}
                                  sx={{mb: 0.8}}
                            >
                                <Typography>{element}</Typography>
                            </Grid>
                        )
                    }
                </Grid>
                <Button variant="contained">Report Winner</Button>
                <Box sx={{justify: 'flex', alignContent: 'center'}}>
                <div style={ {marginTop: 350, justifySelf: 'center', marginLeft: 'auto', marginRight: 'auto'}}>

                    <Typography variant='h5' style={{marginBottom: 25, marginTop: 5}}> Upload your statistics post match!</Typography>

                    <Box sx={{ justify: 'flex', alignContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                        <input  type="file" onChange={handleCsvUpload} />
                    </Box>

                </div>
            </Box>
            </div>
        </Fragment>
    );
}



function UserProfile(props) {
    // const {username} = props;
    const username = "Archangel#12958"
    return (
        <Fragment>
            <div style={{textAlign:'center'}}>
                <Button style={{position:'absolute', left:'5px', top:'5px'}} variant="contained">User Profile</Button>
                <Button style={{position:'absolute', right:'5px', top:'5px'}} variant="contained">Logout</Button>
                <Typography variant={'h3'}>{username}</Typography>
            </div>
        </Fragment>
    )
}

const presentationComponents = (props) => {
    return [
        {
            title: 'ChooseRole',
            component: <ChooseRole/>
        },
        {
            title: 'InQueue',
            component: <InQueueScreen/>
        },
        {
            title: 'Lobby',
            component: <LobbyScreen/>
        },
        {
            title: 'Profile',
            component: <UserProfile/>
        },
    ];
};


const containerComponents = (props) => {
    return [
        {
            title: 'Activities',
            component: <Fragment />
        }
    ];
};

export {presentationComponents, containerComponents};
