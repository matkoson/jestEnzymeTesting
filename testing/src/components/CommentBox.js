import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "actions";


class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {comment: ""};

  }


  handleChange = (event)=> {
    this.setState({comment: event.target.value});
  };
  handleSubmit = (event)=> {
    this.setState({comment: ""});
    this.props.saveComment(this.state.comment);
    event.preventDefault();
  };

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h4>Add a Comment</h4>
          <textarea onChange={this.handleChange.bind(this)} value={this.state.comment}/>
          <div>
            <button>Submit Comment</button>
          </div>
        </form>
        <button className="fetch-comments" onClick={this.props.fetchComments}>Fetch Comments</button>
      </div>
    );
  }
}

export default connect(null, actions)(CommentBox);
