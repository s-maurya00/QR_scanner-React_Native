import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [text, setText] = useState('Not yet Scanned!!');

	const askForCameraPermission = () => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status == 'granted');
		})()
	}


	// Asking for Camera permission
	useEffect(() => {
		askForCameraPermission();
	}, [])


	//Specifying what happens when we scan the barcode
	const handleBarCodeScanned = ({type, data}) => {
		setScanned(true);
		setText(data);
		console.log('Type: ' + type + '\nData: ' + data);
	}


	// Check permissions and return screen
	if(hasPermission === null){
		return(
			<View style={styles.container}>
				<Text>Requesting for camera permission</Text>
			</View>
		)
	}


	// If permission is Rejected
	if(hasPermission === false){
		return(
			<View style={styles.container}>
				<Text>No access to camera</Text>
				<Button title="Grant Camera Permission" onPress={() => askForCameraPermission()}/>
			</View>
		)
	}


	// Return the Camera View when Granted Access
    return (
        <View style={styles.container}>
			<View style={styles.barCodeBox}>
				<BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{height: 400, width: 400}} />
			</View>

			<Text style={styles.mainText}>{text}</Text>

			{scanned && <Button title='Scan Again?' onPress={() => setScanned(false)} color='tomato' />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

	barCodeBox: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 200,
		width: 200,
		overflow: 'hidden',
		borderRadius: 30,
		backgroundColor: 'tomato'
	},
	
	mainText: {
		fontSize: 16,
		margin: 20
	}
});
