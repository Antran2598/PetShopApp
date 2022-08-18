import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';
import * as Animatable from 'react-native-animatable';


class Contact extends Component {
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
      <Card>
        <Card.Title>Contact Information</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 10 }}>08 Nguyễn Văn Tráng, Phường Bến Nghé, Q1, TPHCM</Text>
        <Text style={{ margin: 10 }}>9 Hai Bà Trưng, Phường Bến Nghé, Q1, TPHCM</Text>
        <Text style={{ margin: 10 }}>Tel: +852 1234 5678</Text>
        <Text style={{ margin: 10 }}>Fax: +852 8765 4321</Text>
        <Text style={{ margin: 10 }}>Email:bestpet@gmail.com</Text>
        <Button title=' Compose Email' buttonStyle={{ backgroundColor: '#111111' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.composeMail} />
      </Card>
      </Animatable.View>
    );
  }
  composeMail() {
    MailComposer.composeAsync({
      recipients: ['bestpet@gmail.com'],
      subject: 'From Confusion',
      body: 'Hello my friends ...'
    });
  }
}
export default Contact;