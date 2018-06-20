import React, { Component } from "react"
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { navigateTo } from "gatsby-link"

const axios = require('axios');
const baseUrl = "https://www.gpodder.net";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', loggedIn: false };
        this.login = this.login.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        this.login();
        event.preventDefault();
    }

    // login function does not pass OPTIONS and throws CORS errors
    login() {
        axios.post(baseUrl + "/api/2/auth/" + this.state.username + "/login.json", {}, {
            withCredentials: true,
            auth: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    navigateTo({
                        pathname: '/search',
                        state: {
                            username: this.state.username
                        }
                    });
                }
            })
            .catch((error) => {
                alert("Wrong credentials. Please try again.")
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form inline onSubmit={(e) => this.handleSubmit(e)}>
                        <FormGroup controlId="formInlineUsername">
                            <FormControl name="username" type="text" placeholder="username" onChange={this.handleChange} />
                        </FormGroup>{' '}
                        <FormGroup controlId="formInlinePassword">
                            <FormControl name="password" type="password" placeholder="password" onChange={this.handleChange} />
                        </FormGroup>{' '}
                        <Button type="submit">login</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login
