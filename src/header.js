import React, { useState, useEffect } from 'react'
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import logo from '../assets/logo.png';
import DropDownPicker from 'react-native-dropdown-picker';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: '+', value: '+' },
        { label: 'En', value: 'en' },
        { label: 'Login', value: 'login' },
        { label: 'Join TMDB', value: 'join_TMDB' },
        { label: 'Search', value: 'search' }
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.parts}>
                <Image
                    source={logo}
                    style={{ width: 100, height: 20, borderRadius: 10, }}
                />
                <Text style={styles.text}>Movies</Text>
                <Text style={styles.text}>TV Shows</Text>
                <Text style={styles.text}>People</Text>
                <Text style={styles.text}>More</Text>
            </View>
            <View style={styles.parts}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    theme={"DARK"}
                    placeholder={""}
                    dropDownContainerStyle={{
                        backgroundColor: 'black',
                        alignSelf: 'flex-end',
                        width: 100,
                    }}
                    containerStyle={{
                        width: 50,
                    }}
                    style={{
                        backgroundColor: 'black',
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        paddingVertical: 10,
    },
    text: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 5,
    },
    parts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 5,
    }
});

export default Header