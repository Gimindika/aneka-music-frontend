import React from 'react';
import '../style/Login.css';

import { connect } from 'react-redux';
import { login } from '../public/redux/actions/user';

class Login extends React.Component{
    state={
        email:'',
        password:''
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]:[event.target.value]})
    }

    login = async (event) => {
        event.preventDefault();
        await this.setState({
            email:this.state.email[0],
            password:this.state.password[0]
        })
        
        await this.props.dispatch(login(this.state))
        // window.location.href = '/';
        this.props.history.push('/');   
    }

    render(){
        return(
            <div> 
                <form className='form-login'>
                    <h1 className='form-title'>Aneka Music</h1>
                    <div>
                        <p className='label-login'>Email : </p>
                        <input className='input-login' name='email' onChange={this.inputHandler}/>
                    </div>
                    <div>
                        <p className='label-login'>Password : </p>
                        <input className='input-login' name='password' onChange={this.inputHandler}/>
                    </div>
                    <button className='submit-login' onClick={this.login}>Login</button>
                </form>
            </div>
        )
    }
}

export default connect()(Login);