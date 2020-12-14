import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import store_ from "./ReduxFuctory/createFactory";
import App from './App/App';
import AddNote from "./AddNewNotes/Add";
import { Switch,BrowserRouter,  Route } from 'react-router-dom'


window.React=React;
const errorFunc =()=>{
    return (<div>
        <h1>PATH ERROR</h1>
    </div>)
}
const render =()=> {

    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/' exact render={(props)=><App store={store_}  {...props} />}/>
                    <Route path='/add' exact render={(props)=><AddNote store={store_} {...props}/>}/>
                    <Route component= {errorFunc}/>
                </Switch>
            </div>
        </BrowserRouter>,
        document.getElementById('root')
    );
};
store_.subscribe(render);
render();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

