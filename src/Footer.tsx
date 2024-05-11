import { Text, View } from "react-native-ui-lib"
import packageJson from '../package.json';

const Footer = () => {

    return(
        <View 
            padding-10  
            style={{
                flexDirection: 'column',
                height: 60, 
                flexBasis: 'auto', 
                alignItems: 'flex-end', 
                justifyContent: 'flex-end',
                flex: 1
            }} 
        >
            <Text style={{fontSize: 10}}>Finotes v{packageJson.version}</Text>
        </View>
    )
}

export default Footer