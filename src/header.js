import React, { Component } from 'react'
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={{
                marginLeft: 10,
            }}>
                <Image
                    source={logo}
                    style={{ width: 20, height: 20, borderRadius: 10, }}
                />
                <Text>Movies</Text>
                <Text>TV Shows</Text>
                <Text>People</Text>
                <Text>More</Text>
            </View>
            <View style={{
                marginRight: 30,
            }}>
                <Text>+</Text>
                <Text style={{ padding: 5, borderWidth: 1, borderRadius: 2, }}>En</Text>
                <Text>Login</Text>
                <Text>Join TMDB</Text>
                <Text>Search icon</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
    },
});

export default Header