import {Fragment, useEffect, useState} from "react";
import {Button, Grid, Stack, Typography} from "@mui/material";
import tankIcon from "../Icons/TankIcon.png";
import damageIcon from "../Icons/DamageIcon.png";
import supportIcon from "../Icons/SupportIcon.png";
import API from "../API_Interface/API_Interface";
import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";

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

function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};

function LobbyScreen(props) {
    // const {players} = props;
    const players = ['player 1', 'player 2', 'player 3', 'player 4', 'player 5',
        'player 6', 'player 7', 'player 8', 'player 9', 'player 10'];
    return (
        <Fragment>
            <div style={{textAlign:'center'}}>
                <Typography variant={'h3'}>Queue</Typography>
                {/*<Grid container columns={2}>
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
                </Grid> */}
                <Box style={{backgroundColor:'lightgray',
                    width:'39%', float:'left', padding:'2px', margin:'3px'}}>
                    <Typography variant={'h5'}>Team 1</Typography>
                    <Stack>
                        {
                            players.map((element, idx) =>
                                <Item key={idx}>
                                    {element}
                                </Item>
                            )
                        }
                    </Stack>
                </Box>
                <Box style={{backgroundColor:'lightgray',
                    width:'19%', float:'left', padding:'2px', margin:'3px'}}>
                    <Typography variant={'h5'}>avg</Typography>
                </Box>
                <Box style={{backgroundColor:'lightgray',
                    width:'39%', float:'left', padding:'2px', margin:'3px'}}>
                    <Typography variant={'h5'}>Team 2</Typography>
                </Box>
                <Button variant="contained">Report Winner</Button>
            </div>
        </Fragment>
    );
}

function UserProfile(props) {
    const {user} = props;

    const [tankRank, setTankRank] = useState(2450);
    const [dpsRank, setDpsRank] = useState(2450);
    const [supportRank, setSupportRank] = useState(2450);


    useEffect(() => {
    const api = new API();


    async function getUserData() {
        // api call for createUser
        let new_user_id = String(user).replace('#', '-');

        const ranks = await api.getUserRanks(new_user_id);

        setTankRank(ranks.user.tank_rank);
        setDpsRank(ranks.user.dps_rank);
        setSupportRank(ranks.user.support_rank);
    }

    getUserData();

    }, [tankRank, dpsRank, supportRank]);


    return (
        <Fragment>
            <div style={{textAlign:'center'}}>
                <Button style={{position:'absolute', left:'5px', top:'5px'}} variant="contained">User Profile</Button>
                <Button style={{position:'absolute', right:'5px', top:'5px'}} variant="contained">Logout</Button>
                <Typography variant={'h3'} marginBottom={'15px'}>{String(user).split('-')[0]}'s Profile</Typography>

                <Box style={{backgroundColor:'lightgray',
                    width:'32%', float:'left', padding:'2px', margin:'3px'}}>
                    <Typography variant={'h5'}>TANK</Typography>
                    <Typography variant={'h6'}>{tankRank}</Typography>
                </Box>
                <Box style={{backgroundColor:'lightgray',
                    width:'32%', float:'left', padding:'2px', margin:'3px'}}>
                    <Typography variant={'h5'}>DPS</Typography>
                    <Typography variant={'h6'}>{dpsRank}</Typography>
                </Box>
                <Box style={{backgroundColor:'lightgray',
                    width:'32%', float:'left', padding:'2px', margin:'3px'}}>
                    <Typography variant={'h5'}>SUPPORT</Typography>
                    <Typography variant={'h6'}>{supportRank}</Typography>
                </Box>

                <Box style={{
                    width:'100%', padding:'2px'}} marginY={'10px'}>
                    <Typography variant={'h5'}>further statistics here</Typography>
                    <Typography variant={'h6'}>average damage per minute,
                    average healing per minute,
                    etc</Typography>
                </Box>


            </div>
        </Fragment>
    )
}

const presentationComponents = (props) => {
    const {user}=props;
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
            component: <UserProfile user={user}/>
        }
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
