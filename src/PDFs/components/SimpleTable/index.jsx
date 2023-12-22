import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

function SimpleTable({ checkList }) {

    const style = StyleSheet.create({
        ContainerTable: {
            display: 'flex',
            flexDirection: 'column',
            width: '65%',
            border: 1,
        },
        HeaderTable: {
            display: 'flex',
            flexDirection: 'row',
            borderBottom: 1,
            width: '100%',
            backgroundColor: 'black'
        }
    })

    return (
        <View style={style.ContainerTable}>

            <View style={style.HeaderTable}>

                <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '5%', }}>
                    <Text style={{ fontSize: '10px', color: 'white' }}>
                        N°
                    </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '45%', }}>
                    <Text style={{ fontSize: '10px', color: 'white' }}>
                        Conceptops
                    </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '14%', }}>
                    <Text style={{ fontSize: '10px', color: 'white' }}>
                        Estado
                    </Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '36%' }}>
                    <Text style={{ fontSize: '10px', color: 'white' }}>
                        Comentarios
                    </Text>
                </View>

            </View>

            {checkList.length >= 1 &&
                checkList.map((item, index) => (
                    <SimpleRow
                        key={item.question}
                        index={index}
                        question={item.question}
                        value={item.value}
                        coment={item.coment}
                    />
                ))}

        </View>
    );
}

export { SimpleTable };

export function SimpleRow({ index, question, value, coment }) {

    const style = StyleSheet.create({
        Row: {
            display: 'flex',
            flexDirection: 'row',
            borderTop: 1,
            width: '100%',
            backgroundColor: 'whitesmoke'
        },
    })

    return (
        <View style={style.Row}>

            <View style={{ display: 'flex', flexDirection: 'column', padding: '2px', width: '5%', borderRight: 1, borderColor: 'black' }}>
                <Text style={{ fontSize: '8px', textAlign: 'center', width: '100%' }}>
                    {index + 1}
                </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', padding: '2px', width: '45%', borderRight: 1, borderColor: 'black' }}>
                <Text style={{ fontSize: '8px' }}>
                    {question}
                </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', padding: '2px', width: '14%', borderRight: 1, borderColor: 'black' }}>
                <Text style={{ fontSize: '8px' }}>
                    {value}
                </Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', padding: '2px', width: '36%' }}>
                <Text style={{ fontSize: '8px' }}>
                    {coment}
                </Text>
            </View>

        </View>
    )
}

export function CustomContainerTable({ children, widthContianer }) {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: widthContianer,
                border: 1,
            }}
        >
            {children}
        </View>
    )
}

export function CustomHeaderTable({ widthHeader, backgroundColor, children }) {

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: 1,
                width: widthHeader,
                backgroundColor: backgroundColor
            }}>
            {children}
        </View>
    )
}

export function CustomItemTable({ children, text, fontSize, widthColumn, borderColor, textColor , heightItem}) {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'center',
                padding: '10px',
                height: heightItem? heightItem : 'auto',
                width: widthColumn,
                borderRight: borderColor ? '1' : '0',
                borderStyle: borderColor ? 'solid' : '',
                borderColor: borderColor,
            }}>
            <Text style={{ fontSize: fontSize ? fontSize : '10px', color: textColor ? textColor : 'black' }}>
                {text}
            </Text>

            {children &&
                children
            }

        </View>
    )
}
