import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Linking} from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { fetchLeaders, fetchPets, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';
import Home from './HomeComponent';
const mapDispatchToProps = (dispatch) => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchPets: () => dispatch(fetchPets()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});
function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <HomeNavigator.Screen name='Home' component={Home}
        options={({ navigation }) => ({
          headerTitle: 'Home',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </HomeNavigator.Navigator>
  );
}
import Reservation from './ReservationComponent';
function ReservationNavigatorScreen() {
  const ReservationNavigator = createStackNavigator();
  return (
    <ReservationNavigator.Navigator initialRouteName='Reservation'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ReservationNavigator.Screen name='Reservation' component={Reservation}
        options={({ navigation }) => ({
          headerTitle: 'Reserve Pets Service',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ReservationNavigator.Navigator>
  );
}
import About from './AboutComponent';
function AboutNavigatorScreen() {
  const AboutNavigator = createStackNavigator();
  return (
    <AboutNavigator.Navigator
      initialRouteName='About'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <AboutNavigator.Screen name='About' component={About}
        options={({ navigation }) => ({
          headerTitle: 'About',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </AboutNavigator.Navigator>
  );
}

import Pets from './PetsComponent';
import Petdetail from './PetdetailComponent';
function PetsNavigatorScreen() {
  const PetsNavigator = createStackNavigator();
  return (
    <PetsNavigator.Navigator
      initialRouteName='Pets'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
       <PetsNavigator.Screen name='Pets' component={Pets}
        options={({ navigation }) => ({
          headerTitle: 'Pets',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <PetsNavigator.Screen name='Petdetail' component={Petdetail}
        options={{
          headerTitle: 'Pet Detail'
        }} />
    </PetsNavigator.Navigator>
  );
}


import Contact from './ContactComponent';
function ContactNavigatorScreen() {
  const ContactNavigator = createStackNavigator();
  return (
    <ContactNavigator.Navigator
      initialRouteName='Contact'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
     <ContactNavigator.Screen name='Contact' component={Contact}
        options={({ navigation }) => ({
          headerTitle: 'Contact',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ContactNavigator.Navigator>
  );
}

// function MainNavigatorScreen() {
//   const MainNavigator = createDrawerNavigator();
//   return (
//     <MainNavigator.Navigator initialRouteName='HomeScreen'>
//       <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen} options={{ title: 'Home', headerShown: false }} />
//       <MainNavigator.Screen name='AboutScreen' component={AboutNavigatorScreen} options={{ title: 'About Us', headerShown: false }} />
//       <MainNavigator.Screen name='PetsScreen' component={PetsNavigatorScreen} options={{ title: 'Pets', headerShown: false }} />
//       <MainNavigator.Screen name='ContactScreen' component={ContactNavigatorScreen} options={{ title: 'Contact Us', headerShown: false }} />
//     </MainNavigator.Navigator>
//   );
// }

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: '#7cc', height: 80, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
        <Image source={{ uri: baseUrl + 'images/logo.jpg' }} style={{ margin: 10, width: 80, height: 60 }} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>An and Thoa Pets</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label='Help'
        icon={({ focused, color, size }) => <Icon name='help' size={size} color={focused ? '#7cc' : '#ccc'} />}
        onPress={() => Linking.openURL('https://reactnavigation.org/docs/getting-started')} />
    </DrawerContentScrollView>
  );
}
function MainNavigatorScreen() {
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator initialRouteName='HomeScreen' drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen}
        options={{
          title: 'Home', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='AboutScreen' component={AboutNavigatorScreen}
        options={{
          title: 'About Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='PetsScreen' component={PetsNavigatorScreen}
        options={{
          title: 'Pets', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='ContactScreen' component={ContactNavigatorScreen}
        options={{
          title: 'Contact Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='contacts' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='ReservationScreen' component={ReservationNavigatorScreen}
        options={{
          title: 'Reserve Pets Service', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='list-alt' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
  componentDidMount() {
    // redux
    this.props.fetchLeaders();
    this.props.fetchPets();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
}
export default connect(null, mapDispatchToProps)(Main);