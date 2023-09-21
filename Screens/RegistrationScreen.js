import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function RegistrationScreen() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleRegistration = () => {
		console.log('Name:', name)
		console.log('Email:', email)
		console.log('Password:', password)
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled>
        <View style={styles.innerContainer}>
           <View style={styles.avatarContainer}>
                <TouchableOpacity>
                  <View style={styles.iconContainer}>
                    <Ionicons name="ios-add" size={13} color="#FF6C00" />
                  </View>
                </TouchableOpacity>
              </View>
					<Text style={styles.heading}>Реєстрація</Text>
          <TextInput style={styles.input}
            placeholder='Логін'
            value={name}
            onChangeText={setName} />
					<TextInput
						style={styles.input}
						placeholder='Адреса електронної пошти'
						value={email}
						onChangeText={setEmail}
					/>
					<TextInput
						style={styles.input}
						placeholder='Пароль'
						secureTextEntry
						value={password}
						onChangeText={setPassword}
					/>
					<TouchableOpacity style={styles.button} onPress={handleRegistration}>
						<Text style={styles.buttonText}>Зареєструватися</Text>
					</TouchableOpacity>
					<Text style={styles.span}>Вже є акаунт? Увійти</Text>
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		backgroundColor: '#ffffff',
		height: 549,
  },
  avatarContainer: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    top: -60,
    left: "50%",
    marginLeft: -48,
  },
	heading: {
		color: '#212121',
		textAlign: 'center',

		fontSize: 30,
		fontStyle: 'normal',
		fontWeight: 500,
		letterSpacing: 0.3,
		marginBottom: 33,
	},
	input: {
		width: 343,
		height: 50,
		borderWidth: 1,
		borderColor: '#E8E8E8',
		marginBottom: 16,
		paddingHorizontal: 10,
		borderRadius: 6,
    backgroundColor: '#F6F6F6',
  },
   iconContainer: {
    position: "absolute",
    top: 80,
    right: -12,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderRadius: 100,
    borderColor: "#FF6C00",
    borderWidth: 1,
    width: 25,
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
	button: {
		width: 343,
		padding: 16,
		borderRadius: 100,
		backgroundColor: '#FF6C00',
		marginTop: 27,
	},
	buttonText: {
		color: '#ffffff',
		textAlign: 'center',
	},
	span: {
		marginTop: 20,
	},
})

