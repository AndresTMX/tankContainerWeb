import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { dateMXFormat, datetimeMXFormat } from "../../../Helpers/date";

function DataHeader({ data }) {

    const fechaActual = dateMXFormat(new Date());
    const horaActual = datetimeMXFormat(new Date());

    const style = StyleSheet.create({

        ContainerDataHeader: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '5px',
            backgroundColor: 'whitesmoke',
            border: 1
        },

        BoxData: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '5px',
        }


    })

    return (
        <>
            <View style={style.ContainerDataHeader}>

                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: '5px', }}>

                    <View style={style.BoxData}>
                        <Text style={{ display: 'flex', fontSize: '10px' }}> No° de Tanque :</Text>
                        <Text style={{ display: 'flex', borderBottom: 1, fontSize: '10px' }}>{data.numero_tanque}</Text>
                    </View>

                    <View style={style.BoxData}>
                        <Text style={{ display: 'flex', fontSize: '10px' }}> Fecha :</Text>
                        <Text style={{ display: 'flex', borderBottom: 1, fontSize: '10px' }}>{data.fechaActual || fechaActual}</Text>
                    </View>

                    <View style={style.BoxData}>
                        <Text style={{ display: 'flex', fontSize: '10px' }}> Hora: </Text>
                        <Text style={{ display: 'flex', borderBottom: 1, fontSize: '10px' }}>{data.horaActual || horaActual}</Text>
                    </View>


                    <View style={style.BoxData}>
                        <Text style={{ display: 'flex', fontSize: '10px' }}> Entrada: </Text>
                        <Text style={{ display: 'flex', borderBottom: 1, fontSize: '10px' }}>{data.dayInput}</Text>
                    </View>

                    <View style={style.BoxData}>
                        <Text style={{ display: 'flex', fontSize: '10px' }}> Salida: </Text>
                        <Text style={{ display: 'flex', borderBottom: 1, fontSize: '10px' }}>{data.fechaActual|| fechaActual}</Text>
                    </View>


                </View>

                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'start', padding: '5px', gap: '15px' }}>

                    <View style={style.BoxData}>
                        <Text style={{ display: 'flex', fontSize: '10px' }}> Cliente: </Text>
                        <Text style={{ display: 'flex', borderBottom: 1, fontSize: '10px' }}>{data.cliente}</Text>
                    </View>

                    <View style={style.BoxData}>
                        <Text style={{ display: 'flex', fontSize: '10px' }}> No° de unidad :</Text>
                        <Text style={{ display: 'flex', borderBottom: 1, fontSize: '10px' }}>{data.tracto}</Text>
                    </View>


                </View>

            </View>
        </>
    );
}

export { DataHeader };