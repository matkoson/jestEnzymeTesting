import React, {Component} from "react";
import {connect} from "react-redux";



class CommentList extends Component {
	// renderComments(props) {
	//   return this.props.comments.map(comment=> {
	//     return <li key={comment}>{comment}</li>
	//   });
	// }
	renderList(props) {
		console.log(this.props.comments);
		return this.props.comments
			.map(one => {
				return (
					<li key={one.id}>
						{one.name} - {one.id}
					</li>
				);
			}
			);
	}

	render() {
		return(
			<div>
				<ul>
					{this.renderList()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {comments: state.comments};
}

export default connect(mapStateToProps)(CommentList);
