import React, {Fragment, useEffect, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// import {presentationComponents, containerComponents}  from './MenuPresentationComponents';
import {Button, Grid, Paper, Stack} from "@mui/material";
import tankIcon from "../Icons/TankIcon.png";
import damageIcon from "../Icons/DamageIcon.png";
import supportIcon from "../Icons/SupportIcon.png";
import API from "../API_Interface/API_Interface";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
    ({theme, open}) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const TopBar = ({inQueue, handleSelectedItem, title, user, logoutAction}) => {
    // This component is responsible for rendering the Toolbar that is drawn
    // at the top of the drawer.
    let user_name = user.replace('-','#');

    return (
        <Fragment>
            <AppBar position="fixed"  >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                    <Box width="100%" justifyContent="center" flex={1}>
                        <Typography variant="h6" noWrap component="div" align="center">
                            {user_name}
                        </Typography>
                    </Box>
                    <Box visibility={inQueue ? 'hidden' : 'visible' } width="50%" justifyContent="center" flex={1} onClick={() => handleSelectedItem('Profile')}>
                        <Typography variant="h6" noWrap component="div" align="center">
                            Profile
                        </Typography>
                    </Box>
                    <Box visibility={inQueue ? 'hidden' : 'visible' } width="50%" justifyContent="center" flex={1} onClick={() => handleSelectedItem('ChooseRole')}>
                        <Typography variant="h6" noWrap component="div" align="center">
                            Queue
                        </Typography>
                    </Box>
                    <Box visibility={inQueue ? 'visible' : 'hidden' } width="50%" justifyContent="center" flex={1} onClick={() => handleSelectedItem('ChooseRole')}>
                        <Typography variant="h6" noWrap component="div" align="center">
                            Leave Queue
                        </Typography>
                    </Box>
                    <Box width="100%" justifyContent="right" flex={1}>
                        <Typography variant="h7" noWrap component="div" align="right" onClick={() => logoutAction()}>
                            Logout
                        </Typography>
                    </Box>

                </Toolbar>
            </AppBar>
        </Fragment>
    )
};

function ChooseRole(props) {
    const {setSelectedItem, setInQueue} = props;
    const clickHandler = () => {
        setSelectedItem("InQueue");
        setInQueue(true);
    }
    return (
        <Fragment>
            <div style={{textAlign:'center'}}>
                {/*<Button style={{position:'absolute', right:'15px'}} variant="contained" onClick={setSelectedItem('Profile')}>Profile</Button>*/}
                <Typography variant={'h3'}>Choose A Role</Typography>
                <Grid container
                      spacing={12}
                      justifyContent="center"
                      direction="row"
                      alignItems="stretch"
                      paddingTop={'50px'}>
                    <Grid item xs={3}>
                        <button onClick={clickHandler}>
                            <Typography variant="h3">Tank</Typography>
                            <img src={tankIcon}/>
                        </button>
                    </Grid>
                    <Grid item xs={3}>
                        <button onClick={clickHandler}>
                            <Typography variant="h3">Damage</Typography>
                            <img src={damageIcon}/>
                        </button>
                    </Grid>
                    <Grid item xs={3}>
                        <button onClick={clickHandler}>
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette
        .mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function LobbyScreen(props) {
    // const {team1, team2, lobby_avg} = props;
    const team1 = ['player 1', 'player 2', 'player 3', 'player 4', 'player 5'];
    const team2 = ['player 6', 'player 7', 'player 8', 'player 9', 'player 10'];
    // team1 and team2 will be an array of objects that contain at LEAST usernames
    // needs to come from props
    const lobby_avg = 2450;
    // lobby_avg is an integer between 0 and 5000, that is the average
    // calue of all users in the match
    return (
        <Fragment>
            <div style={{textAlign:'center'}}>
                <Typography variant={'h3'}>Queue</Typography>
                <Box style={{backgroundColor:'lightgray',
                    width:'39%', float:'left', padding:'2px', margin:'3px'}}>
                    <Typography variant={'h5'}>Team 1</Typography>
                    <Stack divider={<Divider orientation="horizontal" flexItem />}>
                        {
                            team1.map((element, idx) =>
                                <Item key={idx}>
                                    {element}
                                </Item>
                            )
                        }
                    </Stack>
                </Box>
                <Box style={{backgroundColor:'lightgray',
                    width:'19%', float:'left', padding:'2px', margin:'3px'}}>
                    <Typography variant={'h5'}>Average</Typography>
                    <Stack
                        alignContent={'center'}
                        justifyItems={'center'}
                        spacing={1}
                        height={'100%'}>
                        <Item>
                            {lobby_avg}
                        </Item>
                    </Stack>
                </Box>
                <Box style={{backgroundColor:'lightgray',
                    width:'39%', float:'left', padding:'2px', margin:'3px'}}>
                    <Typography variant={'h5'}>Team 2</Typography>
                    <Stack divider={<Divider orientation="horizontal" flexItem />}>
                        {
                            team2.map((element, idx) =>
                                <Item key={idx}>
                                    {element}
                                </Item>
                            )
                        }
                    </Stack>
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
                {/*<Button style={{position:'absolute', right:'15px'}} variant="contained">Queue</Button>*/}
                <Typography variant={'h3'} marginBottom={'15px'}>{String(user).split('-')[0]}'s Profile</Typography>

                <Box>
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
                </Box>


                <Box>
                    <Box style={{backgroundColor:'lightgray',
                        width:'48%', float:'left', padding:'2px', margin:'3px'}}>
                        <Typography variant={'h5'}>Damage Per 10 Min</Typography>
                        <Typography variant={'h6'}>TODO</Typography>
                    </Box>
                    <Box style={{backgroundColor:'lightgray',
                        width:'48%', float:'left', padding:'2px', margin:'3px'}}>
                        <Typography variant={'h5'}>Healing Per 10 Min</Typography>
                        <Typography variant={'h6'}>TODO</Typography>
                    </Box>
                </Box>


            </div>
        </Fragment>
    )
}

const presentationComponents = (props) => {
    const {user, setSelectedItem, setInQueue}=props;
    return [
        {
            title: 'ChooseRole',
            component: <ChooseRole setSelectedItem={setSelectedItem} setInQueue={setInQueue}/>
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

const findSelectedComponent = (selectedItem, user, setSelectedItem, setInQueue) => {
    const component = [...presentationComponents({user, setSelectedItem, setInQueue})].filter(comp => comp.title === selectedItem);
    if (component.length === 1)
        return component[0];

    console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item.")
    return {
        title: null,
        component: null
    }
};

export default function MainDrawer({title, user, logoutAction}) {
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState('Profile');
    const [inQueue, setInQueue] = useState(false);

    const handleSelectedItem = (title) => {
        setSelectedItem(title)
        if (title === 'ChooseRole' || title === 'Profile')
            setInQueue(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar title={title} inQueue={inQueue} handleSelectedItem={handleSelectedItem} user={user} logoutAction={logoutAction} />

            <Main sx={{marginLeft:'0px'}}>
                <DrawerHeader />
                {findSelectedComponent(selectedItem, user, setSelectedItem, setInQueue).component}
            </Main>
        </Box>
    );
}