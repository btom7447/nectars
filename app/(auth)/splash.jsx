import { ScrollView, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MotiView } from 'moti'; 
import { router } from 'expo-router';

const Splash = () => {
    const [animationStarted, setAnimationStarted] = useState(false);

    const handlePress = () => {
        // Navigate to the '/sign-in' page
        router.push('/get-started');
    };

    return (
        <ScrollView style={styles.getStarted}>
            <Image
                source={require('../../assets/images/get-started-image.png')}
                resizeMode="contain"
            />
            <View style={styles.bannerCaption}>
                <MotiView
                    from={{ opacity: 0, translateY: 50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: 'timing',
                        duration: 800,
                        delay: 100, // Staggered effect starts after a small delay
                    }}
                    onAnimateComplete={() => setAnimationStarted(true)}
                >
                    <Image
                        source={require('../../assets/images/icon.png')}
                        resizeMode="contain"
                        style={styles.smallIcon}
                    />
                </MotiView>

                <MotiView
                    from={{ opacity: 0, translateY: 50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: 'timing',
                        duration: 800,
                        delay: animationStarted ? 100 : 400, // Staggering effect based on initial animation
                    }}
                >
                    <Text style={styles.title}>
                        Welcome {'\n'} to our store
                    </Text>
                </MotiView>

                <MotiView
                    from={{ opacity: 0, translateY: 50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: 'timing',
                        duration: 800,
                        delay: animationStarted ? 200 : 600, // Delay further to stagger
                    }}
                >
                    <Text style={styles.subTitle}>
                        Get your groceries in as fast as one hour
                    </Text>
                </MotiView>

                <MotiView
                    from={{ opacity: 0, translateY: 50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    style={{ width: '100%'}}
                    transition={{
                        type: 'timing',
                        duration: 800,
                        delay: animationStarted ? 300 : 800, // Delay further to stagger
                    }}
                >
                    <TouchableOpacity
                        onPress={handlePress} 
                        style={styles.customButton}
                    >
                        <Text style={styles.buttonText}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </MotiView>
            </View>
        </ScrollView>
    );
    };

    export default Splash;

    const styles = StyleSheet.create({
    getStarted: {
        position: 'relative',
        flex: 1,
    },
    bannerCaption: {
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: [{ translateX: '-50%' }],
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: 30,
    },
    smallIcon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    title: {
        fontSize: 65,
        textAlign: 'center',
        marginBottom: 10,
        color: 'white',
        fontWeight: '500',
        marginTop: 10,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 300,
        textAlign: 'center', 
        color: 'white',
    },
    customButton: {
        width: '100%',
        backgroundColor: '#53B175',  
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginTop: 30,
    },
    buttonText: {
        width: '100%',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
});
