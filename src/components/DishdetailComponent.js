import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    renderDish(dish){
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>    
                </CardBody>      
            </Card>
        );
    }

    renderComments(allComments){
        if(allComments!=null){
            const comments = allComments.map((comment)=>{
                return(
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
                )
            });

            return(
                <div>
                    <h4>Comments</h4>
                    {comments}
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    render(){
        const dish = this.props.dish
        if (dish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(dish.comments)}
                        </div>
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
}

export default DishDetail;