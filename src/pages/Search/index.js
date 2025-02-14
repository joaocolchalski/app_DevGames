import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import api from "../../services/api";

import {
    Container,
    ListGames,
    MessageErrorContainer,
    MessageErrorText
} from "./styles";
import { ActivityIndicator } from "react-native";
import GameItem from "../../components/GameItem";

export default function Search({ route }) {
    const [loading, setLoading] = useState(true)
    const [gamesSearch, setGamesSearch] = useState([])

    const isFocused = useIsFocused()

    useEffect(() => {
        async function loadGames() {
            const gamesSearch = await api.get('/games', {
                params: {
                    page_size: 5,
                    key: 'f3a00a4560d44cb7adb5f066d5592439',
                    search: route.params.searchInput
                }
            })

            setGamesSearch(gamesSearch.data.results)
            setLoading(false)
        }

        loadGames()
    }, [isFocused])

    if (loading) {
        return (
            <Container style={{ justifyContent: 'center' }}>
                <ActivityIndicator size={50} color='#FF455F' />
            </Container>
        )
    }

    return (
        <Container>
            {gamesSearch.length > 0 ? (
                <ListGames
                    data={gamesSearch}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <GameItem data={item} />}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <MessageErrorContainer>
                    <MessageErrorText>Não encontramos um jogo com esse nome...</MessageErrorText>
                </MessageErrorContainer>
            )}
        </Container>
    )
}