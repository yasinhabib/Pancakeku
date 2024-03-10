import { Button, Colors, Text, View } from "react-native-ui-lib"

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
            <Text adjustsFontSizeToFit style={{ color: Colors.grey80}}>Finotes</Text>
        </View>
    )
}

export default Header