import { View, Text, Image } from "@react-pdf/renderer";
import { dateInText, currentDate } from "../../../Helpers/date";
import { LogoJuiceProducts, ImageCert1 } from "../../../resourcesLinks";

function DateWashing() {
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
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >{dateInText(currentDate)}</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >AGMARK TANKER</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >AGMU 580317-6</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >Fletes y Materiales Forsis S.A. de C.V.</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >CARTER KEASER</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >ORANGE JUICE CONCENTRATE</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >ORANGE JUICE CONCENTRATE</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >LEMON JUICE</Text>

                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >DECEMBER 04 ST 2023 19:40</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >DECEMBER 04 ST 2023 20:20</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} > 40 MIN</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >07/12/2023 20:20</Text>
                    </View>

                </View>

            </View>

            <View style={{ display: 'flex', flexDirection: 'column', width: '40%', alignItems: 'flex-end', }}>

                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', height: '100px', position: 'relative', top: '-60px' }}>
                    <Image src={LogoJuiceProducts} />
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', gap: '5px', width: '100%', position:'relative', top:'-55px' }}>

                    <View style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '50%' }}>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >Service Order:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >WASH TYPE:</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >TEMP Wash:</Text>
                        <Text style={{ fontSize: '10px', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', padding: '4px' }} >SWAB TEST</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >Dome</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px' }} >Valve</Text>

                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '50%' }}>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >3071</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >2</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >75°</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '5px' }}> </Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >0</Text>
                        <Text style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px', backgroundColor: '#b4c6e7' }} >0</Text>
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