import { View, Document, Text, } from "@react-pdf/renderer";
import { SimplePageLetter } from "../../components/DocLetter";
import { HeaderProforma } from "../../components/HeaderProforma";
import { DataProforma } from "../../components/DataProforma";
import { TableProforma } from "../../components/TableProforma";
import { TitleDocument } from "../../components/TitleDocument"
import { RecapEvidencesProforma } from "../../components/RecapEvidencesProforma";
import { TableCostDetails } from "../../components/TableCostDetails";
import { dividirArray } from "../../../Helpers/transformRegisters";
import { Firma } from "../../components/Firma"

function Proforma({ typeProforma, dataHeader, arrayConcepts, arrayEvidences, tanque }) {
    
    const ArraysConcepts = dividirArray(arrayConcepts, 4);
    const ArraysEvidences = dividirArray(arrayEvidences, 4);

    const Total = arrayConcepts.reduce((total, concept) => total + concept.importe, 0);
    const Iva = '0';
    const TotalWhitIva = Total;

    return (
        <Document>
            {ArraysConcepts.map((arrayConcept, index) => (
                <SimplePageLetter key={index} page={index + 1} numPages={ArraysConcepts.length}>
                    <HeaderProforma typeHeader={typeProforma}  />
                    <DataProforma typeData={typeProforma} dataHeader={dataHeader}/>
                    <TableProforma arrayConcepts={arrayConcept} tanque={tanque} typeProforma={typeProforma} />
                    {typeProforma === 'sencillo' &&
                        <TitleDocument
                            height={'18px'}
                            color={'white'}
                            fontSize={'9px'}
                            background={'orange'}
                            title={'EVIDENCIA FOTOGRAFICA DEL DAÑO Y REPARACION'}
                        />
                    }
                    {typeProforma === 'sencillo' &&
                        <View style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                            {ArraysEvidences.map((evidence) => (
                                <RecapEvidencesProforma arrayEvidences={evidence} />
                            ))}
                        </View>}
                    <TableCostDetails typeProforma={typeProforma} total={Total} iva={Iva} totalWhitIva={TotalWhitIva} />
                    {typeProforma === 'detallado' &&
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                width: '100%',
                                position: 'absolute',
                                bottom: '50px'
                            }}>
                            <Firma title={'Encargado de Operaciones'} width={'30%'} />
                            <Firma title={'Gerente General'} width={'30%'} />
                        </View>}
                    {typeProforma === 'detallado' &&
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                width: '100%',
                                position: 'absolute',
                                bottom: '20px',
                                gap: '2px'
                            }}
                        >
                            <Text style={{ fontSize: '8px', color: 'red' }}>THIS IS NOT AN INVOICE, IT IS A PRE-INVOICE WHERE THE CLIENT CAN FIND DETAILS OF CHARGES OF SERVICE.</Text>
                            <Text style={{ fontSize: '8px', color: 'red' }}>PRICES MAY VARY ACCORDING TO THE PURCHASE MARKET PRICE.</Text>
                        </View>}
                </SimplePageLetter>
            ))}
        </Document>
    );
}

export { Proforma };





