import React, {Component} from "react";
import {connect} from "react-redux";

export default (ChildComponent) => {
	class ComposedComponent extends Component {

		componentDidMount() {
			this.shouldNavigateway();
		}

		componentDidUpdate() {
			this.shouldNavigateway();
		}

		shouldNavigateway() {
			if(!this.props.auth) {
				console.log("leave, now");
				this.props.history.push("/");
			} else {
				console.log("stay, please");
			}
		}

		render() {
			return <ChildComponent {...this.props} />;
		}
	}

	function mapStateToProps(state) {
		return {auth: state.auth };
	}

	return connect(mapStateToProps)(ComposedComponent);
};
