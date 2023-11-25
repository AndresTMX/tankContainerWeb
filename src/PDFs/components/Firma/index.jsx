import { View, Text } from "@react-pdf/renderer";

function Firma({firma, title, width}) {
    return ( 
        <View style={{display:'flex', flexDirection:'column', alignItems:'center', width:width, gap:'2px'}}>
            <View>

            </View>
            <View style={{display:'flex', flexDirection:'column', width:'100%', gap:'2px'}}>
                <Text style={{fontSize:'8px', borderTop:1, width:'100%', textAlign:'center', padding:'2px'}}>{title}</Text>
                <Text style={{fontSize:'8px', width:'100%', textAlign:'center'}}>Nombre y Firma</Text>
            </View>
        </View>
     );
}

export {Firma};