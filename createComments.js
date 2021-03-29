import React from 'react';

export default class CreateComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            newComment: {
                movieName: this.props.movieName,
                name: '',
                review: '',
                stars: 0
            }
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({...this.state, comments:[]})
    }
    returnComments() {
        return this.state.comments;
    }
    handleName(name) {
        console.log(name);
        this.setState({
            ...this.state,
            newComment: {
                name: name,
                review: this.state.newComment.review,
                stars: this.state.newComment.stars
            }
        });
    }
    handleReview(review) {
        this.setState({
            ...this.state,
            newComment: {
                name: this.state.newComment.name,
                review: review,
                stars: this.state.newComment.stars
            }
        })
    }
    handleStars(stars) {
        this.setState({
            ...this.state,
            newComment: {
                name: this.state.newComment.name,
                review: this.state.newComment.review,
                stars: stars
            }
        })
    }
    handleFormSubmit(e) { 
        let newComment = this.state.newComment;
        let commentData = JSON.stringify({
            "movieName": this.props.movieName,
            "stars": newComment.stars,
            "name": newComment.name,
            "review": newComment.review
        });
        console.log(commentData)
        let myHeaders = new Headers();
        let apiOptions_CreateComment = {
            method: 'POST',
            headers: myHeaders,
            body: commentData
        };
            myHeaders.append("Content-Type", "application/json");
            fetch("https://moviereviewlist.herokuapp.com/api/comments", apiOptions_CreateComment)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };
    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="name" onChange={(e) => this.handleName(e.target.value)} className="form-control" id="nameSection" placeholder="Enter Name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="starSection">Rating</label>
                        <select onChange={(e) => this.handleStars(e.target.value)} className="form-control" id="starSection">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                </div>
                <div className="form-group">
                    <label htmlFor="comments">Review</label>
                    <textarea onChange={(e) => this.handleReview(e.target.value)} className="form-control" id="commentSection"></textarea>
                </div>
                <button onClick = {(e) => this.handleFormSubmit(e)} className = "btn btn-primary">Submit</button>
            </form>
        )
    }

}
