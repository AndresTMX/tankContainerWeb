import { View, Text, } from "@react-pdf/renderer";
import { dateMXFormat, dateInText } from "../../../Helpers/date";

function DataProforma({ typeData, dataHeader }) {

    const { folio, ingreso, nombre_cliente, checkOut, numero_tanque } = dataHeader;

    const fecha = dateMXFormat(checkOut);
    const fechaEscrita = dateInText(checkOut);

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
                                text={fecha}
                                widthLabel={'50px'}
                                widthText={'60px'}
                            />

                            <BoxText
                                label={'No. Folio'}
                                text={folio}
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
                                    text={nombre_cliente}
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

            {typeData === 'detallado' &&
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
                                gap: '10px',
                            }}
                        >
                            <BoxText
                                label={'SUCURSAL : '}
                                text={'Alamo Temapache, Veracruz'}
                                widthLabel={'60px'}
                                widthText={'140px'}
                            />

                            <BoxText
                                label={'FECHA : '}
                                text={fechaEscrita}
                                widthLabel={'40px'}
                                widthText={'170px'}
                            />

                            <BoxText
                                label={'FOLIO : '}
                                text={folio}
                                widthLabel={'40px'}
                                widthText={'100px'}
                            />

                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%'

                            }}
                        >

                            <BoxText
                                label={'Contabilidad :'}
                                text={'Lic. Lucero Castillejos'}
                                widthLabel={'60px'}
                                widthText={'100px'}
                            />

                            <BoxText
                                label={'Equipment Manager :'}
                                text={'Zach Baker'}
                                widthLabel={'90px'}
                                widthText={'100px'}
                            />

                        </View>

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%'

                            }}
                        >

                            <BoxText
                                label={'TRIMODAL DE MEXICO, SC.'}
                                text={'Callejon de la pastora S/N \n Manuel Contreras 91899 \n 229-939-5898'}
                                widthLabel={'120px'}
                                widthText={'120px'}
                                direction={'column'}
                                height={'50px'}
                                padding={'0px'}
                            />

                            <BoxText
                                label={'AGMARK LOGISTIC LLC.'}
                                text={'Street: 222 2nd Ave North Suite 311  \n Nashville, Tennessee 37201  \n 615-514-6634'}
                                widthLabel={'120px'}
                                widthText={'120px'}
                                direction={'column'}
                                height={'50px'}
                                padding={'0px'}
                            />

                        </View>

                    </View>
                </>
            }
        </>
    );
}

export { DataProforma };

export function BoxText({ label, text, widthLabel, widthText, direction, fontSize, padding, height }) {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: direction ? direction : 'row',
                alignItems: 'center',
                borderStyle: 'solid',
                height: height ? height : '15px',
                border: 1,
                gap: '3px',
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffcc01',
                    padding: padding ? padding : '2px',
                    height: '100%',
                    width: widthLabel

                }}
            >
                <Text style={{ fontSize: fontSize ? fontSize : '8px', }}>{label}</Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: widthText,
                    paddingLeft: '3px',
                    paddingRight: '5px',
                }}
            >
                <Text style={{ fontSize: fontSize ? fontSize : '8px', }}>{text}</Text>
            </View>
        </View>
    )
}