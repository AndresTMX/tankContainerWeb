import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

function SimpleTable({ list }) {

    const style = StyleSheet.create({
        ContainerTable: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: 1,
        },
        HeaderTable: {
            display: 'flex',
            flexDirection: 'row',
            borderBottom: 1,
            width: '100%',
            backgroundColor: 'black'
        }
    })

    return (
        <View style={style.ContainerTable}>

            <View style={style.HeaderTable}>

                <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '10%' }}>
                    <Text style={{ fontSize: '10px', color: 'white' }}>
                        N°
                    </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '30%' }}>
                    <Text style={{ fontSize: '10px', color: 'white' }}>
                        Conceptops
                    </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '30%' }}>
                    <Text style={{ fontSize: '10px', color: 'white' }}>
                        Estado
                    </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '30%' }}>
                    <Text style={{ fontSize: '10px', color: 'white' }}>
                        Comentarios
                    </Text>
                </View>

            </View>

        </View>
    );
}

export { SimpleTable };

export function SimpleRow({ item, index }) {

    const style = StyleSheet.create({
        Row: {
            display: 'flex',
            flexDirection: 'row',
            borderBottom: 1,
            width: '100%',
            backgroundColor: 'whitesmoke'
        },
    })


    return (
        <View style={style.Row}>

            <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '10%' }}>
                <Text style={{ fontSize: '10px', color: 'white' }}>
                    N°
                </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '30%' }}>
                <Text style={{ fontSize: '10px', color: 'white' }}>
                    Conceptops
                </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '30%' }}>
                <Text style={{ fontSize: '10px', color: 'white' }}>
                    Estado
                </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '30%' }}>
                <Text style={{ fontSize: '10px', color: 'white' }}>
                    Comentarios
                </Text>
            </View>

        </View>
    )
}