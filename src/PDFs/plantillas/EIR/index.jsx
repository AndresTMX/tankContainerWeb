import { View, Image } from "@react-pdf/renderer";
import { DocLetter } from "../../components/DocLetter";
import { HeaderEIR } from "../../components/Header";
import { TitleDocument } from "../../components/TitleDocument";
import { DataHeader } from "../../components/DataHeader";
import { SimpleTable } from "../../components/SimpleTable";
import { Firma } from "../../components/Firma";
import { ComentBox } from "../../components/ComentBox";
import { ImageEIR1, ImageEIR2 } from "../../../resourcesLinks";

function EIR({ maniobrasCheckList, data }) {

    return (
        <DocLetter>
            <HeaderEIR folio={data.folio} />
            <TitleDocument title={'Reporte de Inspección de Equipos'} />
            <DataHeader data={data} />
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
                <View style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '32%', }}>
                    <Image style={{ width: '100%', height: '180px' }} src={ImageEIR2} />
                    <Image style={{ width: '100%', height: '180px' }} src={ImageEIR1} />
                    <ComentBox widht="100%" height="120px" coment="comentario random de prueba" />
                </View>
                <SimpleTable checkList={maniobrasCheckList} />
            </View>
            <View style={{display:'flex', flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between', gap:'10px', height:'10%'}}>
                <Firma title={'Operador de Unidad'} width={'25%'}/>
                <Firma title={'Operador de ServiContainer'} width={'25%'}/>
                <Firma title={'Jefe de Operaciones '} width={'25%'}/>
            </View>
        </DocLetter>
    );
}

export { EIR };

