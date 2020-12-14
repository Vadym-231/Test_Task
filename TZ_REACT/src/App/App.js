import '../CSS/App.css';
import React from 'react';
import configRedux from '../app_config.json'
import Header from "../Header/Header";
import Note from "../RenderNotes/Note";

import 'bootstrap/dist/css/bootstrap.min.css';
import  {Container,Col,Row} from 'react-bootstrap';
import {Link} from "react-router-dom";



class App extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    fetchMainData(store){

        fetch('api/getNotes').then(data=>{
            if(data.status===200){
                return data.json()
            }else {
                return undefined
            }
        }).then(data=>{
            console.log(data)
            if(typeof data!=='undefined'){
                store.dispatch({type:configRedux.Define.AddNotesState,arr:data})
            }
        })
    }
    componentDidMount() {
        const {store} = this.props;
        this.fetchMainData(store);
    }

    render() {
        const {store} =this.props;

        return (
            <>
                <Header/>
            <Container className='text-center'>
                <Link to='/add' >
                <img

                    onMouseOver={event => {
                    event.target.style=" box-shadow: 0px 0px 17px 0px inset gainsboro;"
                    }}


                    onMouseOut={event =>{
                         event.target.style=" box-shadow: 0px 0px 0px 0px inset gainsboro;"
                     }}

                     src='img/addButton.png' className='addButton' alt='add'/>
                </Link>
                    {
                        (typeof store.getState().notes!=='undefined'&&Array.isArray(store.getState().notes)&&store.getState().notes.length>0)?
                            store.getState().notes.map((data,i)=><Note store={store} idEl={data._id} callback={this.fetchMainData} numb={i} title={data.name} content={data.content} imgArr={data.imgData} />):
                        null

                    }

            </Container>
                </>
        );
    }
}

export default App;
