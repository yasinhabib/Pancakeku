import { Button, Colors, Text, View } from "react-native-ui-lib"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from "react-redux";
import { setVisible } from "./redux/slices/inputModal";

const Header = () => {
    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(setVisible(true))
    }

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
                color="white"
                iconSource={() => <Ionicons name="add-circle-outline" size={32} color="white" />}
                onPress={onClick}
            />
        </View>
    )
}

export default Header