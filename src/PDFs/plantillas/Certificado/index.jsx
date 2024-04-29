import { View, Document, Text, Image } from "@react-pdf/renderer";
import { SimplePageLetter } from "../../components/DocLetter";
import { HeaderCert } from "../../components/HeaderCert";
import { DateWashing } from "../../components/DateWashing";
import { TablesCert } from "../../components/TablesCert";
import { ImageCert2, FirmaCalidad, FirmaManiobras } from "../../../resourcesLinks";

export function Certificado({ dataCert }) {

    const {
        numLavado,
        temperature,
        numero_tanque,
        numero_pipa,
        tipoLavado,
        tipo_lavado,
        tipo_logo,
        checkIn,
        dateEnd,
        sellos,
        checkOut,
        tipo,
        cliente,
        duration,
        transportista,
        cargas_previas,
        folio,
        URL

    } = dataCert || {};

    return (
        <Document>
            <SimplePageLetter page={'1'} numPages={'1'}>
                <HeaderCert />
                <DateWashing dataCert={dataCert} />
                <TablesCert sellos={sellos} tipoLavado={tipoLavado} />
                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'start', gap: '10px', position: 'relative', top: '-10px' }}>

                    <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', width: '100%' }}>
                        <Text style={{ fontSize: '9px', textAlign: 'center' }}>REMARKS</Text>
                        <Text style={{ fontSize: '9px', textAlign: 'center', borderBottom: 1, width: '70%' }}></Text>
                    </View>

                    <Text style={{ fontSize: '8px', textAlign: 'center' }}>
                        {numLavado === 2 ?
                            "   TANK CONTAINER VERACRUZ S.A DE C.V CERTIFIES THAT THE TANK MENTIONED HAS BEEN WASHED WITH POTABLE WATER, CLEANER SOLUTION (ULTRA KI 20,000-25,000 PPM COMP.: SODIUM HYDROXIDE AND SODIUM GLUCONATE), AND SANITIZER (CETIC 100 150 A 200 PPM COMP.: PERACETIC ACID AND PEROXIDE HIDROGEN).  AFTER THE TANK´S INTERIOR CLEANING, THE VALVES AND PLASTIC-RINGS WERE WASHED AND CHECKED.  THE TANK IS ODOR FREE AND STEAM OR GAS FREE, AS WELL AS ANY POLLUTING WASTE. "
                            :
                            "TANK CONTAINER VERACRUZ S.A DE C.V CERTIFIES THAT THE TANK MENTIONED HAS BEEN WASHED WITH POTABLE WATER, DEGREASER (DETERPROL 20,000-25,000 PPM COMP.: POTASIUM HYDROXIDE AND SODIUM HYPOCHLORITE), CLEANER SOLUTION (ULTRA KI 20,000-25,000 PPM COMP.: SODIUM HYDROXIDE AND SODIUM GLUCONATE), AND SANITIZER (CETIC 100 150 A 200 PPM COMP.: PERACETIC ACID AND PEROXIDE HIDROGEN). AFTER THE TANK´S INTERIOR CLEANING, THE VALVES AND PLASTIC-RINGS WERE WASHED AND CHECKED.  THE TANK IS ODOR FREE AND STEAM OR GAS FREE, AS WELL AS ANY POLLUTING WASTE. "
                        }
                    </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-around', gap: '10px' }}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '1px', alignItems: 'center', position: 'relative', top: '-10px' }}>
                        <Image style={{ height: '40px', width: 'auto' }} src={FirmaCalidad} />
                        <Text style={{ fontSize: '9px', borderTop: 1, fontFamily: 'Helvetica-Bold', padding: '2px' }}>ING. EDITH APARICIO MÉNDEZ</Text>
                        <Text style={{ fontSize: '8px', fontFamily: 'Helvetica-Bold' }}>Quality System Responsible</Text>
                    </View>

                    <Image style={{ height: '60px', width: 'auto', position: 'relative', top: '-10px' }} src={ImageCert2} />

                    <View style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', position: 'relative', top: '-10px' }}>
                        <Image style={{ height: '40px', width: 'auto' }} src={FirmaManiobras} />
                        <Text style={{ fontSize: '9px', borderTop: 1, fontFamily: 'Helvetica-Bold', padding: '2px' }}>ING. ANGEL D. NICOLAS ORTEGA</Text>
                        <Text style={{ fontSize: '8px', fontFamily: 'Helvetica-Bold' }}>Operative Responsible</Text>
                    </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', gap: '5px', position: 'absolute', bottom: '5px', width: '100%', alignItems: 'center' }}>
                    <Text style={{ fontSize: '8px', fontFamily: 'Helvetica-Bold' }}>
                        NOTE:THIS CERTIFICATE IS NOT VALID IF THE TANK IS NOT SEALED IN THE MANHOLE, UP VALVE AND DISCHARGE VALVE
                    </Text>
                    <View style={{ width: '100%', borderTop: 2, borderBottom: 2, borderColor: '#060994', padding: '2px' }}>     </View>
                    <Text style={{ fontSize: '8px', fontFamily: 'Helvetica-Bold' }}>
                        AGUSTIN MELGAR S/N COL. NIÑOS HEROES C.P. 92737 ALAMO, VER. CEL. 229 577 85 91
                    </Text>
                    <Text style={{ fontSize: '8px', fontFamily: 'Helvetica-Bold' }} >email: ccalidad@tankcontainer.com</Text>
                </View>
            </SimplePageLetter>
        </Document>
    );
}

