import { View, Image, Text, } from "@react-pdf/renderer";

function RecapEvidencesProforma({ arrayEvidences }) {
    return (
        <>
            {arrayEvidences.map((evidence) => (
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '220px', border: 1, borderStyle: 'solid', borderColor: 'gray' }}>

                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', width: '110px', height: '110px' }}>
                        <Text style={{ fontSize: '8px' }}>DAÑO</Text>
                        <View style={{ width: '100%', height: '100%' }}>
                            <Image
                                sx={{ width: '100px', height: '100px' }}
                                src={evidence.image}
                                alt={evidence.question}
                            />
                        </View>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', width: '110px', height: '110px' }}>
                        <Text style={{ fontSize: '8px' }}>REPARACIÓN</Text>
                        <View style={{ width: '100%', height: '100%' }}>
                            <Image
                                sx={{ width: '100px', height: '100px' }}
                                src={evidence.imageEvidence}
                                alt={evidence.question}
                            />
                        </View>
                    </View>

                </View>
            ))}

        </>
    );
}

export { RecapEvidencesProforma };