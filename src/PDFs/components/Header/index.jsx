import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ServiContainerLogo } from "../../../resourcesLinks";

function Hedader() {
    return (
        <>

        </>
    );
}

export { Hedader };

export function HeaderEIR() {

    const styles = StyleSheet.create({

        ContainerHeader: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '10%',
            backgroundColor: 'whitesmoke',
            border:1,

        },
        ContainerRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '100%',
            width: '100%',
        },
        ContainerLogo: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
            height: '100%',
            width: '25%',
        },
        ContainerData: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
            height: '100%',
            width: '50%',
        },
        BoxText: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            width:'90%',
        },
        TextNormal: {
            fontSize: '10px'
        },
        ContainerFolio:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
            height:'100%',
            width:'20%',
            padding:'5px'
        }
    })

    return (
        <>
            <View style={styles.ContainerHeader}>

                <View style={styles.ContainerRow}>

                    <View style={styles.ContainerLogo}>
                        <Image src={ServiContainerLogo} />
                    </View>

                    <View style={styles.ContainerData}>

                        <View style={{...styles.BoxText, margin:'0px',}}>
                            <Text style={{...styles.TextNormal, width:'100%', textAlign:'start'}}>
                                Calle Antonio Castillo Palafox S/N, Colonia Pozo 50
                            </Text>
                        </View>

                        <View style={{...styles.BoxText, margin:'0px',}}>
                            <Text style={{...styles.TextNormal, width:'100%', textAlign:'start'}}>
                                Municipio Alamo Tempache, Veracruz, Mexico CP 92730
                            </Text>
                        </View>

                        <View style={{...styles.BoxText, margin:'0px',}}>
                            <Text style={{...styles.TextNormal, width:'100%', textAlign:'start'}}>
                              Tel. 22 92 64 97 29
                            </Text>
                        </View>

                    </View>

                    <View style={styles.ContainerFolio}>

                        <View style={{border:'1', borderStyle:'solid', borderColor:'black', width:'100%'}}>
                            <View  style={{backgroundColor:'black'}} >
                                <View style={styles.BoxText}>
                                    <Text style={{...styles.TextNormal, color:'white'}}>Folio</Text>
                                </View>
                            </View>

                            <View>
                                <View style={styles.BoxText}>
                                    <Text style={styles.TextNormal}>No° 458925</Text>
                                </View>
                            </View>
                        </View>

                    </View>


                </View>

            </View>
        </>
    )
}