import { View, Image, Text, } from "@react-pdf/renderer";

function RecapEvidencesProforma({ imageDamage, imageRepair }) {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>

            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', width: '100%', height: '100%' }}>
                <Text style={{fontSize:'8px'}}>DAÑO</Text>
                <View style={{ width: '100%', height: '100%' }}>
                    <Image 
                    sx={{width:'100px', height:'100px'}}
                    src={imageDamage} 
                    alt={'ewedq'} 
                    />
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', width: '100%', height: '100%' }}>
                <Text style={{fontSize:'8px'}}>REPARACIÓN</Text>
                <View style={{ width: '100%', height: '100%' }}>
                    <Image 
                    sx={{width:'100px', height:'100px'}}
                    src={imageRepair} 
                    alt={'ewedq'} 
                    />
                </View>
            </View>

        </View>
    );
}

export { RecapEvidencesProforma };