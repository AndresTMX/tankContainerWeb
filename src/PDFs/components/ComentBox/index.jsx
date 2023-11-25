import { View , Text} from "@react-pdf/renderer";

function ComentBox({widht, height, coment}) {
    return ( 
        <View style={{widht: widht, height: height}}>
            <View style={{ display:'flex', flexDirection:'column', widht:'100%', justifyContent:'center', alignItems:'center', backgroundColor:'black', height:'15%' }}>
                <Text style={{widht:'100%', textAlign:'center', color:'white', fontSize: '10px', padding:'2px'}}>Comentarios</Text>
            </View>
            <View style={{ display:'flex', flexDirection:'column', widht:'100%', justifyContent:'start', alignItems:'center',  backgroundColor:'whitesmoke', height:'50%'}}>
                <Text style={{widht:'100%', textAlign:'start', fontSize: '10px' , padding:'2px'}}>{coment}</Text>
            </View>
                <Text style={{widht:'100%', textAlign:'start', fontSize: '7px', height:'35%'}}>
                NOTA: FAVOR VERIFICAR LAS AVERIAS LOCALIZADAS EN EL CONTENEDOR DE LO CONTRARIO SI EL 
                DAÑO NO FUE REPORTADO AL MOMENTO DE RECIBIR NO ACEPTAMOS  NINGUNA RESPONSABILIDAD 
                POSTERIOR</Text>
        </View>
     );
}

export {ComentBox};