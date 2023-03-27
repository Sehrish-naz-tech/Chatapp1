import { TouchableOpacity, Text } from "react-native";

const Button= (props) => {

    return (
        <TouchableOpacity 
      onPress={() => props.onButtonPressed()}
       // onPress={() => alert('pressed')}
        style={{
          alignSelf: 'center',
          backgroundColor:'white',
          width: 100, height:50,
          justifyContent: 'center',
          borderRadius:10,
          margin:5
          }}>
          <Text style= {{color: 'blue', alignSelf: 'center',fontWeight: 'bold'}}>{props.title}</Text>
        </TouchableOpacity>
    
    )
}

export default Button