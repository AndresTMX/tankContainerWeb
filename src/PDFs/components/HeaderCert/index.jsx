import { View, Document, Text, Image, } from "@react-pdf/renderer";
import { currentDate, dateMXFormat } from "../../../Helpers/date";
import { TankContainerLogo } from "../../../resourcesLinks"

function HeaderCert() {

    return (
        <View style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                <View style={{ display: 'flex', alignItems: 'center', height: 'auto', width: '30%' }}>
                    <Image src={TankContainerLogo} />
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-start', position:'relative', top:'-25px' }}>
                    <Text style={{ fontWeight: 'semibold', fontSize: '9px', fontFamily: 'Helvetica-Bold' }}>Código: TKC-FO-AC-21</Text>
                    <Text style={{ fontWeight: 'semibold', fontSize: '9px', fontFamily: 'Helvetica-Bold' }}>Elaborado: {dateMXFormat(currentDate)}</Text>
                    <Text style={{ fontWeight: 'semibold', fontSize: '9px', fontFamily: 'Helvetica-Bold' }}>Revisión: 2</Text>
                </View>

            </View>

            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Text style={{ fontWeight: 'semibold', fontSize: '12px', fontFamily: 'Helvetica-Bold' }}>CLEANNESS CERTIFICATE</Text>
            </View>

        </View>
    );
}

export { HeaderCert };
