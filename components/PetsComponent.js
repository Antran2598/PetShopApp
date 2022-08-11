import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { Text } from 'react-native';
// import { pets } from "../shared/pets";
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import Dishdetail from "./PetdetailComponent";
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    pets: state.pets
  }
};
class Menu extends Component {
  constructor(props) {
    super(props);
  /*this.state = {
      pets: pets
    };*/
  }
  render() {
    if (this.props.pets.isLoading) {
      return (<Loading />);
    } else if (this.props.pets.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
      return (
        <FlatList
        data={this.props.pets.pets}
        renderItem={({ item, index }) => this.renderMenuItem(item, index)}
        keyExtractor={(item) => item.id.toString()}
      />
      );
    }
  }
  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      <ListItem
        key={index}
        onPress={() => navigate("Petdetail", { petId: item.id })}
      >
        <Avatar source={{uri: baseUrl + item.image}} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}
export default connect(mapStateToProps)(Menu);
