import * as React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Message from '../components/Message/index';
import chatRoomData from '../assets/dummy/Chats';
import { useRoute, useNavigation } from '@react-navigation/core';
import MessageInput from '../components/MessageInput';

export default function ChatRoomScreen(){

	const route = useRoute();

	const navigation = useNavigation();

	navigation.setOptions({ title: 'Shakthi Pavithran' })

	console.warn("Displaying chat room: ", route.params?.id)

	return(
		
		<SafeAreaView style={styles.page}>
			<FlatList data={chatRoomData.messages} 
			renderItem={({ item }) => <Message message={item} /> }
			inverted
			/>

			<MessageInput />

		</SafeAreaView>

		
			
	);

};


const styles = StyleSheet.create({
	page:{
		backgroundColor: 'white',
		flex: 1,
	}
})












