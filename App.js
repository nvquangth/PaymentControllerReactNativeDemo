/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import '@terra-js/react-native-bridge';
import Terra from '@terra-js/app';
import PaymentControllerObserverKit from '@terra-js/payment-controller-observer-kit';
import terraConfig from './terra-config.json';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const appName = 'payment_controller';

  useEffect(() => {
    Terra.initializeApp({appName, terraConfig})
      .then(app => {
        Alert.alert('', `App has been initialized: ${app.name}`);
      })
      .catch(error => {
        Alert.alert('', `App has been initialized failure: ${error.message}`);
      });
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.buttonContainer}>
            <Button onPress={initializeObserver} title={'Init Observer'} />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={observer} title={'Observer'} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const appName = 'payment_controller';

const initializeObserver = () => {
  let request = {merchantCode: 'VIETTEL', terminalCode: 'PE24194350087'};

  PaymentControllerObserverKit.initializeObserver(request, appName)
    .then(result => {
      console.log(`initializeObserver result: ${JSON.stringify(result)}`);
    })
    .catch(error => {
      console.log(`initializeObserver error: ${error}`);
    });
};

const observer = () => {
  let request = {requestId: '547b1dc2-e434-43e2-982f-ba46be467a1k'};

  cancellationSubsription = PaymentControllerObserverKit.observerCancellation(
    request,
    appName,
    data => {
      try {
        console.log(`observerCancellation result: ${JSON.stringify(data)}`);
      } catch (error) {
        console.log(`observerCancellation error: ${error}`);
      }
    },
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonContainer: {
    marginTop: 12,
  },
});

export default App;
