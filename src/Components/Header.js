import React from 'react';
import '../style/Header.css';
import '../style/Login.css';
import { connect } from 'react-redux';
import { setDisplay } from '../public/redux/actions/categories';
import { login } from '../public/redux/actions/user';
import { Link, withRouter } from "react-router-dom";

import { Button, Modal, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Swal from 'sweetalert2';

class Header extends React.Component{
    state={
        modal: false,

        email:'',
        password:'',

        user:{
            id:0,
            name:'',
            email:'',
            level:0
        },

        displayCategories:''
    }

    componentDidMount = async () => {
        if(localStorage.getItem('userID')){
            await this.setState({
                    user:{
                        id:localStorage.getItem('userID'),
                        name:localStorage.getItem('userName'),
                        email:localStorage.getItem('userEmail'),
                        level:localStorage.getItem('userLevel'),
                    },
            })
        }   
    }

    home = () => {
        this.props.dispatch(setDisplay(true))
        this.setState({displayCategories:this.props.displayCategories})
        window.location.href = `/`;
        // this.props.history.push('/');
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]:[event.target.value]})
    }

    keyPressHandler = (key) => {
        if(key.charCode == 13 ){ //eslint-disable-line
            this.login();
        }
    }

    login = async () => {
        // event.preventDefault();
      
        await this.setState({
            email:this.state.email[0],
            password:this.state.password[0]
        })
        
        await this.props.dispatch(login(this.state))
      
        if(this.props.user == null){
            Swal.fire({
                position: 'center',
                type: 'error',
                title: 'Wrong email or password!',
                showConfirmButton: false,
                timer: 800
            })
            this.setState({modal:false})
        } else {
            localStorage.setItem('userName',this.props.user.name)
            localStorage.setItem('userID', this.props.user.id)
            localStorage.setItem('userEmail', this.props.user.email)
            localStorage.setItem('userLevel', this.props.user.level)
            localStorage.setItem('token', this.props.token)
            this.setState({user:this.props.user})
            this.setState({modal:false})
            
            const title = 'Welcome ' + this.state.user.name;

            Swal.fire({
                position: 'center',
                type: 'success',
                title: title,
                showConfirmButton: false,
                timer: 800
            })
            setInterval(() => {
                window.location.href = '/'; 
                // this.props.history.push('/');
            }, 800);
            
        }   
    }

    logout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userID');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userLevel');
        localStorage.removeItem('token');

        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Logged Out successfully.\n See you soon.',
            showConfirmButton: false,
            timer: 800
        })
        setInterval(() => {
            window.location.href = '/';
        }, 800);
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render(){
        return(
            <div className='header'> 
                <img className='logo' alt='' onClick={this.home} />
                                        
                {this.state.user.id != 0 ?( // eslint-disable-line
                <div>
                    <Link to={`/wishlist/${this.state.user.id}`}>
                        <img className='wishlist' alt=''/>
                    </Link>
                
                    <Link to={`/cart/${this.state.user.id}`}>
                        <img className='cart' alt=''/>
                    </Link>
                </div>
                ):null}
                
                {/* //modal/////////////////////////////////////////////////////////////////////////////////////////////// */}
                <div>
                    {this.state.user.id == 0 ?(         // eslint-disable-line
                        <div>
                        <Link to={'/register'}><Button className='register-button'>Register</Button></Link>
                        <Button className='login-button' onClick={this.toggle}>Login</Button>
                        </div>
                    ):
                    (
                    <div>
                        <p className='user-name'>Welcome {this.state.user.name}</p>
                        <Button className='login-button' onClick={this.logout}>Logout</Button>
                    </div>
                    )
                }

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal'>

                    <ModalBody className='modal-body'>

                    <Form className='form-login'>
                        <FormGroup>
                            <div>
                                <Label for="email" className='label-login'>Email : </Label>
                            </div>
                            <Input type="text" name="email" id="email" className='input-login' onChange={this.inputHandler} placeholder='email'/>
                        </FormGroup>

                      

                        <FormGroup>
                            <div>
                                <Label for="password" className='label-login'>Password : </Label>
                            </div>
                            <Input type="password" name="password" id="password" className='input-login' onChange={this.inputHandler} placeholder='password' onKeyPress={(event) => {this.keyPressHandler(event)}}/>
                        </FormGroup>

                        <Button className='cancel-button' onClick={this.toggle}>Cancel</Button>
                        <Button type="button" className='submit-login' onClick={this.login}>Login</Button>
                    </Form>

                    </ModalBody>        

                    </Modal>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        displayCategories: state.categories.displayCategories,
        user: state.user.user,
        token: state.user.token,
        loginstatus: state.user
    }
}

export default withRouter(connect(mapStateToProps)(Header));