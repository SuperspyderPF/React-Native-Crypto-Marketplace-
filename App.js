import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Card, Avatar } from 'react-native-paper';

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCryptoData = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      setCryptoData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCryptoData();
  }, []);

  const renderCryptoItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Avatar.Image source={{ uri: item.image }} size={50} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.value}>${item.current_price.toFixed(2)}</Text>
        </View>
        <View>
          <Text style={styles.label}>24h Change</Text>
          <Text style={[styles.value, item.price_change_percentage_24h >= 0 ? styles.green : styles.red]}>
            {item.price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
      <View style={{ backgroundColor: '#1e2228', height: 80, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Crypto Market</Text>
      </View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={cryptoData}
          renderItem={({ item }) => (
            <Card style={{
              margin: 10,
              padding: 20,
              borderRadius: 10,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 7,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Avatar.Image source={{ uri: item.image }} size={50} style={{ marginRight: 10 }} />
                <View>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                  <Text style={{ fontSize: 16, color: '#999' }}>{item.symbol.toUpperCase()}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontSize: 16, color: '#999', marginBottom: 5 }}>Price</Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${item.current_price.toFixed(2)}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 16, color: '#999', marginBottom: 5 }}>24h Change</Text>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: item.price_change_percentage_24h >= 0 ? '#2dbb54' : '#d93b3b'
                  }}>
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </Text>
                </View>
              </View>
            </Card>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
  
};

export default App;