import { DocLetter } from "../../components/DocLetter";
import { HeaderEIR } from "../../components/Header";
import { TitleDocument } from "../../components/TitleDocument";
import { DataHeader } from "../../components/DataHeader";
import { SimpleTable } from "../../components/SimpleTable";

function EIR() {

    const dataQuestions = [
        'PANEL FROTAL',
        'MARCO FRONTAL',
        'PANEL TRASERO',
        'MARCO TRASERO',
        'PANEL DERECHO',
        'MARCO DERECHO',
        'PANEL IZQUIERDO',
        'MARCO IZQUIERDO',
        'PANEL SUPERIOR',
        'MARCO SUPERIOR',
        'PANEL INFERIOR',
        'MARCO INFERIOR',
        'NOMENCLATURA',
        'ESCALERAS',
        'PASARELAS',
        'ENTRADA DE HOMBRE',
        'MARIPOSAS DE E.HOMBRE',
        'VÁLVULA DE PRESIÓN Y ALIVIO',
        'TUBO DE DESAGÚE',
        'VÁLVULA DE ALIVIO',
        'BRIDA CIEGA',
        'MANOMETRO',
        'TERMOMETRO',
        'PLACA DE DATOS',
        'PORTA DOCTOS',
        'TUBO DE VAPOR	',
        'TAPONES DE TUBO DE VAPOR',
        'SIST.DE CALENTAMIENTO ELECTRICO',
        'VÁLVULA DE PIE DE TANQUE',
        'VÁLVULA DE DESCARGA',
        'TAPÓN DE VÁLVULA DE DESCARGA',
        'MANERAL DE VÁLVULA DE SEGURIDAD',
        'CIERRE DE EMERGENCIA REMOTO',
    ]

    return (
        <DocLetter>
            <HeaderEIR />
            <TitleDocument title={'Reporte de Inspección de Equipos'} />
            <DataHeader />
            <SimpleTable list={dataQuestions}/>
        </DocLetter>
    );
}

export { EIR };

