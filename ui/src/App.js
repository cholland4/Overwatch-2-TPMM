import './App.css';
import MainDrawer from './menu/MainDrawer';

function App({user, logoutAction}) {
    const mainPageTitle = "TPMM";
    return (
        <MainDrawer title={mainPageTitle}
                    user={user.user_id}
                    logoutAction={logoutAction}/>
    )
}

export default App;
