import '../CSS/App.css';
import React from 'react';
import configRedux from '../app_config.json'
import Header from "../Header/Header";



import 'bootstrap/dist/css/bootstrap.min.css';
import  {Container,Form,Col,Button,Alert,Row} from 'react-bootstrap';



class AddNote extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.title = React.createRef();
        this.content = React.createRef();
        this.file = React.createRef();
    }

    render() {
        const {store} =this.props;

        const errorFunction=()=>{
            console.log(this.title.current.value.length,' ',this.content.current.value.length)
            let alert = document.getElementById('alert_form');
            alert.style.display='block';

            this.title.current.style.boxShadow="0px 0px 4px 0px  inset darkred";
            this.title.current.value='';
            this.title.current.placeholder='Please enter 10 to 54 characters'

            this.content.current.style.boxShadow="0px 0px 4px 0px  inset darkred";
            this.content.current.value='';
            this.content.current.placeholder='Please enter 30 to 130 characters'


        }
       const formProcess= (ev)=>{
           console.log(this.title.current.value.length,' ',this.content.current.value.length)
            if(typeof this.title.current.value!=='undefined'&&this.title.current.value.length>10&&this.title.current.value.length<54&&
                typeof this.content.current.value!=='undefined'&&this.content.current.value.length>30&&
                this.content.current.value.length<150) {

                const data = new FormData();

                if(this.file.current.files[0]){
                    if(this.file.current.files[0].type==='image/png'){

                        data.append('file',this.file.current.files[0])

                    }else {

                        errorFunction();
                        return ;
                    }
                }


                data.append('title',this.title.current.value)
                data.append('content',this.content.current.value)


                fetch("/api/add", {
                    mode: 'no-cors',
                    method: "POST",
                    body: data
                }).then(function (res) {
                    if (res.ok) {
                        let goodAlert = document.getElementById('alert_form_success');
                        goodAlert.style.display = 'block';
                    } else if (res.status === 401) {
                        errorFunction()
                    }
                }, function (e) {
                    alert("Error submitting form!");
                });


            }else {
                errorFunction();
            }
        }
        return (
            <>
                <Header/>

                <Container className='text-center'>
                    <Row>
                        <Col>
                    <Alert style={{display:'none'}} id='alert_form' className='mt-3'  variant='danger'>
                        Invalid data
                    </Alert>
                            <Alert style={{display:'none'}} id='alert_form_success' className='mt-3'  variant='success'>
                                Well done note was added?Are you want add more?
                            </Alert>
                        </Col>
                    </Row>
                        <Form className='mt-3 text-center'>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">

                                <Form.Control ref={this.title} placeholder="Content" />
                            </Form.Group>

                            </Form.Row>
                            <Form.Row>
                            <Form.Group className='content_input' as={Col} controlId="exampleForm.ControlTextarea1">

                                <Form.Control ref={this.content} placeholder="Content" as="textarea" style={{height:"20rem"}} />
                            </Form.Group>
                        </Form.Row>
                                <Form.Row>
                        <Form.Group  as={Col}>
                            <Form.File

                                ref={this.file}  id="exampleFormControlFile1" label="Please add imd(png) here" />
                        </Form.Group>
                                </Form.Row>
                    </Form>
                    <Button onClick={event => {formProcess(event)}} variant="light">Add notes</Button>
                </Container>
            </>
        );
    }
}

export default AddNote;
