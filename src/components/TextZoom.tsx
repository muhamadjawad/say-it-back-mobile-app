import Slider from "@react-native-community/slider"
import { COLORS, FONTS, SIZES, SPACING } from "@src/constants/theme"
import { StyleSheet, Text, View } from "react-native"

type TextZoomProps = {
    zoomLevel: number;
    setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
    getZoomLabel: (zoomLevel: number) => string

}

const TextZoom = ({ zoomLevel, setZoomLevel, getZoomLabel }: TextZoomProps) => {
    return (
        <View style={styles.zoomControls}>
            <Text style={styles.zoomLabel}>Zoom: {getZoomLabel(zoomLevel)}</Text>
            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={3}
                step={0.5}
                value={zoomLevel}
                onValueChange={setZoomLevel}
                minimumTrackTintColor={COLORS.primary}
                maximumTrackTintColor={COLORS.gray}
                thumbTintColor={COLORS.primary}
            />
        </View>)
}

const styles = StyleSheet.create({
    zoomControls: {
        marginBottom: SPACING.md,
    },
    zoomLabel: {
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.darkGray,
        marginBottom: SPACING.xs,
    },
    slider: {
        width: '100%',
        height: 40,
    },

})
export default TextZoom