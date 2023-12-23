import { View, Text, Image } from "@react-pdf/renderer";
import { LogoProformaSencilla, ServiContainerLogo } from "../../../resourcesLinks";

function HeaderProforma({ typeHeader }) {
    return (
        <View>

            {(typeHeader === 'sencillo') &&
                <>
                    <View
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '75px',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>

                        <View
                            style={{
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                                alignItems: 'flex-start'
                            }}>
                            <Image
                                style={{ height: '70px', width: 'auto' }}
                                src={ServiContainerLogo}
                                alt="logo"
                            />
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                width: '100%',
                                height: '75px',
                                alignItems: 'flex-end',
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: '12px',
                                    backgroundColor: '#ffcc01',
                                    padding: '5px',
                                    fontFamily: 'Helvetica-Bold',

                                }}
                            >SERVI CONTAINER INTEGRAL SA DE CV
                            </Text>

                            <Text
                                style={{
                                    fontSize: '9px',
                                    paddingTop: '5px'
                                }}
                            >
                                PROFORMA
                            </Text>
                        </View>

                    </View>
                </>
            }

            {(typeHeader === 'detallado') &&
                <>
                    <View
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '75px',
                            flexDirection: 'row',
                            alignItems: 'start',
                            justifyContent: 'space-between'
                        }}>

                        <View
                            style={{
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                                alignItems: 'flex-start'
                            }}>
                            <Image
                                style={{ height: '70px', width: 'auto' }}
                                src={ServiContainerLogo}
                                alt="logo"
                            />
                        </View>

                        <View
                            style={{
                                display: 'flex',
                                width: '100%',
                                height: '75px',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: '12px',
                                    backgroundColor: '#ffcc01',
                                    padding: '5px',
                                    fontFamily: 'Helvetica-Bold',

                                }}
                            >SERVI CONTAINER INTEGRAL SA DE CV
                            </Text>

                            <Text
                                style={{
                                    fontSize: '9px',
                                    paddingTop: '5px'
                                }}
                            >
                                PROFORMA DE PAGO DE FACTURACION
                            </Text>
                        </View>

                    </View>
                </>
            }


        </View>
    );
}

export { HeaderProforma };