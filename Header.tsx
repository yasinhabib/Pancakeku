import { Button, Colors, Text, View } from "react-native-ui-lib"
import { FontAwesome } from '@expo/vector-icons';

const Header = () => {
    return(
        <View 
            padding-10  
            style={{
                flexDirection: 'row',
                height: 60, 
                flexBasis: 'auto', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                backgroundColor: 'chocolate'
            }} 
        >
            <Text adjustsFontSizeToFit style={{fontSize: 24, color: Colors.grey80}}>Pancakeku</Text>
            <Button 
            link={true}
            outline={false}
            iconSource={() => <FontAwesome name={'plus-circle'} size={24} color={'cornsilk'}/>}/>
        </View>
    )
}

export default Header