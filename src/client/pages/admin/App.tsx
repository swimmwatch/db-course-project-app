import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Login from "./Login";

class App extends React.Component {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    render() {
        const App = () => (
            <div>
                <Container className="p-3">
                    <Switch>
                        <Route path='/admin/login' component={Login}/>
                    </Switch>
                </Container>
            </div>
        );

        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}

export default App;