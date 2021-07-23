import {Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width: dW, height: dH} = Dimensions.get('window');

const settings = {
  colors: {
    mainColor: '#fff',
    secondColor: '#000',
  },
};

export {dW, dH, settings, FontAwesome5, Ionicons, MaterialCommunityIcons};
