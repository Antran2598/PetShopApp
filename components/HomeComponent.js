import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { Card, Image } from "react-native-elements";

/* Shared Folder */
// import { pets } from "../shared/pets";
// import { PROMOTIONS } from "../shared/promotions";
// import { LEADERS } from "../shared/leaders";

import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';


class RenderItem extends Component {
  render() {
    if (this.props.isLoading) {
      return (<Loading />);
    } else if (this.props.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
      const item = this.props.item;
      if (item != null) {
        return (
          <Card>
             <Image source={{ uri: baseUrl + item.image }} 
              style={{
                width: "100%",
                height: 100,
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
              <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
            </Image>
            <Text style={{ margin: 10 }}>{item.description}</Text>
          </Card>
        );
      }
      return (<View />);
    }
  }
}
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    pets: state.pets,
    promotions: state.promotions,
    leaders: state.leaders
  }
};
class Home extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      pets: pets,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };*/
  }
  render() {
    const pet = this.props.pets.pets.filter((pet) => pet.featured === true)[0];
    const promotions = this.props.promotions.promotions.filter((promo) => promo.featured === true)[0];
    const leaders = this.props.leaders.leaders.filter((leader) => leader.featured === true)[0];
    return (
      <ScrollView>
  <RenderItem item={pet}
      isLoading={this.props.pets.isLoading}
      errMess={this.props.pets.errMess} />
    <RenderItem item={promotions}
      isLoading={this.props.promotions.isLoading}
      errMess={this.props.promotions.errMess} />
    <RenderItem item={leaders}
      isLoading={this.props.leaders.isLoading}
      errMess={this.props.leaders.errMess} />
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Home);
