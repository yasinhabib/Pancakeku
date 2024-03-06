import { Button, View } from "react-native-ui-lib"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from "react-redux"
import { setVisible } from "../redux/slices/inputModal";

const ExpenseIncome = () => {
    const dispatch = useDispatch()
    
    return(
        <View style={{
            flexDirection:'row',
            alignItems:'flex-start',
            gap: 16,
            padding: 16
        }}>
            <Button 
                label="Pemasukan" 
                flexG 
                borderRadius={8} 
                backgroundColor={'#66bb6a'}
                iconSource={() => <Ionicons name="add-circle-outline" size={24} color="white" />}
                labelProps={{style:{fontSize: 24, color: 'white'}}}
                onPress={() => dispatch(setVisible({visible: true, title: 'Pemasukan'}))}
            />
            <Button 
                label="Pengeluaran" 
                flexG 
                borderRadius={8} 
                backgroundColor={'#f44336'}
                iconSource={() => <Ionicons name="remove-circle-outline" size={24} color="white" />}
                labelProps={{style:{fontSize: 24, color: 'white'}}}
                onPress={() => dispatch(setVisible({visible: true, title: 'Pengeluaran'}))}
            />
            
        </View>
    )
}

export default ExpenseIncome