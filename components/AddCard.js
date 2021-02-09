import React, {Component} from 'react';
import {connect} from "react-redux";
import {View, Text, TextInput} from "react-native";

/**
 * Component that presents a form to be able to add a card to a deck
 */
class AddCard extends Component {
	render(){
		const {title} = this.props;
		return (
			<View>
				<Text>Title - {title}</Text>
			</View>
		)
	}
}

const mapStateToProps = ({}, {route: {params: {title}}}) => {
	return {
		title
	};
};

export default connect(mapStateToProps)(AddCard)