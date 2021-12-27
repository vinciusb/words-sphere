import React from 'react';
import ElSphere from '../ElSphere/ElSphere';
import './App.scss';
// import { Container } from './styles';

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="workspace">
                <ElSphere></ElSphere>
            </div>
        </div>
    );
};

export default App;
