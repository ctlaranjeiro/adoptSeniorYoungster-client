import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';


const Div = styled.div`
    background-color: #f1f1f1;
    width: 100%;
    padding: 20px 30px;
    border-radius: 20px;
`;

const H5 = styled.h5`
    font-size: 1.1em;
    font-weight: bold;
    text-align: left;
`;

const Hr = styled.hr`
    width: 100%;
    margin: 10px 0;
`;

class EditEmergencyContact extends Component{    
    state = {
        emergFirstName: this.props.emergFirstName,
        emergLastName: this.props.emergLastName,
        emergEmail: this.props.emergEmail,
        emergAddress: this.props.emergAddress,
        emergPhoneNumber: this.props.emergPhoneNumber,
        success: false
    }

    handleChange = (event) => {  
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { params } = this.props.match;
        const { 
            emergFirstName, 
            emergLastName, 
            emergEmail, 
            emergAddress, 
            emergPhoneNumber 
        } = this.state;

        axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/emergContact`, {
            emergFirstName,
            emergLastName,
            emergEmail,
            emergAddress,
            emergPhoneNumber
        }, { withCredentials: true})
            .then(() => {
                this.props.updateState();

                this.setState({
                    success: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            success: false
                        })
                    }, 1000)
                });

                // this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
            })
            .catch(err => {
                console.log('Error while updating emergContact on DB', err);
            });
    }

    render(){
        return(
            <Div>
                <H5>Emergency Contact</H5>
                <Hr />
                <Form onSubmit={this.handleFormSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEmergFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="emergFirstName" value={this.state.emergFirstName} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicEmergLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="emergLastName" value={this.state.emergLastName} onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEmergEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="emergEmail" value={this.state.emergEmail} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formBasicEmergPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" name="emergPhoneNumber" value={this.state.emergPhoneNumber} onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formBasicEmergAddress">
                        <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="emergAddress" value={this.state.emergAddress} onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>
                {!this.state.success &&
                        <Button variant="outline-primary" type="submit">
                            Update emergency contact
                        </Button>
                    }
                    {this.state.success &&
                        <Button variant="success" disabled>
                            Success!
                        </Button>
                    }
            </Form>
            </Div>
        )        
    }
}

export default EditEmergencyContact;