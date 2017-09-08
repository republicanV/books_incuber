import React from 'react';
import Header from '../components/header/Header';
import LeftBar from './../components/leftbar/Leftbar';

export default (Component) => {
    class MainLayout extends Component {

        render() {
            return (
                <div>
                    <Header/>
                    <LeftBar/>
                    <Component {...this.props} />
                </div>
            )
        }
    }

    MainLayout.displayName = `${MainLayout.displayName || MainLayout.name || 'MainLayout'}(${Component.displayName || Component.name || 'Component'})`;

    return MainLayout;
}