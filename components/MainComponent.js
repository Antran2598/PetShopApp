import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Linking } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchLeaders, fetchPets, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';
import Home from './HomeComponent';
import Profile from './ProfileComponent';
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
        headerStyle: { backgroundColor: '#111111' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <HomeNavigator.Screen name='Home' component={Home}
        options={({ navigation }) => ({
          headerTitle: 'Trang Chủ'
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
        headerStyle: { backgroundColor: '#111111' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' },
      }}>
      <ReservationNavigator.Screen name='Reservation' component={Reservation}
        options={({ navigation }) => ({
          headerTitle: 'Đặt Lịch Sử Dụng Dịch Vụ'
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
        headerStyle: { backgroundColor: '#111111' },
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

import Favorites from './FavoriteComponent';
function FavoritesNavigatorScreen() {
  const FavoritesNavigator = createStackNavigator();
  return (
    <FavoritesNavigator.Navigator initialRouteName='Favorites'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <FavoritesNavigator.Screen name='Favorites' component={Favorites}
        options={({ navigation }) => ({
          headerTitle: 'My Favorites',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <FavoritesNavigator.Screen name='Petdetail' component={Petdetail}
        options={{ headerTitle: 'Pet Detail' }} />
    </FavoritesNavigator.Navigator>
  );
}

// const MenuNavigator = createStackNavigator();
// function MenuNavigatorScreen() {
//   return (
//     <MenuNavigator.Navigator
//       initialRouteName='Menu'
//       screenOptions={{
//         headerStyle: { backgroundColor: '#111111' },
//         headerTintColor: '#fff',
//         headerTitleStyle: { color: '#fff' }
//       }}>
//       <MenuNavigator.Screen name='Pets' component={Pets} />
//       <MenuNavigator.Screen name='Productdetail' component={Petdetail} options={{ headerTitle: 'Pet Detail' }} />
//     </MenuNavigator.Navigator>
//   );
// }

import Pets from './PetsComponent';
import Petdetail from './PetdetailComponent';
function PetsNavigatorScreen() {
  const PetsNavigator = createStackNavigator();
  return (
    <PetsNavigator.Navigator
      initialRouteName='Pets'
      screenOptions={{
        headerStyle: { backgroundColor: '#111111' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <PetsNavigator.Screen name='Pets' component={Pets}
        options={({ navigation }) => ({
          headerTitle: 'Pets',
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
        headerStyle: { backgroundColor: '#111111' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ContactNavigator.Screen name='Contact' component={Contact}
        options={({ navigation }) => ({
          headerTitle: 'Contact'
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

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={{ backgroundColor: '#111111', height: 80, alignItems: 'center', flexDirection: 'row' }}>
//         <View style={{ flex: 1 }}>
//         <Image source={{ uri: baseUrl + 'images/logo.jpg' }} style={{ margin: 10, width: 80, height: 60 }} />
//         </View>
//         <View style={{ flex: 2 }}>
//           <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>An and Thoa Pets</Text>
//         </View>
//       </View>
//       <DrawerItemList {...props} />
//       <DrawerItem label='Help'
//         icon={({ focused, color, size }) => <Icon name='help' size={size} color={focused ? '#111111' : '#ccc'} />}
//         onPress={() => Linking.openURL('https://reactnavigation.org/docs/getting-started')} />
//     </DrawerContentScrollView>
//   );
// }

const ProfileNavigator = createStackNavigator();
function ProfileNavigatorScreen() {
  return (
    <ProfileNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: { backgroundColor: '#111111' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <ProfileNavigator.Screen name='Profile' component={Profile} options={{ headerTitle: 'Trang Cá Nhân' }} />
      <ProfileNavigator.Screen name='About' component={About} options={{ headerTitle: 'Về Chúng Tôi' }} />
      <ProfileNavigator.Screen name='Contact' component={Contact} options={{ headerTitle: 'Liên Hệ' }} />
      <ProfileNavigator.Screen name='Favorites' component={Favorites} options={{ headerTitle: 'Thú Cưng Yêu Thích' }} />
      {/* <MenuNavigator.Screen name='Cart' component={Cart} options={{ headerTitle: 'Giỏ Hàng' }} /> */}
      {/* <ProfileNavigator.Screen name='Login' component={Login} options={{ headerTitle: 'Đăng Nhập' }} />
      <ProfileNavigator.Screen name='Register' component={Register} options={{ headerTitle: 'Đăng Ký' }} /> */}
    </ProfileNavigator.Navigator>
  );
}

function MainNavigatorScreen() {
  const MainNavigator = createBottomTabNavigator();
  return (
    <MainNavigator.Navigator initialRouteName='HomeScreen'>
      {/* <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen}
        options={{
          title: 'Home', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#111111' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='AboutScreen' component={AboutNavigatorScreen}
        options={{
          title: 'About Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#111111' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='PetsScreen' component={PetsNavigatorScreen}
        options={{
          title: 'Pets', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#111111' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='ContactScreen' component={ContactNavigatorScreen}
        options={{
          title: 'Contact Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='contacts' size={size} color={focused ? '#111111' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='ReservationScreen' component={ReservationNavigatorScreen}
        options={{
          title: 'Reserve Pets Service', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='list-alt' type='font-awesome' size={size} color={focused ? '#111111' : '#ccc'} />)
        }} /> */}
      <MainNavigator.Screen name='Trang Chủ' component={HomeNavigatorScreen} options={{
        headerShown: false, tabBarLabel: 'Trang Chủ',
        tabBarIcon: ({ tintColor }) => (<Ionicons name="ios-home" color={tintColor} size={25} />)
      }} />
      <MainNavigator.Screen name='Danh Mục' component={PetsNavigatorScreen} options={{
        headerShown: false, tabBarLabel: 'Danh Mục',
        tabBarIcon: ({ tintColor }) => (<Ionicons name="ios-grid" color={tintColor} size={25} />)
      }} />
      <MainNavigator.Screen name='Booking' component={ReservationNavigatorScreen} options={{
        headerShown: false, tabBarLabel: 'Booking',
        tabBarIcon: ({ tintColor }) => (<Ionicons name="ios-book" color={tintColor} size={25} />)
      }} />
      {/* <MainNavigator.Screen name='Giới Thiệu' component={ContactNavigatorScreen} options={{
        headerShown: false, tabBarLabel: 'Giới Thiệu',
        tabBarIcon: ({ tintColor }) => (<Ionicons name="ios-call" color={tintColor} size={25} />)
      }} /> */}
      <MainNavigator.Screen name='Trang Cá Nhân' component={ProfileNavigatorScreen} options={{
        headerShown: false, tabBarLabel: 'Trang Cá Nhân',
        tabBarIcon: ({ tintColor }) => (<Ionicons name="ios-person" color={tintColor} size={25} />)
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