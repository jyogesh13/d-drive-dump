import { ImageSourcePropType } from "react-native";

declare global {
    interface TableIconProps {
        focused: boolean;
        icon: ImageSourcePropType;
    }
}

export { }