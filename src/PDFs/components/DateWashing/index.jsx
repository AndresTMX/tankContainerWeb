import { View, Text, Image } from "@react-pdf/renderer";
import { dateInText, currentDate } from "../../../Helpers/date";
import { LogoJuiceProducts, ImageCert1, LogoKosher } from "../../../resourcesLinks";
import { dateMXFormat, dateExpiration } from "../../../Helpers/date";

function DateWashing({ dataCerd }) {

    const { folio, numLavado, temperature, dateInit, dateEnd, cliente, numero_taque, numero_pipa, tipo, transportista, cargas_previas, urlString, checkIn, checkOut, duration, logo } = dataCerd || {};

    const numero_carga = `${numero_taque || numero_pipa} ${tipo != 'pipa' ? tipo : ''}`;

    const renderLogo = logo === 'juice'? LogoJuiceProducts : LogoKosher;

    return (
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>

            <View style={{ display: 'flex', flexDirection: 'column', width: '58%', alignItems: 'flex-start', }}>

                <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', width: '100%' }}>

                    <View style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '30%' }}>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >Date:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >Client:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >TANK NUMBER:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >TRANSPORT:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >AUTHORIZE:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >PREVIOUS LOAD 1</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >PREVIOUS LOAD 2</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >PREVIOUS LOAD 3</Text>

                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >CHECK IN:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >CHECK OUT:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >TIME:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >DATE EXPIRY:</Text>


                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '70%' }}>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{dateInText(dateInit)}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{cliente}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{numero_carga}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{transportista}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >CARTER KEASER</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{cargas_previas.carga1}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{cargas_previas.carga2}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{cargas_previas.carga3}</Text>

                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{dateMXFormat(checkIn)}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{checkOut ? dateMXFormat(checkOut) : 'pending'}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{`${duration} MIN`}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{dateExpiration(dateEnd)}</Text>
                    </View>

                </View>

            </View>

            <View style={{ display: 'flex', flexDirection: 'column', width: '40%', alignItems: 'flex-end', }}>

                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', height: '100px', position: 'relative', top: '-60px' }}>
                    <Image src={renderLogo} />
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', width: '100%', position: 'relative', top: '-55px' }}>

                    <View style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '50%' }}>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >Service Order:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >WASH TYPE:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >TEMP Wash:</Text>
                        <Text style={{ fontSize: '10px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', padding: '4px' }} >SWAB TEST</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >Dome</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >Valve</Text>

                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '50%' }}>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{folio}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{numLavado}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{temperature}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '5px' }}> </Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{urlString[0].value || 0}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{urlString[1].value || 0}</Text>
                    </View>

                </View>

                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', height: '100px', position: 'relative', top: '-50px' }}>
                    <Image src={ImageCert1} />
                </View>

            </View>

        </View>
    );
}

export { DateWashing };