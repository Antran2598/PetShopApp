import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {
  render() {
    return (
      <Card>
        <Card.Title>Contact Information</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10 }}>08 Nguyễn Văn Tráng, Phường Bến Nghé, Q1, TPHCM</Text>
        <Text style={{ margin: 10 }}>9 Hai Bà Trưng, Phường Bến Nghé, Q1, TPHCM</Text>
        <Text style={{ margin: 10 }}>Tel: +852 1234 5678</Text>
        <Text style={{ margin: 10 }}>Fax: +852 8765 4321</Text>
        <Text style={{ margin: 10 }}>Email:bestpet@gmail.com</Text>
      </Card>
    );
  }
}
export default Contact;