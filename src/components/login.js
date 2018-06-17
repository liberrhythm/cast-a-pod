import React, { Component } from "react";
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'

const axios = require('axios');
const baseUrl = "https://www.gpodder.net";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
        this.login = this.login.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    }

    handleSubmit(event) {
        this.login();
        event.preventDefault();
    }

    login() {
        axios.post(baseUrl + "/api/2/auth/" + this.state.username + "/login.json", {
            /*
            withCredentials: true,
            auth: {
                username: this.state.username,
                password: this.state.password
            },
            headers: {
                //"Accept" : application/json,
                //'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Headers" : "Content-Type, Authorization",
                
                "Access-Control-Allow-Origin": 'http://localhost:8000',
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT"
            },
            */
            auth: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
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
