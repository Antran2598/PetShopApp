import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Card, Image } from "react-native-elements";
import * as Animatable from 'react-native-animatable';
//slider 
import { SliderBox } from "react-native-image-slider-box";

/* Shared Folder */
// import { pets } from "../shared/pets";
// import { PROMOTIONS } from "../shared/promotions";
// import { LEADERS } from "../shared/leaders";

import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';


class RenderItem extends Component {
  render() {
    const item = this.props.item;
    if (this.props.isLoading) {
      return (<Loading />);
    } else if (this.props.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
      const item = this.props.item;
      if (item != null) {
        return (
          <Card>
            <Text style={styles.itemName}>{item.name}</Text>
            <Image source={{ uri: baseUrl + item.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
            </Image>
            <Text style={{ margin: 10, fontSize: 15 }}>{item.description}</Text>
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
    this.state = {
      images: [
        "https://petshop2598.herokuapp.com/images/logo.jpg",
        "https://petshop2598.herokuapp.com/images/englandcat.jpg",
        "https://petshop2598.herokuapp.com/images/food.jpg",
        "https://petshop2598.herokuapp.com/images/husky.jpg",
        "https://petshop2598.herokuapp.com/images/pug.jpg", // Network image
      ]
    };
  }
  render() {
    const pet = this.props.pets.pets.filter((pet) => pet.featured === true)[0];
    const promotions = this.props.promotions.promotions.filter((promo) => promo.featured === true)[0];
    const leaders = this.props.leaders.leaders.filter((leader) => leader.featured === true)[0];
    return (
      <ScrollView>
        <SliderBox
          images={this.state.images}
          // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
          // currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop />
        {/* <Image source={{ uri: baseUrl + "images/logo.jpg" }}style={{ width: '100%', height: 250, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }} /> */}
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Text style={styles.itemTitle}>News</Text></Animatable.View>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderItem item={pet}
            isLoading={this.props.pets.isLoading}
            errMess={this.props.pets.errMess} /></Animatable.View>
        <Animatable.View animation="fadeInRight" duration={2000} delay={1000}>
          <RenderItem item={promotions}
            isLoading={this.props.promotions.isLoading}
            errMess={this.props.promotions.errMess} /></Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderItem item={leaders}
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess} /></Animatable.View>

      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Home);
const styles = StyleSheet.create({
  itemContainer: {
    width: 100,
    marginRight: 12,
    marginTop: 8,
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#484848',
    marginVertical: 4,
    textAlign: "center",
  },
  itemTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#484848',
    marginTop: 6,
    textAlign: "center",
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: "bold",
    fontWeight: '500',
    color: '#2a2a2a',
    textAlign: "center",
  },
  //
  seeMoreContainer: {
    marginTop: 10,
    padding: 12,
    borderTopWidth: 0.6,
    borderTopColor: '#ededed',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#0e45b4',
  },
});