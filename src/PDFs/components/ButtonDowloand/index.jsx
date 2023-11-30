import { useContext } from "react";
import { Button } from "@mui/material";
import { EIR } from "../../plantillas/EIR";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ManiobrasContext } from "../../../Context/ManiobrasContext"
import { currentDate, dateMXFormat, datetimeMXFormat } from "../../../Helpers/date";
import { AuthContext } from "../../../Context/AuthContext";


function ButtonDowloand() {

  const { key } = useContext(AuthContext);
  const [state, dispatch] = useContext(ManiobrasContext);
  
  const session = JSON.parse(sessionStorage.getItem(key));
  const { maniobrasCheckList, selectItem, cliente, status } = state;
  const { carga, dayInput, dateInput, linea, numero_tanque, tracto, checkIn } = selectItem;

  const checkList = [...maniobrasCheckList.pageOne, ...maniobrasCheckList.pageTwo, ...maniobrasCheckList.pageThree];

  const data = {
    numero_tanque: numero_tanque,
    fechaActual: dateMXFormat(currentDate),
    horaActual: datetimeMXFormat(currentDate),
    cliente: cliente,
    entrada: dayInput,
    numero_unidad: tracto,
    usuario_emisor: `${session.user_metadata.first_name} ${session.user_metadata.last_name} `,
    folio: selectItem.folio,
    newStatus: status,
}

  return (
    <PDFDownloadLink 
      document={<EIR maniobrasCheckList={checkList} data={data}/>}
      fileName={`EIR_${selectItem.folio} `}

    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <Button 
          variant="contained" 
          size="small" 
          disabled="true">
           Cargando...</Button>
        ) : (
          <Button 
          variant="contained" 
          size="small" 
          color="primary"
          endIcon={<PictureAsPdfIcon/>}
          >
           Exportar PDF</Button>
        )
      }
    </PDFDownloadLink>
  );
}

export { ButtonDowloand };