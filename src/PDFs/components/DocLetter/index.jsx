import { Document, Page, Text, View, StyleSheet, } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    Page: {
        display: 'flex',
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },

    Container: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        width: "96%",
        height: "96%",
    },

    boxNumPage: {
        display: "flex",
        position: 'absolute',
        bottom: '2px',
        width: '98%',
        flexDirection: "column",
        alignItems: 'flex-end',
        fontSize: '10px'
    }
});

function DocLetter({ children }) {

    return (
        <Document>
            <Page style={styles.Page} size={"LETTER"}>
                <View style={styles.Container}>
                    {children}
                    {/* <View style={styles.boxNumPage}><Text>Pag 1/1</Text></View> */}
                </View>
            </Page>
        </Document>
    );
}

export { DocLetter };

export function SimplePageLetter({children, page, numPages}) {

    return (
        <Page style={styles.Page} size={"LETTER"}>
            <View style={styles.Container}>
                {children}
                <View style={styles.boxNumPage}><Text>Pag {page}/{numPages}</Text></View>
            </View>
        </Page>
    )
}