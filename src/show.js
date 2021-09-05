import React, { Component } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    View,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import backIcon from '../assets/back.png'

class Show extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            movie: {},
        }
    }
    async componentDidMount() {
        this.setState({ loading: true, });
        let id = this.props.route.params?.id;

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4f298a53e552283bee957836a529baec`)
            .then(response => response.json())
            .then(movie => {
                movie.image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4f298a53e552283bee957836a529baec`)
                    .then(response => response.json())
                    .then(data => {
                        movie.credits = data.cast
                        this.setState({ movie, }, () => this.setState({ loading: false, }));
                    })
                    .catch(e => console.error(e));
            })
            .catch(e => console.error(e));

    }
    render() {
        let {
            loading,
            movie,
        } = this.state;
        if (loading) {
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        return (
            <View>
                <View style={{ backgroundColor: 'black', }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image
                            source={backIcon}
                            style={{
                                width: 25,
                                height: 25,
                                marginLeft: 10,
                            }}
                        />
                    </TouchableOpacity>
                    <View>
                        <View style={{
                            paddingVertical: 10,
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                width: '46%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Image
                                    source={{ uri: movie.image, }}
                                    style={{
                                        width: 150,
                                        height: 250,
                                        borderRadius: 7,
                                    }}
                                />
                            </View>
                            <View style={{ width: '4%', }}></View>
                            <View style={{
                                width: '50%',
                            }}>
                                <Text style={{ color: 'white', fontSize: 16, marginVertical: 3, fontWeight: 'bold', }}>{movie.title}</Text>
                                <Text style={{ color: 'white', fontSize: 10, marginVertical: 3, }}>{movie.genres ? movie.genres[0].name : 'Non-type'} {'.'} {movie.runtime}m</Text>
                                <Text style={{ color: 'gray', fontSize: 10, marginVertical: 3, fontStyle: 'italic', }}>{movie.tagline}</Text>
                                <Text style={{ color: 'white', fontSize: 12, marginVertical: 3, }}>Overview</Text>
                                <Text style={{ color: 'white', fontSize: 8, marginVertical: 3, }}>{movie.overview}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={movie.credits}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: 20,
                    }}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                marginHorizontal: 10,
                                borderWidth: 1,
                                borderRadius: 5,
                                padding: 5,
                            }}
                        >
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}` }}
                                style={{
                                    alignSelf: 'center',
                                    width: 100,
                                    height: 100,
                                    borderRadius: 5,
                                    marginVertical: 5,
                                }}
                            />
                            <View style={{ width: '100%', }}>
                                <Text style={{ fontWeight: 'bold', }}>{item.name}</Text>
                                <Text style={{ paddingVertical: 5, }}>{item.character}</Text>
                            </View>

                        </View>
                    )}
                />
            </View>
        )
    }
}

export default Show