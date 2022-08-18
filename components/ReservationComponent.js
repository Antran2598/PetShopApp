import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';
class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: 1,
      takeShower: false,
      haircut:false,
      heathcheck:false,
      date: new Date(),
      showDatePicker: false
    }
  }
  render() {
    return (
      <ScrollView>
        <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Số lượng thú cưng</Text>
          <Picker style={styles.formItem} selectedValue={this.state.pets} onValueChange={(value) => this.setState({ pets: value })}>
            <Picker.Item label='1' value='1' />
            <Picker.Item label='2' value='2' />
            <Picker.Item label='3' value='3' />
            <Picker.Item label='4' value='4' />
            <Picker.Item label='5' value='5' />
            <Picker.Item label='6' value='6' />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Tắm</Text>
          <Switch style={styles.formItem} value={this.state.takeShower} onValueChange={(value) => this.setState({ takeShower: value })} />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Cắt tỉa lông</Text>
          <Switch style={styles.formItem} value={this.state.haircut} onValueChange={(value) => this.setState({ haircut: value })} />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Thăm khám</Text>
          <Switch style={styles.formItem} value={this.state.heathcheck} onValueChange={(value) => this.setState({ heathcheck: value })} />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Thời Gian</Text>
          <Icon name='schedule' size={36} onPress={() => this.setState({ showDatePicker: true })} />
          <Text style={{ marginLeft: 10 }}>{format(this.state.date, 'dd/MM/yyyy - HH:mm')}</Text>
          <DateTimePickerModal mode='datetime' isVisible={this.state.showDatePicker}
            onConfirm={(date) => this.setState({ date: date, showDatePicker: false })}
            onCancel={() => this.setState({ showDatePicker: false })} />
        </View>
        <View style={styles.formRow}>
          <Button title='Đặt Lịch' color='#0000CC' onPress={() => this.handleReservation()} />
        </View>
        </Animatable.View>
      </ScrollView>
    );
  }
  handleReservation() {
    Alert.alert(
      'Your Booking OK?',
      'Số Lượng Thú Cưng: ' + this.state.pets + '\nTắm ' + this.state.takeShower+ '\nCắt Tỉa Lông ' + this.state.haircut+ '\nThăm Khám Sức Khỏe ' + this.state.heathcheck +  '\nThời Gian: ' + this.state.date.toISOString(),
      [
        { text: 'Cancel', onPress: () => this.resetForm() },
        { text: 'OK', onPress: () => {
          this.addReservationToCalendar(this.state.date);
          this.presentLocalNotification(this.state.date);
          this.resetForm();
        }},
      ],
      { cancelable: false }
    );
  }

 // notification
 async obtainNotificationPermission() {
  let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
  if (permission.status !== 'granted') {
    permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
      Alert.alert('Permission not granted to show notifications');
    }
  }
  return permission;
}
async presentLocalNotification(date) {
  await this.obtainNotificationPermission();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true })
  });
  Notifications.scheduleNotificationAsync({
    content: {
      title: 'Your Reservation',
      body: 'Reservation for ' + date + ' requested',
      sound: true,
      vibrate: true
    },
    trigger: null
  });
}

// calendar
async obtainCalendarPermission() {
  let permission = await Permissions.getAsync(Permissions.CALENDAR);
  if (permission.status !== 'granted') {
    permission = await Permissions.askAsync(Permissions.CALENDAR);
    if (permission.status !== 'granted') {
      Alert.alert('Permission not granted to access the calendar');
    }
  }
  return permission;
}
async addReservationToCalendar(date) {
  await this.obtainCalendarPermission();
  const defaultCalendarSource = { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  const eventId = await Calendar.createEventAsync(newCalendarID, {
    title: 'Pets Service Booking',
    startDate: date,
    endDate: new Date(date.getTime() + 2 * 60 * 60 * 1000),
    timeZone: 'Asia/Hong_Kong',
    location: '08 Nguyễn Văn Tráng, Phường Bến Nghé, Q1, TPHCM'
  });
  //alert('Your new event ID is: ' + eventId);
}

  resetForm() {
    this.setState({
      pets: 1,
      takeShower: false,
      haircut:false,
      heathcheck:false,
      date: new Date(),
      showDatePicker: false
    });
  }
}
export default Reservation;

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  }
});