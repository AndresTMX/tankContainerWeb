import { useEffect } from "react";
import { Button } from "@mui/material";
import { EIR } from "../../plantillas/EIR";
import { Proforma } from "../../plantillas/proforma";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useGetLastFolio } from "../../../Hooks/foliosManagment/useGetLastFolio";

function ButtonDowloand({ item, state, selectItem }) {

  const { folio } = useGetLastFolio();
  const { maniobrasCheckList } = state;
  const checkList = [...maniobrasCheckList.pageOne, ...maniobrasCheckList.pageTwo, ...maniobrasCheckList.pageThree];

  useEffect(() => {
    if (!item.folio) {
      selectItem({ ...item, folio })
    }
  }, [folio])

  const folioDocument = item.folio||folio;

  return (
    <PDFDownloadLink
      document={<EIR maniobrasCheckList={checkList} dataDocument={item} />}
      fileName={`EIR_${folioDocument} `}

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