import { Button } from "@mui/material";
import { EIR } from "../../plantillas/EIR";
import { Proforma } from "../../plantillas/proforma";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function ButtonDowloand({ dataDocument, checklist, }) {

  const checklistValues = Object.values(checklist)

  return (
    <PDFDownloadLink
      document={<EIR maniobrasCheckList={checklistValues} dataDocument={dataDocument} />}
      fileName={`EIR_${dataDocument.folio} `}

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
            endIcon={<PictureAsPdfIcon />}
          >
            descargar</Button>
        )
      }
    </PDFDownloadLink>
  );
}

export { ButtonDowloand };

export function ButtonDowloandProforma({ typeProforma, dataHeader, arrayConcepts, arrayEvidences, tanque }) {
  return (
    <PDFDownloadLink
      document={<Proforma typeProforma={typeProforma} dataHeader={dataHeader} arrayConcepts={arrayConcepts} arrayEvidences={arrayEvidences} tanque={tanque} />}
      fileName={`PROFORMA_TANQUE_${tanque} `}

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
            endIcon={<PictureAsPdfIcon />}
          >
            Exportar PDF</Button>
        )
      }
    </PDFDownloadLink>
  )
}