import { Document, Page, Text, View, StyleSheet, } from "@react-pdf/renderer";

function DocLetter({ children }) {

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
            bottom: '22px',
            width: '95%',
            flexDirection: "column",
            alignItems: 'flex-end',
            fontSize: '10px'
        }
    });

    return (
        <Document>
            <Page style={styles.Page} size={"LETTER"}>
                <View style={styles.Container}>
                    {children}
                    <View style={styles.boxNumPage}><Text>Pag 1/1</Text></View>
                </View>
            </Page>
        </Document>
    );
}

export { DocLetter };