import { View, Text, } from "@react-pdf/renderer";

function TablesCert({ sellos, tipoLavado }) {

    const sellosDome = sellos? sellos.filter((sello) => sello.tipo === 'domo'):[];
    const sellosValvule = sellos?  sellos.filter((sello) => sello.tipo === 'superior'):[];

    return (
        <>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', position: 'relative', top: '-20px' }}>

                <View style={{ display: 'flex', flexDirection: 'column', width: '40%', border: 2, borderStyle: 'solid' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <Text style={{ width: '20%', fontSize: '8px', borderRight: 1, padding: '4px' }}>
                            YES
                        </Text>
                        <Text style={{ width: '80%', fontSize: '8px', padding: '4px' }}>
                            CLEANING OF "O-RINGS"
                        </Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>
                        <Text style={{ width: '20%', fontSize: '8px', borderRight: 1, padding: '4px' }}>
                            NO
                        </Text>
                        <Text style={{ width: '80%', fontSize: '8px', padding: '4px' }}>
                            RINSE
                        </Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>
                        <Text style={{ width: '20%', fontSize: '8px', borderRight: 1, padding: '4px' }}>
                            {tipoLavado === 'dry' ? 'YES' : 'NO'}
                        </Text>
                        <Text style={{ width: '80%', fontSize: '8px', padding: '4px' }}>
                            DRY
                        </Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>
                        <Text style={{ width: '20%', fontSize: '8px', borderRight: 1, padding: '4px' }}>
                            YES
                        </Text>
                        <Text style={{ width: '80%', fontSize: '8px', padding: '4px' }}>
                            VALVES VERIFICATION
                        </Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>
                        <Text style={{ width: '20%', fontSize: '8px', borderRight: 1, padding: '4px' }}>
                            NO
                        </Text>
                        <Text style={{ width: '80%', fontSize: '8px', padding: '4px' }}>
                            CHANGE OF GASKET DOMO
                        </Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>
                        <Text style={{ width: '20%', fontSize: '8px', borderRight: 1, padding: '4px' }}>
                            YES
                        </Text>
                        <Text style={{ width: '80%', fontSize: '8px', padding: '4px' }}>
                            CHANGE OF GASKET VALVE UP
                        </Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>
                        <Text style={{ width: '20%', fontSize: '8px', borderRight: 1, padding: '4px' }}>
                            YES
                        </Text>
                        <Text style={{ width: '80%', fontSize: '8px', padding: '4px' }}>
                            LEAK CHECKING
                        </Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1 }}>
                        <Text style={{ width: '20%', fontSize: '8px', borderRight: 1, padding: '4px' }}>
                            YES
                        </Text>
                        <Text style={{ width: '80%', fontSize: '8px', padding: '4px' }}>
                            SEALS
                        </Text>
                    </View>

                </View>

                <View style={{ display: 'flex', flexDirection: 'column', width: '55%', }}>
                    <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }}>DOME</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        {sellosDome.map((sello, index) => (
                            <Text
                                key={`${sello.sello}_${index}`}
                                style={{ fontSize: '8px', textTransform: 'uppercase', padding: '2px', backgroundColor: '#b4c6e7', border: 1, width: '19%' }}>
                                {sello.sello}
                            </Text>
                        ))}
                    </View>

                    <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }}>VALVE UP</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        {sellosValvule.map((sello, index) => (
                            <Text
                                key={`${sello.sello}_${index}`}
                                style={{ fontSize: '8px', textTransform: 'uppercase', padding: '2px', backgroundColor: '#b4c6e7', border: 1, width: '19%' }}>
                                {sello.sello}
                            </Text>
                        ))}
                    </View>
                </View>

            </View>
        </>
    );
}

export { TablesCert };