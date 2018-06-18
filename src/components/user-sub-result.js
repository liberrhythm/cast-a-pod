import React, { Component } from "react";
import styles from './user-sub-result.module.css'
import { Button, Modal } from 'react-bootstrap'

class UserSubResult extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            description: this.props.result.description,
            title: this.props.result[0].podcast,
            ep1: this.props.result[1],
            ep2: this.props.result[2],
            diff: this.props.diff,
            number: this.props.number + 1
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div className={styles.card}>
                <h3>{this.state.number}</h3>
                <h4>podcast title: {this.state.title}</h4>
                <h5>days between episodes: {this.state.diff}</h5>
                <Button bsStyle="default" onClick={this.handleShow}>show latest episodes</Button>

                <Modal style={{ margin: '0 auto' }} show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={styles.ep}>
                            <h4>{this.state.ep1.title}</h4>
                            <h5>{this.state.ep1.pubDate}</h5>
                            <a href={this.state.ep1.link}>episode link</a>
                        </div>
                        <div className={styles.ep}>
                            <h4>{this.state.ep2.title}</h4>
                            <h5>{this.state.ep2.pubDate}</h5>
                            <a href={this.state.ep2.link}>episode link</a>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default UserSubResult