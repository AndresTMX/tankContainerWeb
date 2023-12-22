import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { CustomContainerTable } from "../SimpleTable";
import { CustomHeaderTable } from "../SimpleTable";
import { CustomItemTable } from "../SimpleTable";

function TableProforma() {

    const arrayPrueba = [
        { cantidad: '12', concepto: 'un concepto random', pu: '12', importe: '12' }
    ]

    return (
        <>
            <CustomContainerTable widthContianer={'100%'}>

                <CustomHeaderTable widthHeader={'100%'} backgroundColor={'orange'}>

                    <CustomItemTable text={'CANTIDAD'} widthColumn={'15%'} borderColor={'gray'} textColor={'white'} />
                    <CustomItemTable text={'CONCEPTO'} widthColumn={'60%'} borderColor={'gray'} textColor={'white'} />
                    <CustomItemTable text={'P.U.'} widthColumn={'10%'} borderColor={'gray'} textColor={'white'} />
                    <CustomItemTable text={'IMPORTE'} widthColumn={'15%'} textColor={'white'} />

                </CustomHeaderTable>

                {arrayPrueba.map((row, index) => (
                    <RowsProformaSencilla
                        key={`${row.cantidad}_${index}`}
                        cantidad={row.cantidad}
                        concepto={row.concepto}
                        importe={row.importe}
                        pu={row.pu}
                    />
                ))}


            </CustomContainerTable>

        </>
    );
}

export { TableProforma };

export function RowsProformaSencilla({ cantidad, concepto, pu, importe }) {
    return (
        <CustomHeaderTable widthHeader={'100%'} backgroundColor={'white'}>
            <CustomItemTable text={cantidad} widthColumn={'15%'} borderColor={'gray'} />
            <CustomItemTable text={concepto} widthColumn={'60%'} borderColor={'gray'} heightItem={'60px'}>
                <View style={{display:'flex', flexDirection:'column', gap:'2px'}}>
                    <Text style={{fontSize:'8px', marginTop:'2px'}}>
                     AGMU 631342 - 4
                    </Text>

                    <Text style={{fontSize:'8px'}}>
                    Se coloca parche 20 X 40CM
                    </Text>

                    <Text style={{fontSize:'8px'}}>
                        INCLUYE; tornillos, tuercas, rondanas, remaches y silicon para sellar.
                    </Text>
                </View>
            </CustomItemTable>
            <CustomItemTable text={`$ ${pu}`} widthColumn={'10%'} borderColor={'gray'} />
            <CustomItemTable text={`$ ${importe}`} widthColumn={'15%'} />
        </CustomHeaderTable>
    )
}