import Slider from "@react-native-community/slider"
import { COLORS, FONTS, SIZES, SPACING } from "@src/constants/theme"
import { StyleSheet, Text, View } from "react-native"
import { useTheme } from '../context/ThemeContext';

type TextZoomProps = {
    zoomLevel: number;
    setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
    getZoomLabel: (zoomLevel: number) => string
}

const TextZoom = ({ zoomLevel, setZoomLevel, getZoomLabel }: TextZoomProps) => {
    const { themeColors } = useTheme();
    
    return (
        <View style={styles.zoomControls}>
            <Text style={[styles.zoomLabel, { color: themeColors.text }]}>Zoom: {getZoomLabel(zoomLevel)}</Text>
            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={3}
                step={0.5}
                value={zoomLevel}
                onValueChange={setZoomLevel}
                minimumTrackTintColor={themeColors.primary}
                maximumTrackTintColor={themeColors.borderColor}
                thumbTintColor={themeColors.primary}
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
        marginBottom: SPACING.xs,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    
})
export default TextZoom