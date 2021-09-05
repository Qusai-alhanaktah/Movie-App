import React, { Component } from 'react'
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native'

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
                this.setState({ movie, }, () => this.setState({ loading: false, }));
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
                <Text>{movie.title}</Text>
            </View>
        )
    }
}

export default Show