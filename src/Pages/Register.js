import React from 'react';
import { connect } from 'react-redux';
import {register} from '../public/redux/actions/user';
import Swal from 'sweetalert2';

class Register extends React.Component{
    state={
        name:'',
        email:'',
        password:'',
        register:{}
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]:[event.target.value][0]})
    }

    registerSubmit = async () => {
        const data = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }
        // console.log(data);
        
        await this.props.dispatch(register(data));
        this.setState({register:this.props.register})
        console.log(this.props.register);
        
        if(this.state.register.error){
            Swal.fire({
                position: 'center',
                type: 'error',
                title: this.state.register.error,
                showConfirmButton: false,
                timer: 800
            })
            setInterval(() => {
                window.location.reload();
            }, 800);
        } else {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Register success.',
                showConfirmButton: false,
                timer: 800
            })
            setInterval(() => {
                window.location.href = '/';
            }, 800);
        }
    }

    render(){
         return(
            <div style={{marginTop:'300px', marginLeft:'500px', width:'1200px'}}>
                <h1 style={{marginBottom:'20px'}}>Register</h1>
                <table>
                    <tr>
                        <td style={{fontSize:'25px'}}>Name : </td>
                        <td><input name='name' style={{fontSize:'25px', borderRadius:'5px'}} onChange={this.inputHandler}></input></td>
                    </tr>
                    <tr>
                        <td>Email : </td>
                        <td><input name='email' style={{fontSize:'25px', borderRadius:'5px'}} onChange={this.inputHandler}></input></td>
                    </tr>
                    <tr>
                        <td>Password : </td>
                        <td><input name='password' style={{fontSize:'25px', borderRadius:'5px'}} onChange={this.inputHandler}></input></td>
                    </tr>
                    <tr>
                        <td style={{left:'50%', paddingTop:'20px'}}><button style={{width:'150px', height:'50px',fontSize:'20px',borderRadius:'5px', marginTop:'20px'}} onClick={this.registerSubmit}>Register</button></td>
                    </tr>
                </table>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        register: state.user.register
    }
}

export default connect(mapStateToProps)(Register);