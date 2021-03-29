import React from 'react';

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.name = this.props.name;
        this.stars = this.props.stars;
        this.review = this.props.review;
        this.id = this.props.id;
        this.deleteComment = this.deleteComment.bind(this);
    }
    deleteComment() {
        const ENDPOINT = 'https://moviereviewlist.herokuapp.com/api/comments';
        fetch(ENDPOINT + "/" + this.props.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'        
            }
        })
        .then(res => console.log(res))
    }
    componentDidMount(){
        console.log("RAN!")
    }
    render() {
        return <div className = "card-body">
            <div key={this.id}>
                <h2>{this.name}</h2>
                <span>{this.stars}</span>
                <br></br>
                <p>{this.review}</p> 
            </div>
            <button onClick={this.deleteComment} className="btn btn-warning">Delete</button>
        </div>
    };
}