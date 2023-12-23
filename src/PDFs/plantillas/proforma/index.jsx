import { View, Page, Document } from "@react-pdf/renderer";
import { DocLetter, SimplePageLetter } from "../../components/DocLetter";
import { HeaderProforma } from "../../components/HeaderProforma";
import { DataProforma } from "../../components/DataProforma";
import { TableProforma } from "../../components/TableProforma";
import { TitleDocument } from "../../components/TitleDocument"
import { RecapEvidencesProforma } from "../../components/RecapEvidencesProforma";
import { ImageEIR1, ImageEIR2 } from "../../../resourcesLinks";
import { TableCostDetails } from "../../components/TableCostDetails";
import { dividirArray } from "../../../Helpers/transformRegisters";

function Proforma({ typeProforma, dataHeader, arrayConcepts, arrayEvidences, tanque }) {

    const ArraysConcepts = dividirArray(arrayConcepts, 4);
    const ArraysEvidences = dividirArray(arrayEvidences, 4);

    const Total = arrayConcepts.reduce((total, concept) => total + concept.importe, 0);
    const Iva = (Total / 100) * 16;
    const TotalWhitIva = Total + Iva;

    return (
        <Document>
            {ArraysConcepts.map((arrayConcept, index) => (
                <SimplePageLetter key={index} page={index + 1} numPages={ArraysConcepts.length}>
                    <HeaderProforma typeHeader={typeProforma} />
                    <DataProforma typeData={typeProforma} />
                    <TableProforma arrayConcepts={arrayConcept} tanque={tanque} />
                    <TitleDocument title={'EVIDENCIA FOTOGRAFICA DEL DAÑO Y REPARACION'} background={'orange'} color={'white'} height={'18px'} fontSize={'9px'} />
                    <View style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                        {ArraysEvidences.map((evidence) => (
                            <RecapEvidencesProforma arrayEvidences={evidence} />
                        ))}
                    </View>
                    <TableCostDetails total={Total} iva={Iva} totalWhitIva={TotalWhitIva} />
                </SimplePageLetter>
            ))}
        </Document>
    );
}

export { Proforma };





