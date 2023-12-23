import { Text, View, } from "@react-pdf/renderer";
import { CustomContainerTable } from "../SimpleTable";
import { CustomHeaderTable } from "../SimpleTable";
import { CustomItemTable } from "../SimpleTable";

function TableProforma({ arrayConcepts, tanque, typeProforma }) {

    return (
        <>
            <CustomContainerTable widthContianer={'100%'}>

                <CustomHeaderTable widthHeader={'100%'} backgroundColor={'orange'}>

                    <CustomItemTable
                        text={'CANTIDAD'}
                        widthColumn={'10%'}
                        borderColor={'gray'}
                        textColor={'white'}
                        heightItem={'18px'}
                        background={'orange'}
                        padding={'2px'}
                        fontSize={'9px'}
                    />
                    <CustomItemTable
                        text={'CONCEPTO'}
                        widthColumn={'65%'}
                        borderColor={'gray'}
                        textColor={'white'}
                        heightItem={'18px'}
                        background={'orange'}
                        padding={'2px'}
                        fontSize={'9px'}
                    />
                    <CustomItemTable
                        text={'P.U.'}
                        widthColumn={'10%'}
                        borderColor={'gray'}
                        textColor={'white'}
                        heightItem={'18px'}
                        background={'orange'}
                        padding={'2px'}
                        fontSize={'9px'}
                    />
                    <CustomItemTable
                        text={'IMPORTE'}
                        widthColumn={'15%'}
                        textColor={'white'}
                        heightItem={'18px'}
                        background={'orange'}
                        padding={'2px'}
                        fontSize={'9px'}
                    />

                </CustomHeaderTable>

                {arrayConcepts.map((row, index) => (
                    <RowsProformaSencilla
                        key={`${row.cantidad}_${index}`}
                        cantidad={row.cantidad}
                        concepto={row.concepto}
                        description={row.descripcion}
                        importe={row.importe}
                        pu={row.precio_unit}
                        tanque={tanque}
                        typeProforma={typeProforma}
                    />
                ))}

            </CustomContainerTable>

        </>
    );
}

export { TableProforma };

export function RowsProformaSencilla({ cantidad, concepto, pu, importe, description, tanque, typeProforma }) {
    return (
        <CustomHeaderTable widthHeader={'100%'} backgroundColor={'white'}>
            <CustomItemTable text={cantidad} widthColumn={'10%'} borderColor={'gray'} />
            <CustomItemTable text={concepto} widthColumn={'65%'} borderColor={'gray'} heightItem={ typeProforma != 'sencillo'? 'auto':'60px'}>
                {typeProforma === 'sencillo' &&
                    <View style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <Text style={{ fontSize: '8px', marginTop: '2px' }}>
                            {tanque}
                        </Text>

                        <Text style={{ fontSize: '8px' }}>
                            {description}
                        </Text>
                    </View>}
            </CustomItemTable>
            <CustomItemTable text={`$ ${pu}`} widthColumn={'10%'} borderColor={'gray'} />
            <CustomItemTable text={`$ ${importe}`} widthColumn={'15%'} />
        </CustomHeaderTable>
    )
}