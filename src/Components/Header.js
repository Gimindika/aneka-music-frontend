import React from 'react';
import '../style/Header.css';
import '../style/Login.css';
import { connect } from 'react-redux';
import { setDisplay } from '../public/redux/actions/categories';
import { login } from '../public/redux/actions/user';
import { Link, withRouter } from "react-router-dom";

import { Button, Modal, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class Header extends React.Component{
    state={
        modal: false,

        email:'',
        password:'',

        user:{
            id:0
        },
        displayCategories:''
    }

    // componentDidMount = async () => {
    //     await this.setState({
    //         user: this.props.user
    //     })
    // }

    home = () => {
        this.props.dispatch(setDisplay(true))
        this.setState({displayCategories:this.props.displayCategories})
        // window.location.href = `/`;
        this.props.history.push('/');
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]:[event.target.value]})
    }

    login = async () => {
        // event.preventDefault();
      
        await this.setState({
            email:this.state.email[0],
            password:this.state.password[0]
        })
        
        await this.props.dispatch(login(this.state))
        this.setState({user:this.props.user})
        // window.location.href = '/';
        this.setState({modal:false})
        this.props.history.push('/');   
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

                <Link to={`/wishlist/${this.state.user.id}`}>
                    <img className='wishlist' alt=''/>
                </Link>
               
                <Link to={`/cart/${this.state.user.id}`}>
                    <img className='cart' alt=''/>
                </Link>

                
                {/* //modal/////////////////////////////////////////////////////////////////////////////////////////////// */}
                <div>
                    {/* <Button className='login-button' onClick={this.toggle}>Login</Button> */}
                    {this.state.user.id == 0 ?(
                        <Button className='login-button' onClick={this.toggle}>Login</Button>
                    ):
                    (
                    <div>
                        {console.log(this.state.user)}
                        <p className='user-name'>{this.state.user.name}</p>
                    </div>
                    )
                }

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal'>

                    <h1 className='modal-header'>LOGIN</h1>

                    <ModalBody className='modal-body'>

                    <Form className='form'>
                        <FormGroup>
                            <Label for="email" className='label-login'>Product Name</Label>
                            <Input type="text" name="email" id="email" className='input-login' onChange={this.inputHandler} placeholder='email'/>
                        </FormGroup>

                      

                        <FormGroup>
                            <Label for="password" className='label-login'>Image URL</Label>
                            <Input type="password" name="password" id="password" className='input-login' onChange={this.inputHandler} placeholder='password'/>
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
        user: state.user.user
    }
}

export default withRouter(connect(mapStateToProps)(Header));