import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Switch, Button, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: 1,
      takeShower: false,
      haircut:false,
      heathcheck:false,
      date: new Date(),
      showDatePicker: false,
      showModal: false
    }
  }
  render() {
    return (
      <ScrollView>
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
        <Modal animationType={'slide'} visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <ModalContent pets={this.state.pets} takeShower={this.state.takeShower} haircut={this.state.haircut} heathcheck={this.state.heathcheck} date={this.state.date}
            onPressClose={() => this.setState({ showModal: false })} />
        </Modal>
      </ScrollView>
    );
  }
  handleReservation() {
    // alert(JSON.stringify(this.state));
    this.setState({ showModal: true });
  }
}
export default Reservation;
class ModalContent extends Component {
  render() {
    return (
      <View style={styles.modal}>
        <Text style={styles.modalTitle}>Your Reservation</Text>
        <Text style={styles.modalText}>Number of Pets: {this.props.pets}</Text>
        <Text style={styles.modalText}>Take Shower?: {this.props.takeShower ? 'Yes' : 'No'}</Text>
        <Text style={styles.modalText}>Haircut?: {this.props.haircut ? 'Yes' : 'No'}</Text>
        <Text style={styles.modalText}>HeathCheck?: {this.props.heathcheck ? 'Yes' : 'No'}</Text>
        <Text style={styles.modalText}>Date and Time: {format(this.props.date, 'dd/MM/yyyy - HH:mm')}</Text>
        <Button title='Close' color='#7cc' onPress={() => this.props.onPressClose()} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  formRow: { alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row', margin: 20 },
  formLabel: { fontSize: 18, flex: 2 },
  formItem: { flex: 1 },
  modal: { justifyContent: 'center', margin: 20 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', backgroundColor: '#7cc', textAlign: 'center', color: 'white', marginBottom: 20 },
  modalText: { fontSize: 18, margin: 10 }
});