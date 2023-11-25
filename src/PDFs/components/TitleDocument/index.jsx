import { Text, View, StyleSheet } from "@react-pdf/renderer";

function TitleDocument({title}) {

    const styles = StyleSheet.create({
        ContainerTitle:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            textAlign:'center',
            backgroundColor:'whitesmoke',
            height:'28px',
            border:1
        },

        BoxText:{
            display:'flex',
            width:'100%',
            flexDirection:'column',
            alignItems:'center',
            textAlign:'center',
        },
        TextTitle:{
            fontFamily: 'Helvetica-Bold',
            fontSize:'12px'
        }
    })

    return ( 
        <View style={styles.ContainerTitle}>
            <View style={styles.BoxText}>
                <Text style={styles.TextTitle}>{title}</Text>
            </View>
        </View>
     );
}

export {TitleDocument};