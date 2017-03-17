import React, {Component, PropTypes} from 'react';
import './App.css';
import UserApi from '../api/UserApi';

var divStyle = {
  color: 'white',
  backgroundImage: 'url(./imgs/heading-background.jpg )',
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};

class Login extends Component {
    constructor(props,context) {
      super(props,context);
        this.state={
          username: "",
          user:"",
          error: "",
        }
        this.inLogin = this.inLogin.bind(this)
        
    }

    inLogin(e){
        e.preventDefault();
        let data = {
            username: this.refs.username.value,
            password: this.refs.password.value,
        }
        UserApi.inLogin(data).then((res)=>{
            console.log(res);
            const data = res.data;
            if(data.success){
              this.setState({
                user: res.data.response._id,
                username: data.response.username,
              });
              this.context.router.push('/todo');
              // window.location = data.redirect;
              console.log(data);
              return;
            }else{
              this.setState({
                error: data.response
              });
              console.log(data);
              console.log("Login Failed!");}
            
            
        }).catch((err)=>{
          console.log(err);
        });
       
    }
    
    render(){
    return (
      <div className="counter">
          



          
          <h1 id = "main">LOGIN!</h1>
          <center>{this.state.error}</center>
          <br/> <br/>
          <table>
          <tr><td>
          <label>Username:</label> </td>
           <td><input type="text" placeholder="juandelacruz" ref="username" className ="in2">
          </input></td></tr>

 <tr><td>
          <label>Password:</label> </td>

          <td><input type="password" placeholder="" ref="password" className ="in2"> 
          </input></td></tr>
   </table>
   <br/>
            <center>
          <button className="button" onClick={this.inLogin} value="Login" >Login</button>
          </center>



          
      </div>

    )
  }
}
Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default Login;
