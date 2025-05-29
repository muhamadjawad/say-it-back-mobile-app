import { Dimensions } from "react-native";

const getWidth = (val: number) => {
    return Dimensions.get('window').width * (val / 100);
}

const getHeight = (val: number) => {
    return Dimensions.get('window').height * (val / 100);
}

export { getWidth, getHeight };

