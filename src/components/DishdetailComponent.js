import React, {Component, useState} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb, BreadcrumbItem, Button, 
    Modal, ModalHeader, ModalBody, FormGroup, Input, Label,
    } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
    
    function RenderDish({dish}){
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>    
                    </CardBody>      
                </Card>
            </div>
        );
    }
    
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentComponent extends React.Component{

        constructor(props){
            super(props);
            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
       
        render(){
            return(
                <React.Fragment>
                    <Button outline color="secondary" onClick={this.toggleModal}>
                        <i className="fa fa-pencil"/>  
                        Submit Comment 
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={this.toggleModal}>
                                <FormGroup>
                                    <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" id="rating" name="rating" 
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" id="author" name="author" 
                                        placeholder="Name" 
                                        className="form-control"
                                        validators={{
                                            required, minLength:minLength(3), maxLength:maxLength(15)
                                        }}
                                        />
                                        <Errors
                                        className="text-danger"
                                        model = ".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" id="comment" name="comment" 
                                        className="form-control" rows={6}/>
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            )
        }
    }


    function RenderComments({allComments}){
        
          if(allComments!=null){
            const comments = allComments.map((comment)=>{
                return(
                    <div className="col-12 col-md-5 m-1">
                        <ul className="list-unstyled">
                            <li>{comment.comment}</li>
                            <li>--{comment.author}, 
                            &nbsp;
                            {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit'
                            }).format(new Date(Date.parse(comment.date)))}
                            </li>     
                        </ul>
                    
                    </div>
                )
            });

            function handleClick(e) {
                e.preventDefault();
                console.log('The link was clicked.');
            }
           
            return(
                <div>
                    <h4>Comments</h4>
                    {comments}
                    <CommentComponent/>
                </div>
            );

        }

        else{
            return(
                <div></div>
            );
        }

    }

  
    const DishDetail = (props) => {
        if (props.dish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to = '/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                            <RenderDish dish={props.dish}/>
                            <RenderComments allComments = {props.comments}/>
                        
                    </div>
                    
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

export default DishDetail;