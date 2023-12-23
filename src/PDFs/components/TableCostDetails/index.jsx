import { View, Text } from "@react-pdf/renderer";
import { CustomContainerTable, CustomItemTable } from "../SimpleTable";

function TableCostDetails({ typeProforma, total, iva, totalWhitIva }) {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: '80px',
                justifyContent: typeProforma != 'detallado' ? 'space-between' : 'flex-end',
                width: '100%',
                gap: '10px',
                position: typeProforma != 'detallado' ? 'absolute' : 'relative',
                bottom: typeProforma != 'detallado' ? '10px' : '12px',
            }}>

            {typeProforma === 'sencillo' &&
                <View style={{ display: 'flex', flexDirection: 'column', border: 1, borderStyle: 'solid', borderColor: 'orange', height: '100%', width: '50%' }}>
                    <View>
                        <Text style={{ fontSize: '10px', color: 'orange', width: '100%', textAlign: 'center' }}>IMPORTE CON LETRA</Text>
                    </View>

                </View>}


            <CustomContainerTable widthContianer={'150px'}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: 1, borderStyle: 'solid' }}>
                    <CustomItemTable text={'SUB-TOTAL'} height={'15px'} padding={'5px'} background={'orange'} textColor={'white'} borderColor={'white'} widthColumn={'90px'} />
                    <CustomItemTable text={`$ ${total}`} height={'15px'} padding={'5px'} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: 1, borderStyle: 'solid' }}>
                    <CustomItemTable text={'16% IVA'} height={'15px'} background={'orange'} textColor={'white'} borderColor={'white'} widthColumn={'90px'} padding={'5px'} />
                    <CustomItemTable text={`$ ${iva}`} height={'15px'} padding={'5px'} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                    <CustomItemTable text={'TOTAL'} height={'15px'} background={'orange'} textColor={'white'} borderColor={'white'} widthColumn={'90px'} padding={'5px'} />
                    <CustomItemTable text={`$ ${totalWhitIva}`} height={'15px'} padding={'5px'} />
                </View>
            </CustomContainerTable>

        </View>
    );
}

export { TableCostDetails };