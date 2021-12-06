/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text, View, Image, useWindowDimensions, Platform } from 'react-native';

import ChatRoomScreen from '../screens/ChatRoomScreen';
import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

import { SimpleLineIcons, Feather, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{ headerTitle: HomeHeader }} 
      />
      
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={{ headerTitle: ChatRoomHeader, headerBackTitleVisible: false, title: 'Username'}} 
      />

      <Stack.Screen 
        name="UsersScreen" 
        component={UsersScreen} 
        options={{ title: "Users"}} 
      />
      
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />


      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const HomeHeader = (props) => {

  const { width } = useWindowDimensions();

  const navigation = useNavigation()

  const logOut = () => {
    Auth.signOut();
  }

  return(
    <View style={{ flexDirection: 'row', width, marginRight: 20, padding: 10, alignItems: 'center', }}>


      <Image source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg' }} style={{width: 30, height: 30, borderRadius: 30,}} />

      <Pressable onPress={logOut}>
        <MaterialIcons name="logout" size={24} color="black" style={{marginLeft: 30,}}/>
      </Pressable>

      <Text style={{ flex: 1,textAlign: 'center', fontWeight: 'bold', fontSize: 17, marginLeft: Platform.OS == "ios" ? 50 : 10, }}>Chats</Text>

      <Feather color="black" size={24} name="camera" style={{ marginHorizontal:14, }} />
      <Pressable onPress={() => navigation.navigate('UsersScreen')}>
        <Feather color="black" size={24} name="edit-2" style={{ marginHorizontal:14, }}  />
      </Pressable>

    </View>
  );
}


const ChatRoomHeader = (props) => {

  const { width } = useWindowDimensions();

  return(
    <View style={{ flexDirection: 'row', width: Platform.OS == "ios" ? width - 5 : width - 25, marginLeft: -38, padding: 10, alignItems: 'center', justifyContent:'center', }}>


      <Image source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg' }} style={{width: 30, height: 30, borderRadius: 30, marginLeft: Platform.OS == "ios" ? 15 : 1}} />


      <Text style={{ flex: 1, marginLeft: 10, fontWeight: 'bold', fontSize: 17, alignItems: 'center', justifyContent: 'center',}}>{props.children}</Text>

      <Feather color="black" size={24} name="camera" style={{ marginHorizontal:8, }} />
      <Feather color="black" size={24} name="edit-2" style={{ marginHorizontal:8, }}  />

    </View>
  );
}