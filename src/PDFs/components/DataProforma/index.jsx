import { View, Text, } from "@react-pdf/renderer";

function DataProforma({ typeData }) {
    return (
        <>
            {typeData === 'sencillo' &&
                <>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: '5px',
                        }}
                    >

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '20px',
                            }}
                        >
                            <BoxText 
                            label={'FECHA'} 
                            text={'9/20/2023'}
                            widthLabel={'50px'}
                            widthText={'60px'}
                            />

                            <BoxText 
                            label={'No. REFERENCIA'} 
                            text={'SCIALM2023/094'}
                            widthLabel={'80px'}
                            widthText={'70px'}
                            />

                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                gap: '5px',
                            }}
                        >
                            <View style={{ width: '90%' }}>
                                <BoxText 
                                label={'DOMICILIO'} 
                                text={'TCALLEJON DE LA PASTORA NO. 20 CERVANTES PADILLA Y SUAREZ PEREDO COL. MANUEL CONTRERAS CP. 91899'}
                                widthLabel={'50px'}
                                widthText={'90%'}
                                />
                            </View>

                            <View style={{ width: '40%' }}>
                                <BoxText 
                                label={'CLIENTE'} 
                                text={'TRIMODAL DE MEXICO, S.C.'}
                                widthLabel={'50px'}
                                widthText={'auto'}
                                />
                            </View>

                            <View style={{ width: '30%' }}>
                                <BoxText 
                                label={'RFC'} 
                                text={'TME-020829-1A8'}
                                widthLabel={'50px'}
                                widthText={'100px'}
                                />
                            </View>

                        </View>

                    </View>
                </>
            }
        </>
    );
}

export { DataProforma };

export function BoxText({ label, text, widthLabel, widthText }) {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderStyle: 'solid',
                height: '11px',
                border: 1,
                gap: '3px',
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'center',
                    backgroundColor: '#ffcc01',
                    paddingLeft: '3px',
                    paddingRight: '5px',
                    height: '100%',
                    width:widthLabel

                }}
            >
                <Text style={{ fontSize: '8px',}}>{label}</Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '8px',
                    height: '100%',
                    width: widthText,
                    paddingLeft: '3px',
                    paddingRight: '5px',
                }}
            >
                <Text style={{ fontSize: '8px', }}>{text}</Text>
            </View>
        </View>
    )
}