import tankIcon from './Icons/TankIcon.png';
import damageIcon from './Icons/DamageIcon.png';
import supportIcon from './Icons/SupportIcon.png';
import './App.css';
import {Button, Grid, Typography} from "@mui/material";
import {Fragment} from "react";

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
    return (
        <Fragment>
            <div style={{textAlign:'center'}}>
                <Typography variant={'h3'}>Queue</Typography>
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

function App() {
  return (
      <Fragment>
          <UserProfile/>
      </Fragment>
  );
}

export default App;
