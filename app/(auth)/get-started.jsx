import { 
    SafeAreaView, 
    StatusBar, 
    StyleSheet, 
    Image, 
    Text, 
    View, 
    ScrollView, 
    TouchableOpacity
} from 'react-native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { MotiView } from 'moti'; 

const GetStarted = () => {
    const [animationStarted, setAnimationStarted] = useState(false);

    const phoneSignIn = () => {
        router.push('/phone');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#000" />
                <View style={styles.signInPoster}>
                    <Image 
                        source={require('../../assets/images/sign-in-poster.png')}
                        resizeMode="contain"
                    />
                </View>
                <ScrollView style={styles.signForm}>
                    <MotiView
                        from={{ opacity: 0, translateX: -50 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{
                            type: 'timing',
                            duration: 800,
                            delay: 100, // Staggered effect starts after a small delay
                        }}
                        onAnimateComplete={() => setAnimationStarted(true)}
                    >
                        <Text style={styles.title}>
                            Get your groceries {'\n'}
                            with nectar
                        </Text>
                    </MotiView>
                    
                <View style={styles.socialSign}>
                    <MotiView
                        from={{ opacity: 0, translateY: 50 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        style={{ width: '100%' }}
                        transition={{
                            type: 'timing',
                            duration: 800,
                            delay: animationStarted ? 100 : 600, // Staggering effect based on initial animation
                        }}
                    >
                        <TouchableOpacity
                            onPress={phoneSignIn} 
                            style={styles.phoneButton}
                        >
                            <Text style={styles.buttonText}>
                                Sign up to continue
                            </Text>
                        </TouchableOpacity>
                    </MotiView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GetStarted;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#FFF',
        flex: 1,
        position: 'relative',
    },
    signInPoster: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    signForm: {
        position: 'absolute',
        width: '100%',
        bottom: 200,
        left: 0,
        padding: 20,
    },
    title: {
        fontSize: 30,
        textAlign: 'left',
        color: 'black',
        fontWeight: '500',
        marginBottom: 20,
    },
    socialText: {
        fontSize: 20,
        color: 'gray',

    },  
    phoneInputContainer: {
        marginVertical: 20,
    },
    socialSign: {
        width: '100%',
        display: 'flex',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    phoneButton: {
        width: '100%', 
        borderRadius: 20,
        backgroundColor: '#53B175',
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    }, 
    buttonText: {
        fontSize: 18,
        color: '#FFF', 

    }
});
