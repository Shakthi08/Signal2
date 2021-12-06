import * as React from 'react';

import { Text, Image, View, StyleSheet, FlatList, Pressable } from 'react-native';
import UserItem from '../components/UserItem';

import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';

export default function UsersScreen() {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    //query users

    const fetchUsers = async () => {
      const fetchedUsers = await DataStore.query(User);
      setUsers(fetchedUsers);
    };
    fetchUsers(); 

  }, [])


  return (
      <View style={styles.page}>
        <FlatList 
          data={users}
          renderItem={({ item }) => <UserItem user={item} />}
          showsVerticalScrollIndicator={true}
         />

      
      </View>  
   );
}


const styles  = StyleSheet.create({
  page:{
    backgroundColor: 'white',
    flex: 1,
  },
});