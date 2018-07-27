/**
 * @imports
 */
import { StyleSheet } from "react-native";

const softShadow = {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2
}

/**
 * Unified color control
 * @type {{background: string, foreground: string}}
 */
export const AppColors = {
    background: '#c94989',
    foreground: '#ffffff'
};

/**
 * Unified fonts
 * @type {{regular: string, bold: string, light: string}}
 */
export const AppFonts = {
    regular: 'Akkurat-Normal',
    bold: 'Akkurat-Bold',
    light: 'Akkurat-Light'
};

/**
 * @exports
 */
const Styles = StyleSheet.create({

    appContainer: {
        flex: 1,
    },

    appHeader: {
        ...softShadow,
        flexDirection: 'column',
        flex: 0,
        height: 190,
        paddingTop: 25,
        paddingHorizontal: 10,
        backgroundColor: AppColors.background,
        zIndex: 2,
    },

    appFooter: {
        flex: 0,
        height: 60,
        paddingHorizontal: 20,
        backgroundColor: AppColors.background,
    },

    inputContainer: {
        marginBottom: 5,
        flexDirection: 'row',
    },

    inputLabel: {
        color: AppColors.foreground,
        fontSize: 20,
        marginBottom: 10,
        fontFamily: AppFonts.light,
    },

    input: {
        backgroundColor: AppColors.foreground,
        color: AppColors.background,
        padding: 15,
        borderRadius: 3,
        fontSize: 19,
        flex: 1,
    },

    button: {
        flex: 0,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontFamily: "Navigation",
        fontSize: 30,
        color: AppColors.foreground,
    },

    map: {
        flex: 1,
    }

});

export default Styles;
