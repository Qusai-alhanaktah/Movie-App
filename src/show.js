import React, { Component } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    Text,
    View,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import backIcon from '../assets/back.png'
import { API_URL, API_KEY } from '../env.json';

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

        fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(movie => {
                movie.image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                fetch(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(data => {
                        movie.credits = data.cast
                        this.setState({ movie, });
                    })
                    .catch(e => console.error(e));
                fetch(`${API_URL}/movie/${id}/reviews?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(data => {
                        movie.reviews = data.results;
                        movie.reviews.forEach(review => review.showMore = false);
                        this.setState({ movie, }, () => this.setState({ loading: false, }));
                    })
                    .catch(e => console.error(e));
            })
            .catch(e => console.error(e));

    }
    getUrl(item) {
        let uri = item.author_details?.avatar_path?.includes('http')
            ?
            item.author_details.avatar_path
            : item.author_details?.avatar_path
                ?
                `https://image.tmdb.org/t/p/w500/${item.author_details.avatar_path}`
                :
                'https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';
        uri = uri[0] == '/' ? uri.substring(1, uri.length - 1) : uri;
        return uri;
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
            <FlatList
                ListHeaderComponent={() => (
                    <>
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
                        <View style={{ paddingVertical: 10, marginLeft: 10, }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17, }}>Movie Cast</Text>
                        </View>
                        <FlatList
                            data={movie.credits}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ListEmptyComponent={() => (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                    elevation: 5,
                                    marginVertical: 10,
                                    marginHorizontal: 50,
                                    borderRadius: 10,
                                }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        paddingVertical: 10,
                                    }}>
                                        No results to show
                                    </Text>
                                </View>
                            )}
                            contentContainerStyle={{
                                paddingVertical: 5,
                            }}
                            renderItem={({ item, index }) => (
                                <View
                                    style={{
                                        marginHorizontal: 10,
                                        borderRadius: 5,
                                        padding: 5,
                                        elevation: 5,
                                        backgroundColor: 'white',
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
                                    <View>
                                        <Text style={{ fontWeight: 'bold', }}>{item.name}</Text>
                                        <Text style={{ paddingVertical: 5, }}>{item.character}</Text>
                                    </View>

                                </View>
                            )}
                        />
                        <View style={{ paddingTop: 10, marginLeft: 10, }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17, }}>Reviews</Text>
                        </View>
                        <FlatList
                            data={movie.reviews}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={() => (
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                    elevation: 5,
                                    marginVertical: 10,
                                    marginHorizontal: 50,
                                    borderRadius: 10,
                                }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        paddingVertical: 10,
                                    }}>
                                        No results to show
                                    </Text>
                                </View>
                            )}
                            contentContainerStyle={{
                                paddingBottom: 20,
                            }}
                            renderItem={({ item, index }) => (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        backgroundColor: 'white',
                                        elevation: 5,
                                        margin: 10,
                                        padding: 5,
                                        borderRadius: 5,
                                    }}
                                >
                                    <View style={{
                                        width: '25%',
                                        marginHorizontal: 5,
                                    }}>
                                        <Image
                                            source={{ uri: this.getUrl(item) }}
                                            style={{
                                                width: 75,
                                                height: 75,
                                                borderRadius: 5,
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 11, }}>{item.author}</Text>
                                        <Text style={{ fontWeight: 'bold', paddingVertical: 5, fontSize: 9, }}>Rate: {item.author_details.rating}</Text>
                                        {
                                            item.content.length > 100
                                                ?
                                                (
                                                    <View>
                                                        <Text style={{ fontSize: 8, }}>{item.content.substring(0, 100)}</Text>
                                                        {
                                                            !item.showMore
                                                                ?
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        movie.reviews[index].showMore = true;
                                                                        this.setState({ movie, })
                                                                    }}
                                                                >
                                                                    <Text style={{ padding: 5, fontSize: 9, fontWeight: 'bold', }}>Show more {'>>>'}</Text>
                                                                </TouchableOpacity>
                                                                :
                                                                <>
                                                                    <Text style={{ fontSize: 8, }}>{item.content.substring(100, item.content.length - 1)}</Text>
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            movie.reviews[index].showMore = false;
                                                                            this.setState({ movie, })
                                                                        }}
                                                                    >
                                                                        <Text style={{ padding: 5, fontSize: 9, fontWeight: 'bold', }}>{'<<<'} Show less</Text>
                                                                    </TouchableOpacity>
                                                                </>

                                                        }
                                                    </View>
                                                )
                                                :
                                                (
                                                    <Text style={{ fontSize: 8, }}>{item.content}</Text>
                                                )
                                        }
                                    </View>
                                </View>
                            )}
                        />
                    </>
                )}
            />
        )
    }
}

export default Show