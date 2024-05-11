import { Text, View } from "react-native-ui-lib"
import Ionicons from '@expo/vector-icons/Ionicons';

const Legend = () => {

    return(
        <View 
            padding-10  
            style={{
                flexDirection: 'row',
                height: 60, 
                flexBasis: 'auto', 
                flex: 1
            }} 
        >
            <View
                style={{
                    flexDirection: 'column',
                    width: '50%'
                }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8
                }}>
                    <Ionicons name="ellipse" color="orange" size={36}/>
                    <Text style={{position: 'absolute', top: 6, left: 13, fontSize: 12, color: 'white'}} >1</Text>
                    <Text style={{fontSize: 10}} >Tanggal yang dipilih</Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8
                }}>
                    <Text style={{fontSize: 12, color: '#0BBDF2', textAlign: 'center', width: 36}} >1</Text>
                    <Text style={{fontSize: 10}} >Tanggal hari ini</Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    width: '50%'
                }}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8
                }}>
                    <Ionicons name="ellipse" color="#66bb6a" size={8}/>
                    <Text style={{fontSize: 10}} >Tanggal memiliki data pemasukan</Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8
                }}>
                    <Ionicons name="ellipse" color="#f44336" size={8}/>
                    <Text style={{fontSize: 10}} >Tanggal memiliki data pengeluaran</Text>
                </View>
            </View>
        </View>
    )
}

export default Legend