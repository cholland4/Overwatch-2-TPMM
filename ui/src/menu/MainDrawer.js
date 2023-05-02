import React, {Fragment, useEffect, useRef, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import small_icon from "../Icons/small icon attempt.png";
import Button from "@mui/material/Button";
import damageIcon from "../Icons/DamageIcon.png";
import { Grid, Paper, Stack} from "@mui/material";
import tankIcon from "../Icons/TankIcon.png";
import supportIcon from "../Icons/SupportIcon.png";
import API from "../API_Interface/API_Interface";
import triviaQuestions from "../triviaQuestions";
import '../triviaStyle.css';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import left_quote from "../Icons/left_quote.png";
import right_quote from "../Icons/right_quote.png";

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
            <AppBar color={'secondary'} position="fixed" >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        disableRipple={true}
                        style={{cursor:'default'}}
                    >
                        <img src={small_icon}/>
                    </IconButton>
                    <Box width="100%" justifyContent="center" flex={1}>
                        <Typography variant="h6" noWrap component="div" align="center">
                            {user_name}
                        </Typography>
                    </Box>
                    <Box visibility={inQueue ? 'hidden' : 'visible' } width="50%" justifyContent="center"
                         flex={1} onClick={() => handleSelectedItem('Profile')}
                         sx={{ boxShadow:'0px 5px 15px 0 rgba(0, 0, 0,0.2)', borderRadius: '15px',
                             '&:hover': {
                                 backgroundColor: 'grey',
                                 transition: 'background-color 0.3s ease-in-out'
                             }}}>
                        <Typography variant="h6" noWrap component="div" align="center">
                            Profile
                        </Typography>
                    </Box>
                    <Box visibility={inQueue ? 'hidden' : 'visible' } width="50%" justifyContent="center"
                         flex={1} onClick={() => handleSelectedItem('ChooseRole')} sx={{ boxShadow:'0px 5px 15px 0 rgba(0, 0, 0,0.2)',
                            borderRadius: '15px',
                            '&:hover': {
                                backgroundColor: 'grey',
                                transition: 'background-color 0.3s ease-in-out'
                            }} }>
                        <Typography variant="h6" noWrap component="div" align="center">
                            Queue
                        </Typography>
                    </Box>
                    <Box width="100%" justifyContent="right" flex={1} >
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

    const {handleSelectedItem, setInQueue, setCurrentQueue, user} = props;


    async function addUserToQueue(role) {
        // api call for createUser
        const api = new API();

        const new_user_id = String(user).replace('#', '-');
        const ranks = await api.getUserRanks(new_user_id);

        let rank_for_role_queued;

        switch (role) {
            case 'tank':
                rank_for_role_queued = ranks.user.tank_rank;
                break;
            case 'dps':
                rank_for_role_queued = ranks.user.dps_rank;
                break;
            case 'support':
                rank_for_role_queued = ranks.user.support_rank;
                break;
            default:
                rank_for_role_queued = 2450;
        }



        let queueDictionary = {
            user_id: new_user_id,
            role: role,
            rank_for_role_queued: rank_for_role_queued
        }

        await api.insertIntoQueue(queueDictionary);

        if (rank_for_role_queued >= 3500){
            setCurrentQueue('expert');
            return 'expert';
        }
        else if (rank_for_role_queued >= 2000) {
            setCurrentQueue('intermediate');
            return 'intermediate';
        }
        else {
            setCurrentQueue('beginner');
            return 'beginner';
        }
    }


    const clickTank = () => {
        handleSelectedItem("InQueue");
        addUserToQueue('tank').then((result) => setCurrentQueue(result));
        setInQueue(true);
    }
    const clickDps = () => {
        handleSelectedItem("InQueue");
        addUserToQueue('dps');
        setInQueue(true);
    }
    const clickSupport = () => {
        handleSelectedItem("InQueue");
        addUserToQueue('support');
        setInQueue(true);
    }



    return (
        <Fragment>

            <div style={{textAlign:'center'}} >
                <Typography marginTop={2} boxShadow={'0px 5px 15px 0 rgba(0, 0, 0,0.2)'} variant={'h3'}>Select a Role To Join Queue</Typography>
                <Grid container
                      sx={{margin: 'auto',
                          justifyContent: 'center',
                          width: '90%',
                          marginTop: '50px',
                          borderRadius: '15px',
                      }}
                      spacing={8}
                      justifyContent="center"
                      direction="row"
                      alignItems="stretch"
                      paddingBottom={'50px'}
                      paddingRight={'55px'}>

                    <Grid item xs={3}>
                        <button onClick={clickTank} style={{backgroundColor: '#0080FF', borderRadius: '20px', boxShadow: '5px 5px 20px 0 rgba(0, 128, 255,5)'}}>
                            <Typography variant="h3" color={'white'}>Tank</Typography>
                            <img src={tankIcon}/>
                        </button>
                        <Box paddingTop={'55px'} sx={{ marginTop: '110px',
                            alignContent: 'center', paddingBottom:'55px', height:"250px", borderRadius: '25px' }}>
                            <Typography alignSelf={'left'} variant="p" color={'#4A4C4E'} fontStyle={'italic'} fontSize={21}>
                                As a tank you are at the core of your team. You are responsible for performing as a frontline
                                for your allies and making sure to absorb as much damage and pressure as possible while
                                also disrupting enemy champions.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <button onClick={clickDps} style={{backgroundColor: '#FF8C00', borderRadius: '20px', boxShadow: '5px 5px 20px 0 rgba(255, 102, 0,5)'}}>
                            <Typography variant="h3" color={'white'}>Damage</Typography>
                            <img src={damageIcon}/>
                        </button>
                        <Box paddingTop={'55px'} sx={{ marginTop: '110px',
                            alignContent: 'center', paddingBottom:'55px', height:"250px", borderRadius: '25px' }}>
                            <Typography align={'left'}  variant="p" color={'#4A4C4E'} fontStyle={'italic'} fontSize={21}>
                                Damage Dealers are responsible for just that, dealing damage. Your role on the team will
                                be to deal as much damage as possible to the other team to put pressure on the enemy supports.
                                Staying alive to maintain that pressure is also important.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <button onClick={clickSupport} style={{backgroundColor: '#FF4136', borderRadius: '25px', boxShadow: '5px 5px 20px 0 rgba(255, 65, 54,5)'}}>
                            <Typography variant="h3" color={'white'}>Support</Typography>
                            <img src={supportIcon}/>
                        </button>
                        <Box paddingTop={'55px'} sx={{ marginTop: '110px',
                            alignContent: 'center', paddingBottom:'55px', height:"250px", borderRadius: '25px' }}>
                            <Typography align={'center'} variant="body1" color={'#4A4C4E'} fontStyle={'italic'} fontSize={21}>
                                Supports are an integral part of the team. This role is responsible for keeping your allies
                                alive and well over the course of a match through recovery or protection abilities.

                            </Typography>
                        </Box>
                    </Grid>
                </Grid>



            </div>

        </Fragment>
    );
}



function InQueueScreen(props) {
    const {user, handleSelectedItem, currentQueue, setTeam1, setTeam2, setLobbyAvg} = props;
    const user_id = String(user).replace('#', '-');

    const api = new API();

    const quotesStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10px",
    };


    const quoteStyle = {
        height: "40px",
        marginRight: "10px",
        marginLeft: "10px"
    };

    const [tanks, setNumTanks] = useState(0);
    const [dps, setDps] = useState(0);
    const [supports, setSupports] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [feedback, setFeedback] = useState('');

    let queue = [];
    async function updateUsersInQueue(current_queue) {
        switch(current_queue) {
            case "beginner":
                const tanksInBeginnerQueue = await api.grabBeginnerQueue('tank');
                console.log(`users from beginner tank ${JSON.stringify(tanksInBeginnerQueue)}`);
                setNumTanks(tanksInBeginnerQueue.data.length);

                const dpsInBeginnerQueue = await api.grabBeginnerQueue('dps');
                console.log(`users from beginner dps ${JSON.stringify(dpsInBeginnerQueue)}`);
                setDps(dpsInBeginnerQueue.data.length);

                const supportsInBeginnerQueue = await api.grabBeginnerQueue('support');
                console.log(`users from beginner support ${JSON.stringify(supportsInBeginnerQueue)}`);
                setSupports(supportsInBeginnerQueue.data.length);

                if (tanksInBeginnerQueue.data.length >= 2 && dpsInBeginnerQueue.data.length >= 4 && supportsInBeginnerQueue.data.length >= 4){
                    console.log('beginner queue satisfied');
                    queue = [...tanksInBeginnerQueue.data, ...dpsInBeginnerQueue.data, ...supportsInBeginnerQueue.data];
                    const matchmake = await api.startMatchmake(queue).then((mmInfo) => mmInfo);
                    setTeam1(matchmake[0]);
                    setTeam2(matchmake[1]);
                    const lobbyAvg = ((matchmake[2] + matchmake[3]) / 2).toFixed(0);
                    setLobbyAvg(lobbyAvg);

                    handleSelectedItem('Lobby');

                    await api.removeMultipleFromQueues([...matchmake[0], ...matchmake[1]]);
                }

                break;
            case "intermediate":

                const tanksInIntermediateQueue = await api.grabIntermediateQueue('tank');
                console.log(`users from intermediate tank ${JSON.stringify(tanksInIntermediateQueue)}`);
                setNumTanks(tanksInIntermediateQueue.data.length);

                const dpsInIntermediateQueue = await api.grabIntermediateQueue('dps');
                console.log(`users from intermediate dps ${JSON.stringify(dpsInIntermediateQueue)}`);
                setDps(dpsInIntermediateQueue.data.length);

                const supportsInIntermediateQueue = await api.grabIntermediateQueue('support');
                console.log(`users from intermediate support ${JSON.stringify(supportsInIntermediateQueue)}`);
                setSupports(supportsInIntermediateQueue.data.length);

                if (tanksInIntermediateQueue.data.length >= 2 && dpsInIntermediateQueue.data.length >= 4 && supportsInIntermediateQueue.data.length >= 4){
                    console.log('intermediate queue satisfied');
                    queue = [...tanksInIntermediateQueue.data, ...dpsInIntermediateQueue.data, ...supportsInIntermediateQueue.data];
                    const matchmake = await api.startMatchmake(queue).then((mmInfo) => mmInfo);
                    setTeam1(matchmake[0]);
                    setTeam2(matchmake[1]);
                    const lobbyAvg = ((matchmake[2] + matchmake[3]) / 2).toFixed(0);
                    setLobbyAvg(lobbyAvg);

                    handleSelectedItem('Lobby');

                    await api.removeMultipleFromQueues([...matchmake[0], ...matchmake[1]]);
                }


                break;
            case "expert":
                const tanksInExpertQueue = await api.grabExpertQueue('tank');
                console.log(`users from expert tank ${JSON.stringify(tanksInExpertQueue)}`);
                setNumTanks(tanksInExpertQueue.data.length);

                const dpsInExpertQueue = await api.grabExpertQueue('dps');
                console.log(`users from expert dps ${JSON.stringify(dpsInExpertQueue)}`);
                setDps(dpsInExpertQueue.data.length);

                const supportsInExpertQueue = await api.grabExpertQueue('support');
                console.log(`users from expert support ${JSON.stringify(supportsInExpertQueue)}`);
                setSupports(supportsInExpertQueue.data.length);

                if (tanksInExpertQueue.data.length >= 2 && dpsInExpertQueue.data.length >= 4 && supportsInExpertQueue.data.length >= 4){
                    console.log('expert queue satisfied');
                    queue = [...tanksInExpertQueue.data, ...dpsInExpertQueue.data, ...supportsInExpertQueue.data];
                    const matchmake = await api.startMatchmake(queue).then((mmInfo) => mmInfo);
                    setTeam1(matchmake[0]);
                    setTeam2(matchmake[1]);
                    const lobbyAvg = ((matchmake[2] + matchmake[3]) / 2).toFixed(0);
                    setLobbyAvg(lobbyAvg);

                    handleSelectedItem('Lobby');

                    await api.removeMultipleFromQueues([...matchmake[0], ...matchmake[1]]);
                }


                break;
            default:
                console.log("Invalid queue type.");
        }
    }

    function checkIfQueueSatisfied() {
        console.log("checking queue.");
        if (tanks >= 2 && dps >= 4 && supports >= 4){
            console.log('satisfied');
            // api call to matchmaking alg
            // set team1 and team2 states
            // handleSelectedItem('Lobby');
        }
        // logic to check if queue is satisfied and then update page to the lobby potentially right here
    }


    // can uncomment this useEffect block of code if you want the timer to check every 5 seconds, can also change the 5000 value
    // to change the amount of seconds it checks, 5000 = 5 seconds, 10000 = 10 seconds, etc.



    useEffect(() => {
        // update queue state every 5 seconds
        const interval = setInterval(() => {
            updateUsersInQueue(currentQueue);
            // after this call need to also check if the queue was satisfied within the interval
            // checkIfQueueSatisfied();

        }, 5000);
        // clean up interval on unmount
        return () => clearInterval(interval);
    }, [currentQueue]);




    function handleAnswerSelect(selectedAnswer) {
        const currentQuestion = triviaQuestions[currentQuestionIndex];
        const isAnswerCorrect = currentQuestion.answer === selectedAnswer;

        if (isAnswerCorrect) {
            setFeedback(<CheckCircleIcon sx={{color: 'green', fontSize: 40}} />);
        } else {
            setFeedback(<HighlightOffIcon sx={{color: 'red', fontSize: 40}} />);
        }

        const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
        setCurrentQuestionIndex(randomIndex);
    }

    const currentQuestion = triviaQuestions[currentQuestionIndex];

    const handleLeaveQueue = () => {
        api.removeFromQueues(user_id);
        handleSelectedItem('ChooseRole');
    }


    return (
        <Fragment>
            <div style={{textAlign:'center'}}>
                <Typography variant={'h3'}>Waiting to fill up {currentQueue} Queue...</Typography>
                <Grid container
                      spacing={12}
                      justifyContent="center"
                      direction="row"
                      alignItems="stretch"
                      paddingTop={'50px'}>
                    <Grid item xs={3}>
                        <Typography variant="h3">Tank</Typography>
                        <img src={tankIcon}/>
                        <Typography variant="h3">{tanks}/2</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h3">Damage</Typography>
                        <img src={damageIcon}/>
                        <Typography variant="h3">{dps}/4</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h3">Support</Typography>
                        <img src={supportIcon}/>
                        <Typography variant="h3">{supports}/4</Typography>
                    </Grid>
                </Grid>
                <Box marginTop={'25px'}>
                    <button onClick={handleLeaveQueue}
                            style={{backgroundColor: 'lightgray', borderRadius: '20px', boxShadow: '5px 5px 20px 0 rgba(0, 0, 0,5)'}}>
                        Leave Queue
                    </button>
                </Box>
            </div>
            <div style={{textAlign: 'center'}}>
                <Box sx={{justify: 'center', marginTop: 10}}>
                    <div style={quotesStyle}>
                        <img
                            src={left_quote}
                            alt="Left quotation mark"
                            style={quoteStyle}
                        />
                        <h3 style={{ fontStyle: "italic" }}>{currentQuestion.question}</h3>
                        <img
                            src={right_quote}
                            alt="Right quotation mark"
                            style={quoteStyle}
                        />
                    </div>
                    <ul style={{listStyleType: 'none', }}  >
                        {currentQuestion.options.map(option => (
                            <li key={option}>
                                <div className="trivia-button-container">
                                    <button onClick={() => handleAnswerSelect(option)} className="trivia-button">
                                        {option}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Box marginLeft={5}>
                        {feedback}
                    </Box>

                </Box>
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
    const {team1, team2, lobbyAvg} = props;
    // const team1 = ['player 1', 'player 2', 'player 3', 'player 4', 'player 5'];
    // const team2 = ['player 6', 'player 7', 'player 8', 'player 9', 'player 10'];
    // team1 and team2 will be an array of objects that contain at LEAST usernames
    // needs to come from props

    const [csvData, setCsvData] = useState([]);
    useEffect(() => {
        console.log(csvData);
    }, [csvData]);

    // const lobby_avg = 2450;
    // lobby_avg is an integer between 0 and 5000, that is the average
    // calue of all users in the match


    // handle the CSV file uploading
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
                            {lobbyAvg}
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
    const {user} = props;

    const [tankRank, setTankRank] = useState(2450);
    const [dpsRank, setDpsRank] = useState(2450);
    const [supportRank, setSupportRank] = useState(2450);
    const [tankWins, setTankWins] = useState(0);
    const [dpsWins, setDpsWins] = useState(0);
    const [supportWins, setSupportWins] = useState(0);
    const [tankGames, setTankGames] = useState(0);
    const [dpsGames, setDpsGames] = useState(0);
    const [supportGames, setSupportGames] = useState(0);


    const [damageDone, setDamageDone] = useState(0);
    const [healingDone, setHealingDone] = useState(0);


    useEffect(() => {
        const api = new API();


        async function getUserData() {
            // api call for createUser
            let new_user_id = String(user).replace('#', '-');

            const ranks = await api.getUserRanks(new_user_id);

            const stats = await api.getUserStats(new_user_id);

            setTankRank(ranks.user.tank_rank);
            setDpsRank(ranks.user.dps_rank);
            setSupportRank(ranks.user.support_rank);
            setTankWins(stats.user.tank_wins);
            setDpsWins(stats.user.dps_wins);
            setSupportWins(stats.user.support_wins);
            setTankGames(stats.user.tank_games);
            setDpsGames(stats.user.dps_games);
            setSupportGames(stats.user.support_games);

            setDamageDone(stats.user.damage_done);
            setHealingDone(stats.user.healing_done);

        }

        getUserData();

    }, [tankRank, dpsRank, supportRank]);


    return (
        <Fragment>
            <div style={{textAlign:'center'}}>
                <Typography variant={'h3'} marginBottom={'15px'}>{String(user).split('-')[0]}'s Profile</Typography>

                <Box my={5}>
                    <Box style={{width:'32%', float:'left', padding:'2px', margin:'3px',
                        backgroundColor: '#0080FF', borderRadius: '20px', boxShadow: '5px 5px 20px 0 rgba(0, 128, 255,5)'}}>
                        <Typography variant={'h5'}>TANK</Typography>
                        <Typography variant={'h6'}>Rank - {tankRank}</Typography>
                        <Typography variant={'h6'}>Winrate - {tankWins / tankGames ? ((tankWins / tankGames) * 100).toFixed(2) : 0}%</Typography>
                    </Box>
                    <Box style={{width:'32%', float:'left', padding:'2px', margin:'3px',
                        backgroundColor: '#FF8C00', borderRadius: '20px', boxShadow: '5px 5px 20px 0 rgba(255, 102, 0,5)'}}>
                        <Typography variant={'h5'}>DPS</Typography>
                        <Typography variant={'h6'}>Rank - {dpsRank}</Typography>
                        <Typography variant={'h6'}>Winrate - {dpsWins / dpsGames ? ((dpsWins / dpsGames) * 100).toFixed(2) : 0}%</Typography>
                    </Box>
                    <Box style={{width:'32%', float:'left', padding:'2px', margin:'3px',
                        backgroundColor: '#FF4136', borderRadius: '25px', boxShadow: '5px 5px 20px 0 rgba(255, 65, 54,5)'}}>
                        <Typography variant={'h5'}>SUPPORT</Typography>
                        <Typography variant={'h6'}>Rank - {supportRank}</Typography>
                        <Typography variant={'h6'}>Winrate - {supportWins / supportGames ? ((supportWins / supportGames) * 100).toFixed(2) : 0}%</Typography>
                    </Box>
                </Box>


                <Box style={{marginTop: '200px'}}>
                    <Box style={{width:'48%', float:'left', padding:'2px', margin:'3px',
                        backgroundColor: 'lightgrey', borderRadius: '25px', boxShadow: '5px 5px 20px 0 rgba(0, 0, 0,5)'}}>
                        <Typography variant={'h5'}>Average Damage Per Game (Tank & DPS)</Typography>
                        <Typography variant={'h6'}>{damageDone / (tankGames + dpsGames) ? (damageDone / (tankGames + dpsGames)).toFixed(2) : 0}</Typography>
                    </Box>
                    <Box style={{width:'48%', float:'left', padding:'2px', margin:'3px',
                        backgroundColor: 'lightgrey', borderRadius: '25px', boxShadow: '5px 5px 20px 0 rgba(0, 0, 0,5)'}}>
                        <Typography variant={'h5'}>Average Healing Per Game (Support)</Typography>
                        <Typography variant={'h6'}>{healingDone / (supportGames) ? (healingDone / (supportGames)).toFixed(2) : 0}</Typography>
                    </Box>
                </Box>


            </div>
        </Fragment>
    )
}



const presentationComponents = (props) => {
    const {user, handleSelectedItem, setInQueue, currentQueue, setCurrentQueue, team1, team2, setTeam1, setTeam2, lobbyAvg, setLobbyAvg}=props;
    return [
        {
            title: 'ChooseRole',
            component: <ChooseRole handleSelectedItem={handleSelectedItem} setInQueue={setInQueue}
                                   user={user} setCurrentQueue={setCurrentQueue}/>
        },
        {
            title: 'InQueue',
            component: <InQueueScreen user={user} currentQueue={currentQueue}
                                      handleSelectedItem={handleSelectedItem}
                                      setTeam1={setTeam1} setTeam2={setTeam2}
                                      setLobbyAvg={setLobbyAvg}/>
        },
        {
            title: 'Lobby',
            component: <LobbyScreen team1={team1} team2={team2} setTeam1={setTeam1}
                                    setTeam2={setTeam2} lobbyAvg={lobbyAvg} setLobbyAvg={setLobbyAvg}/>
        },
        {
            title: 'Profile',
            component: <UserProfile user={user}/>
        }
    ];
};



const findSelectedComponent = (props) => {
    const {selectedItem, user, handleSelectedItem, setInQueue, currentQueue, setCurrentQueue, team1, team2, setTeam1, setTeam2, lobbyAvg, setLobbyAvg} = props;
    const component = [...presentationComponents({user, handleSelectedItem, setInQueue, currentQueue, setCurrentQueue, team1, team2, setTeam1, setTeam2, lobbyAvg, setLobbyAvg})].filter(comp => comp.title === selectedItem);
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
    const [currentQueue, setCurrentQueue] = useState('none');
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [lobbyAvg, setLobbyAvg] = useState(0);

    // console.log('in MainDrawer');

    const handleSelectedItem = (title) => {
        setSelectedItem(title)
        if (title === 'ChooseRole' || title === 'Profile'){
            setInQueue(false);
            setCurrentQueue('none');
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar title={title} inQueue={inQueue} handleSelectedItem={handleSelectedItem} user={user} logoutAction={logoutAction} />
            <Main sx={{marginLeft:'0px'}}>
                <DrawerHeader />
                {findSelectedComponent({selectedItem, user, handleSelectedItem, setInQueue, currentQueue, setCurrentQueue, team1, team2, setTeam1, setTeam2, lobbyAvg, setLobbyAvg}).component}
            </Main>
        </Box>
    );
}