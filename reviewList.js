import React from 'react';
import CreateComments from './createComments';
import Comments from './Comments';


export default class Reviews extends React.Component {
    constructor(props){
        super(props); 
        this.title = this.props.title;
        this.body = this.props.body;
        this.movieName = this.props.movieName;
        this.imageUrl = this.props.imageUrl 
        this.thoughts = this.props.thoughts;
        this.leaveReview = false;       
        this.setLeaveReview = this.setLeaveReview.bind(this);
        this.pullAPI = this.pullAPI.bind(this);
        this.state = {
            movieName: this.props.movieName,
            Comments: []   
        };
    }
    setLeaveReview() {
        this.leaveReview = !this.leaveReview;
        this.setState({...this.state});
    }
    pullAPI() {
            
            // https://moviereviewlist.herokuapp.com/api/comments?movieName=Test
            let myHeaders = new Headers();
            let apiOptions_getComments = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            let apiUrl = "https://moviereviewlist.herokuapp.com/api/comments?movieName=" + this.props.movieName
            myHeaders.append("Content-Type", "application/json");
            fetch(apiUrl, apiOptions_getComments)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                this.setState({
                    ...this.state,
                    Comments: JSON.parse(result)
                })
            })
            .catch(error => console.log('error', error));
        }
    componentDidMount(){
        this.pullAPI()
        console.log(this.state);
    }
    render() {
        console.log(this.state)
        return <div className="container" style={ {backgroundImage: 'https://www.pngjoy.com/pngm/7/245519_film-reel-film-strip-transparent-background-png-download.png'}}>
                <div className="card promoting-card">
                    <div className="card-body d-flex flex-row">
                        <div>
                            <h4 className="card-title font-weight-bold mb-2">{this.movieName}</h4>
                                <div className="rating">
                                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                                </div>
                        </div>
                        <div className="card-body d-flex flex-row">
                        <button onClick = {() => this.setLeaveReview()} className="btn btn-primary">Leave Review</button>
                        </div>
                    </div>
                    <div className="view overlay">
                        <img className="card-img-top rounded-0" src={this.imageUrl} alt="Card image cap"></img>
                            <a href="#!">
                                <div className="mask rgba-white-slight"></div>
                            </a>
                    </div>
                    {!this.leaveReview ?
                    <div className="card-body">
                    <div>
                        <p>
                            <a className="btn btn-flat red-text p-1 my-1 mr-0 mml-1 collapsed" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                {this.body}
                            </a>
                        </p>
                        <div className="collapse" id="collapseExample">
                            <div className="card card-body">
                                {this.state.Comments.map(comment => {
                                    console.log(comment);
                                   return (<Comments name={comment.name} stars={comment.stars} review={comment.review} id={comment._id}/>)
                                })
                            }
                            </div>
                        </div></div>
                        </div> : <CreateComments movieName=" Forrest Gump "/>}
                    </div>
                </div>
    }
}