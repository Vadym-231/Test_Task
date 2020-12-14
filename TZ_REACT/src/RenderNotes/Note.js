import '../CSS/App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  {Card} from 'react-bootstrap';


const eventDelete=(ev,callback,id,store)=>{
    fetch('api/remove/'+id).then(data=>{
        if(data.status===200){
            callback(store);
        }
        else {
            alert('something went wrong! Try again!')
        }
    })
}


const Note =(props)=>{
    const {title,content,imgArr,numb,idEl,callback, store} = props;
    return (
        <Card style={{  height:'31rem' }} className='note'>
            {console.log(imgArr[0],' ',typeof imgArr[0])}
            {(typeof imgArr!=='undefined'&&Array.isArray(imgArr)&&imgArr.length>0&&!/\/undefined$/.test(imgArr[0]))?<Card.Img style={{height:"182px"}} variant="top" src={imgArr[0]} />:null}
            <Card.Body>
                <Card.Title>{title}</Card.Title>

                <Card.Text>
                    {content}<br/>
                    {numb+1}
                </Card.Text>
                <Card.Link onClick={
                    ev=>{
                        eventDelete(ev,callback,idEl,store)
                    }
                } >Remove</Card.Link>

            </Card.Body>
        </Card>
       )
}

export default Note;
