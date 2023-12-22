import { View } from "@react-pdf/renderer";
import { DocLetter } from "../../components/DocLetter";
import { HeaderProforma } from "../../components/HeaderProforma";
import { DataProforma } from "../../components/DataProforma";
import { TableProforma } from "../../components/TableProforma";
import { RecapEvidencesProforma } from "../../components/RecapEvidencesProforma";
import { ImageEIR1, ImageEIR2 } from "../../../resourcesLinks";

function Proforma({typeProforma}) {
    return (
        <DocLetter>
            <HeaderProforma typeHeader={typeProforma}/>
            <DataProforma typeData={typeProforma} />
            <TableProforma/>
            <RecapEvidencesProforma imageDamage={ImageEIR1} imageRepair={ImageEIR2} />
        </DocLetter>
    );
}

export { Proforma };