import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { Card, ListItem, Avatar } from 'react-native-elements';
// import { LEADERS } from '../shared/leaders';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

class RenderHistory extends Component {
  render() {
    return (
      <Card>
        <Card.Title>Our History</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10 }}>Pets Shop là chuỗi pet shop thú cưng Đồ dùng cho chó – Đồ dùng cho mèo tại TP.HCM với hệ thống nhiều chi nhánh cửa hàng thú cưng chuyên cung cấp đồ dùng, quần áo, thức ăn, sữa tắm, chuồng, vòng cổ xích và các phụ kiện cho Chó cảnh, Mèo cảnh, Cá cảnh. Cùng nhiều bài viết chia sẻ kinh nghiệm chăm sóc Thỏ cảnh, Chuột cảnh, Sóc cảnh, Chim cảnh, Bò sát cảnh hàng đầu tại Việt Nam</Text>
        <Text style={{ margin: 10 }}>Địa chỉ nhận tắm spa, chăm sóc, cắt tỉa lông và trông giữ thú cưng chuyên nghiệp. Với chất lượng dịch vụ tốt nhất luôn được khách hàng tin tưởng sẽ là điểm đến lý tưởng và tuyệt vời dành cho vật nuôi.</Text>
      </Card>
    );
  }
}

// class RenderLeadership extends Component {
//   render() {
//     return (
//       <Card>
//         <Card.Title>Corporate Leadership</Card.Title>
//         <Card.Divider />
//         <FlatList data={this.props.items}
//           renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
//           keyExtractor={item => item.id.toString()} />
//       </Card>
//     );
//   }

//   renderLeaderItem(item, index) {
//     return (
//       <ListItem key={index}>
//          <Avatar rounded source={{ uri: baseUrl + item.image }} />
//         <ListItem.Content>
//           <ListItem.Title style={{ fontWeight: 'bold' }}>{item.name}</ListItem.Title>
//           <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
//         </ListItem.Content>
//       </ListItem>
//     );
//   }
// }

class RenderLeadership extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Loading />
        </Card>
      );
    } else if (this.props.errMess) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Text>{this.props.errMess}</Text>
        </Card>
      );
    } else {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <FlatList data={this.props.leaders}
            renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
            keyExtractor={item => item.id.toString()} />
        </Card>
      );
    }
  }
  renderLeaderItem(item, index) {
    return (
      <ListItem key={index}>
        <Avatar rounded source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: 'bold' }}>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    leaders: state.leaders
  }
};

class About extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      leaders: LEADERS
    };*/
  }
  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderHistory />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderLeadership
            leaders={this.props.leaders.leaders}
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess} />
        </Animatable.View>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(About);