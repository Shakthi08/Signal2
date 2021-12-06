import { StyleSheet } from 'react-native';

const styles  = StyleSheet.create({
    container:{
      flexDirection: 'row',
      padding: 10,
    },
    image:{
      height: 50,
      width: 50,
      borderRadius: 30,
      marginRight: 10,
    },
    badgeContainer:{
      backgroundColor: '#3777f0',
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      position: 'absolute',
      left: 45,
      top: 10,
      borderColor: 'white',
      borderWidth: 1,
    },
    badgeText:{
      color: 'white',
      fontSize: 12,
  
    },
    rightContainer:{
      flex:1,
    },
    row:{
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    name:{
      fontWeight: 'bold',
      fontSize: 18,
    },
    text:{
      color: 'grey'
    },
});


export default styles;