import {Fragment, useEffect, useState} from "react";
import {Button, Grid, Paper, Stack, Typography} from "@mui/material";
import tankIcon from "../Icons/TankIcon.png";
import damageIcon from "../Icons/DamageIcon.png";
import supportIcon from "../Icons/SupportIcon.png";
import API from "../API_Interface/API_Interface";
import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import Divider from "@mui/material/Divider";

// function ChooseRole(props) {
//     const {handleSelectedItem} = props;
//     return (
//         <Fragment>
//             <div style={{textAlign:'center'}}>
//                 <Button style={{position:'absolute', right:'15px'}} variant="contained">Profile</Button>
//                 <Typography variant={'h3'}>Choose A Role</Typography>
//                 <Grid container
//                       spacing={12}
//                       justifyContent="center"
//                       direction="row"
//                       alignItems="stretch"
//                       paddingTop={'50px'}>
//                     <Grid item xs={3}>
//                         <button>
//                             <Typography variant="h3">Tank</Typography>
//                             <img src={tankIcon}/>
//                         </button>
//                     </Grid>
//                     <Grid item xs={3}>
//                         <button>
//                             <Typography variant="h3">Damage</Typography>
//                             <img src={damageIcon}/>
//                         </button>
//                     </Grid>
//                     <Grid item xs={3}>
//                         <button>
//                             <Typography variant="h3">Support</Typography>
//                             <img src={supportIcon}/>
//                         </button>
//                     </Grid>
//                 </Grid>
//             </div>
//         </Fragment>
//     );
// }
//
// function InQueueScreen(props) {
//     // const {numTanks, numDamage, numSupport} = props;
//     const numTanks = 0;
//     const numDamage = 0;
//     const numSupport = 0;
//     return (
//         <Fragment>
//             <div style={{textAlign:'center'}}>
//                 <Button style={{position:'absolute', right:'15px'}} variant="contained">Leave</Button>
//                 <Typography variant={'h3'}>Queue</Typography>
//                 <Grid container
//                       spacing={12}
//                       justifyContent="center"
//                       direction="row"
//                       alignItems="stretch"
//                       paddingTop={'50px'}>
//                     <Grid item xs={3}>
//                         <Typography variant="h3">Tank</Typography>
//                         <img src={tankIcon}/>
//                         <Typography variant="h3">{numTanks}/2</Typography>
//                     </Grid>
//                     <Grid item xs={3}>
//                         <Typography variant="h3">Damage</Typography>
//                         <img src={damageIcon}/>
//                         <Typography variant="h3">{numDamage}/4</Typography>
//                     </Grid>
//                     <Grid item xs={3}>
//                         <Typography variant="h3">Support</Typography>
//                         <img src={supportIcon}/>
//                         <Typography variant="h3">{numSupport}/4</Typography>
//                     </Grid>
//                 </Grid>
//             </div>
//         </Fragment>
//     );
// }
//
// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette
//         .mode === "dark" ? "#1A2027" : "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
// }));
//
// function LobbyScreen(props) {
//     // const {team1, team2, lobby_avg} = props;
//     const team1 = ['player 1', 'player 2', 'player 3', 'player 4', 'player 5'];
//     const team2 = ['player 6', 'player 7', 'player 8', 'player 9', 'player 10'];
//     // team1 and team2 will be an array of objects that contain at LEAST usernames
//     // needs to come from props
//     const lobby_avg = 2450;
//     // lobby_avg is an integer between 0 and 5000, that is the average
//     // calue of all users in the match
//     return (
//         <Fragment>
//             <div style={{textAlign:'center'}}>
//                 <Typography variant={'h3'}>Queue</Typography>
//                 <Box style={{backgroundColor:'lightgray',
//                     width:'39%', float:'left', padding:'2px', margin:'3px'}}>
//                     <Typography variant={'h5'}>Team 1</Typography>
//                     <Stack divider={<Divider orientation="horizontal" flexItem />}>
//                         {
//                             team1.map((element, idx) =>
//                                 <Item key={idx}>
//                                     {element}
//                                 </Item>
//                             )
//                         }
//                     </Stack>
//                 </Box>
//                 <Box style={{backgroundColor:'lightgray',
//                     width:'19%', float:'left', padding:'2px', margin:'3px'}}>
//                     <Typography variant={'h5'}>Average</Typography>
//                     <Stack
//                         alignContent={'center'}
//                         justifyItems={'center'}
//                         spacing={1}
//                         height={'100%'}>
//                         <Item>
//                             {lobby_avg}
//                         </Item>
//                     </Stack>
//                 </Box>
//                 <Box style={{backgroundColor:'lightgray',
//                     width:'39%', float:'left', padding:'2px', margin:'3px'}}>
//                     <Typography variant={'h5'}>Team 2</Typography>
//                     <Stack divider={<Divider orientation="horizontal" flexItem />}>
//                         {
//                             team2.map((element, idx) =>
//                                 <Item key={idx}>
//                                     {element}
//                                 </Item>
//                             )
//                         }
//                     </Stack>
//                 </Box>
//                 <Button variant="contained">Report Winner</Button>
//             </div>
//         </Fragment>
//     );
// }
//
// function UserProfile(props) {
//     const {user} = props;
//
//     const [tankRank, setTankRank] = useState(2450);
//     const [dpsRank, setDpsRank] = useState(2450);
//     const [supportRank, setSupportRank] = useState(2450);
//
//
//     useEffect(() => {
//     const api = new API();
//
//
//     async function getUserData() {
//         // api call for createUser
//         let new_user_id = String(user).replace('#', '-');
//
//         const ranks = await api.getUserRanks(new_user_id);
//
//         setTankRank(ranks.user.tank_rank);
//         setDpsRank(ranks.user.dps_rank);
//         setSupportRank(ranks.user.support_rank);
//     }
//
//     getUserData();
//
//     }, [tankRank, dpsRank, supportRank]);
//
//
//     return (
//         <Fragment>
//             <div style={{textAlign:'center'}}>
//                 <Button style={{position:'absolute', right:'15px'}} variant="contained">Queue</Button>
//                 <Typography variant={'h3'} marginBottom={'15px'}>{String(user).split('-')[0]}'s Profile</Typography>
//
//                 <Box>
//                     <Box style={{backgroundColor:'lightgray',
//                         width:'32%', float:'left', padding:'2px', margin:'3px'}}>
//                         <Typography variant={'h5'}>TANK</Typography>
//                         <Typography variant={'h6'}>{tankRank}</Typography>
//                     </Box>
//                     <Box style={{backgroundColor:'lightgray',
//                         width:'32%', float:'left', padding:'2px', margin:'3px'}}>
//                         <Typography variant={'h5'}>DPS</Typography>
//                         <Typography variant={'h6'}>{dpsRank}</Typography>
//                     </Box>
//                     <Box style={{backgroundColor:'lightgray',
//                         width:'32%', float:'left', padding:'2px', margin:'3px'}}>
//                         <Typography variant={'h5'}>SUPPORT</Typography>
//                         <Typography variant={'h6'}>{supportRank}</Typography>
//                     </Box>
//                 </Box>
//
//
//                 <Box>
//                     <Box style={{backgroundColor:'lightgray',
//                         width:'48%', float:'left', padding:'2px', margin:'3px'}}>
//                         <Typography variant={'h5'}>Damage Per 10 Min</Typography>
//                         <Typography variant={'h6'}>TODO</Typography>
//                     </Box>
//                     <Box style={{backgroundColor:'lightgray',
//                         width:'48%', float:'left', padding:'2px', margin:'3px'}}>
//                         <Typography variant={'h5'}>Healing Per 10 Min</Typography>
//                         <Typography variant={'h6'}>TODO</Typography>
//                     </Box>
//                 </Box>
//
//
//             </div>
//         </Fragment>
//     )
// }
//
// const presentationComponents = (props) => {
//     const {user}=props;
//     return [
//         {
//             title: 'ChooseRole',
//             component: <ChooseRole />
//         },
//         {
//             title: 'InQueue',
//             component: <InQueueScreen/>
//         },
//         {
//             title: 'Lobby',
//             component: <LobbyScreen/>
//         },
//         {
//             title: 'Profile',
//             component: <UserProfile user={user}/>
//         }
//     ];
// };


const containerComponents = (props) => {
    return [
        {
            title: 'Activities',
            component: <Fragment />
        }
    ];
};

// export {presentationComponents, containerComponents};
