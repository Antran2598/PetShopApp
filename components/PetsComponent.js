import React, { Component } from "react";
import {  FlatList, Text, StyleSheet, View, Image } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
// import { pets } from "../shared/pets";
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import Petdetail from "./PetdetailComponent";
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
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
      //   <FlatList
      //   data={this.props.pets.pets}
      //   renderItem={({ item, index }) => this.renderMenuItem(item, index)}
      //   keyExtractor={(item) => item.id.toString()}
      // />
      <ScrollView>
          <Text style={styles.sectionTitle}>Tất Cả</Text>
      {/*  */}  
          <FlatList horizontal={true} data={this.props.pets.pets}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={item => item.id.toString()} />
          <Text style={styles.sectionTitle}>Chó & Mèo</Text>
      {/*  */}
          <FlatList horizontal={true} data={this.props.pets.pets}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={item => item.id.toString()} />
          </ScrollView>
      );
    }
  }
  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      // <ListItem
      //   key={index}
      //   onPress={() => navigate("Petdetail", { petId: item.id })}
      // >
      //   <Avatar source={{uri: baseUrl + item.image}} />
      //   <ListItem.Content>
      //     <ListItem.Title>{item.name}</ListItem.Title>
      //     <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      //   </ListItem.Content>
      // </ListItem>
      <Animatable.View animation="fadeInRightBig" duration={2000}>
      <ListItem key={index} onPress={() => navigate('Petdetail', { petId: item.id })}>
       {/* <Avatar source={{uri: baseUrl + item.image}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      </ListItem.Content>
      <Text style={styles.itemPrice}>{item.price}$</Text> */}
       <View style={styles.itemContainer}>
         <Image source={{uri: baseUrl + item.image}} style={styles.itemImage}/>
         <Text style={styles.itemName} numberOfLines={2}>
           {item.name}
         </Text>
         <Text style={styles.itemPrice}>{item.price}</Text>
       </View>
    </ListItem>

    </Animatable.View>
    );
  }
}
export default connect(mapStateToProps)(Menu);
const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2f2f2f',
    marginVertical: 12,
    marginLeft: 12,
  },
  itemContainer: {
    width: 100,
    marginRight: 12,
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  itemName: {
    fontSize: 14,
    color: '#484848',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2a2a2a',
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