import { View, Document, Text, Image } from "@react-pdf/renderer";
import { SimplePageLetter } from "../../components/DocLetter";
import { HeaderCert } from "../../components/HeaderCert";
import { DateWashing } from "../../components/DateWashing";
import { TablesCert } from "../../components/TablesCert";
import { ImageCert2, FirmaCalidad, FirmaManiobras } from "../../../resourcesLinks";

function Certificado({ }) {


    return (
        <Document>
            <SimplePageLetter>
                <HeaderCert />
                <DateWashing />
                <TablesCert />
                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'start', gap: '10px', position: 'relative', top: '-40px' }}>

                    <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', width: '100%' }}>
                        <Text style={{ fontSize: '9px', textAlign: 'center' }}>REMARKS</Text>
                        <Text style={{ fontSize: '9px', textAlign: 'center', borderBottom: 1, width: '70%' }}></Text>
                    </View>

                    <Text style={{ fontSize: '8px', textAlign: 'center' }}>
                        TANK CONTAINER VERACRUZ S.A DE C.V CERTIFIES THAT THE TANK MENTIONED HAS BEEN WASHED WITH POTABLE WATER, CLEANER SOLUTION
                        ( BEVRO SHEEN 25 000- 40 000 PPM UKD ID CC2277721. COMP.: SODIUM HYDROXIDE), AND SANITIZER (OXONIA 2000 - 3000 PPM. COMP.:
                        PERACETIC ACID / PEROXYACETIC ACID (PS) ). AFTER THE TANK´S INTERIOR CLEANING, THE VALVES AND PLASTIC-RINGS WERE WASHED AND
                        CHECKED. THE TANK IS ODOR FREE AND STEAM OR GAS FREE, AS WELL AS ANY POLLUTING WASTE.
                    </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-around', gap: '10px' }}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '1px', alignItems: 'center', position: 'relative', top: '-40px' }}>
                        <Image style={{ height: '40px', width: 'auto' }} src={FirmaCalidad} />
                        <Text style={{ fontSize: '9px', borderTop: 1, fontFamily: 'Helvetica-Bold', padding: '2px' }}>ING. EDITH APARICIO MÉNDEZ</Text>
                        <Text style={{ fontSize: '8px', fontFamily: 'Helvetica-Bold' }}>Quality System Responsible</Text>
                    </View>

                    <Image style={{ height: '60px', width: 'auto', position: 'relative', top: '-40px' }} src={ImageCert2} />

                    <View style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', position: 'relative', top: '-40px' }}>
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
                    <Text style={{ fontSize: '8px', fontFamily: 'Helvetica-Bold' }} >email: ccalidad@tankcontainermexico.com</Text>
                </View>
            </SimplePageLetter>
        </Document>
    );
}

export { Certificado };
