import React from 'react';
import { Text, Image, View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';

export default function ChatRoomItem({ chatRoom }) {
  const user = chatRoom.users[1];

  const navigation = useNavigation();

  const onPress = () => {
    console.warn("you pressed: ", user.name);
    navigation.navigate('ChatRoom', { id: chatRoom.id });

  }

    return(
        <Pressable onPress={onPress} style={styles.container}>

          {/* User profile */}
          <Image source={{ uri: user.imageUri }} style={styles.image} />

          {/* Notifications */}

          {chatRoom.newMessages ? <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
          </View> : null}


          {/* Content */}
          <View style={styles.rightContainer}>
            <View style={styles.row}>
              {/* Name */}
              <Text style={styles.name}>{user.name}</Text>
              {/* Time */}
              <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
            </View>
            {/* Last message */}
            <Text style={styles.text}>{chatRoom.lastMessage.content}</Text>
          </View>
          
        </Pressable>
    );
}

