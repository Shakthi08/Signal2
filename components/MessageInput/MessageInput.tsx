import React, { useState } from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
	TextInput, 
	Pressable,
	Platform,
	KeyboardAvoidingView,
} from 'react-native';
import { SimpleLineIcons, Feather, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';

const MessageInput = () => {

	const [message, setMessage] = useState('');

	const sendMessage = () => {
		console.warn("Sending: ", message);
		setMessage('');
	}

	const onPlusClicked = () => {
		console.warn("Plus Clicked");
	}



	const onPress = () => {
		if(message){
			sendMessage();
		}
		else{
			onPlusClicked();
		}
	}

	return(
		<KeyboardAvoidingView 
			style={styles.root}
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			keyboardVerticalOffset={67.6}
		>
			<View style={styles.inputContainer}>
				<SimpleLineIcons color="#595959" size={24} name="emotsmile" style={styles.icon} />
				
				<TextInput style={styles.input} 
					placeholder="Type your message..."
					value={message}
					onChangeText={setMessage}
				/>

				<Feather color="#595959" size={24} name="camera" style={styles.icon} />
				<MaterialCommunityIcons color="#595959" size={24} name="microphone-outline" style={styles.icon} />
			</View>

			<Pressable onPress={onPress} style={styles.buttonContainer}>
				{ message ? <Ionicons name="send" size={18} color="white" /> : <AntDesign color="white" size={24} name="plus"  />}
			</Pressable>

		</KeyboardAvoidingView >
	);
}

const styles = StyleSheet.create({
	root:{
		flexDirection: 'row',
		padding: 10,
	},
	inputContainer:{
		backgroundColor: '#f2f2f2',
		flex: 1,
		marginRight: 10,
		borderRadius: 25,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#dedede',
		flexDirection: 'row',
		padding: 5,
	},
	input:{
		flex: 1,
		marginHorizontal: 5,
	},
	icon:{
		marginHorizontal: 5,

	},
	buttonContainer:{
		width: 40,
		height: 40,
		backgroundColor: '#3777f0',
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText:{
		color: 'white',
		fontSize: 35,

	},

	
})


export default MessageInput;