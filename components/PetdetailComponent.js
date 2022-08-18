// redux
import { connect } from 'react-redux';
import { postFavorite, postComment } from '../redux/ActionCreators';
const mapStateToProps = state => {
  return {
    pets: state.pets,
    comments: state.comments,
    favorites: state.favorites
  }
};
const mapDispatchToProps = dispatch => ({
  postFavorite: (petId) => dispatch(postFavorite(petId)),
  postComment: (petId, rating, author, comment) => dispatch(postComment(petId, rating, author, comment))
});

import React, { Component } from 'react';
import { View, Text, FlatList, Modal, Button } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { Card, Image, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

class Renderpet extends Component {
  render() {
    const pet = this.props.pet;
    if (pet != null) {
      return (
        <Card>
          <Image source={{ uri: baseUrl + pet.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{pet.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{pet.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon raised reverse name={this.props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
              onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
            <Icon raised reverse name='pencil' type='font-awesome' color='#f50'
              onPress={() => this.props.onPressComment()} />
          </View>
        </Card>
      );
    }
    return (<View />);
  }
}

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={item => item.id.toString()} />
      </Card>
    );
  }

  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating startingValue={item.rating} imageSize={16} readonly style={{ flexDirection: 'row' }} />
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    );
  }
}

class petdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 3,
      author: '',
      comment: ''
    };
  }

  render() {
    const petId = parseInt(this.props.route.params.petId);
    return (
      <View>
        <Modal visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <View style={{ justifyContent: 'center', margin: 20 }}>
            <Rating startingValue={this.state.rating} showRating={true}
              onFinishRating={(value) => this.setState({ rating: value })} />
            <View style={{ height: 20 }} />
            <Input value={this.state.author} placeholder='Author' leftIcon={{ name: 'user-o', type: 'font-awesome' }}
              onChangeText={(text) => this.setState({ author: text })} />
            <Input value={this.state.comment} placeholder='Comment' leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
              onChangeText={(text) => this.setState({ comment: text })} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button title='SUBMIT' color='#7cc'
                onPress={() => { this.submitComment(petId); this.setState({ showModal: false }); }} />
              <View style={{ width: 10 }} />
              <Button title='CANCEL' color='#7cc'
                onPress={() => { this.setState({ showModal: false }); }} />
            </View>
          </View>
        </Modal>
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Renderpet pet={this.props.pets.pets[petId]}
              favorite={this.props.favorites.some(el => el === petId)}
              onPressFavorite={() => this.markFavorite(petId)}
              onPressComment={() => this.setState({ showModal: true })} />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.petId === petId)} />
          </Animatable.View>
        </ScrollView>
      </View>
    );
  }

  markFavorite(petId) {
    this.props.postFavorite(petId);
  }

  submitComment(petId) {
    //alert(petId + ':' + this.state.rating + ':' + this.state.author + ':' + this.state.comment);
    this.props.postComment(petId, this.state.rating, this.state.author, this.state.comment);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(petdetail);