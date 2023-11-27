import { useContext } from "react";
import { Button } from "@mui/material";
import { EIR } from "../../plantillas/EIR";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ManiobrasContext } from "../../../Context/ManiobrasContext"


function ButtonDowloand() {
  const [state, dispatch] = useContext(ManiobrasContext);

  const { maniobrasCheckList } = state;

  return (
    <PDFDownloadLink 
      document={<EIR checkList={maniobrasCheckList} />}
      fileName={`EIR`}

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