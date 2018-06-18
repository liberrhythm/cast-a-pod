import React, { Component } from "react"
import styles from './advanced-search-result.module.css'
import { Button, Modal } from 'react-bootstrap'

function SearchList(props) {
    const results = props.results;

    let resultsList = results.map((item, index) =>
        <div className={styles.podcast}>
            <h4>{item.title}</h4>
            <Button bsStyle="link">
                <a href={item.url}>link to podcast</a>
            </Button>
        </div>
    );
    
    return (
        <div id="resultslist" style={{height: '30vh', overflowY: 'auto'}}>
            <ul>{resultsList}</ul>
        </div>
    );
}

class AdvSearchResult extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            word: this.props.word,
            result: this.props.result
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
                <h4>{this.state.word}</h4>
                <Button bsStyle="default" onClick={this.handleShow}>show podcasts</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.word}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SearchList results={this.state.result}></SearchList>
                    </Modal.Body>
                </Modal>
            </div>        
        );
    }
}

export default AdvSearchResult
