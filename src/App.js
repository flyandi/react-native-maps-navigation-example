/**
 * @imports
 */
import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import FlipView from 'react-native-flip-view';
import MapViewNavigation, { TravelModeBox, TravelIcons, Geocoder, TravelModes, DirectionsListView, ManeuverView, DurationDistanceView } from 'react-native-maps-navigation';
import OptionGroup from 'react-native-optiongroup';
import Styles, {AppColors, AppFonts} from './AppStyles';
import MapStyles from './MapStyles';

/**
 * Settings
 * @type {string}
 */
const GOOGLE_API_KEY = '';


/**
 * @app
 */
export default class App extends Component {

    /**
     * @constructor
     * @param props
     */
    constructor(props)
    {
        super(props);

        this.state = {
            isFlipped: false,
            isNavigation: false,
            address: '132 Wilmot St, San Francisco, CA 94115',
            mode: TravelModes.DRIVING,
            route: false,
            step: false,
        }
    }

    /**
     * goDisplayRoute
     */
    goDisplayRoute()
    {
        if(!this.validateRoute()) return;

        this.refNavigation.displayRoute(
            {latitude: 37.78825, longitude: -122.4324},
            this.state.address,
            {
                mode: this.state.mode
            }
        ).then(route => {
            console.log(route);
        });
    }

    /**
     * @void
     */
    goNavigateRoute()
    {
        if(!this.validateRoute()) return;

        this.refNavigation.navigateRoute(
            {latitude: 37.78825, longitude: -122.4324},
            this.state.address,
            {
                mode: this.state.mode
            }
        ).then(() => {
            this.setState({
                isNavigation: true
            })
        });
    }

    /**
     * validateRoute
     * @returns {boolean}
     */
    validateRoute()
    {
        if(this.state.address.length >= 3) return true;

        Alert.alert('Address required', 'You need to enter an address first');

        return false;
    }

    /**
     * @render
     * @returns {*}
     */
    render()
    {
      return (
          <View style={Styles.appContainer}>

              {this.state.isNavigation ? null : (
                  <View style={Styles.appHeader}>
                      <Text style={Styles.inputLabel}>Where do you want to go?</Text>
                      <View style={Styles.inputContainer}>
                          <TextInput style={Styles.input} onChangeText={address => this.setState({address})} value={this.state.address}/>

                          <TouchableOpacity style={Styles.button} onPress={() => this.goDisplayRoute()}>
                              <Text style={Styles.buttonText}>{'\ue961'}</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={Styles.button} onPress={() => this.goNavigateRoute()}>
                              <Text style={Styles.buttonText}>{'\ue975'}</Text>
                          </TouchableOpacity>

                      </View>
                      <TravelModeBox
                          onChange={mode => this.setState({mode})}
                          inverseTextColor={AppColors.background}
                      />
                  </View>
               )}

              <FlipView
                  style={{flex: 1}}
                  isFlipped={this.state.isFlipped}
                  front={
                      <View style={{flex:1}}>
                          <ManeuverView
                              step={this.state.step}
                              fontFamily={AppFonts.light}
                              fontFamilyBold={AppFonts.bold}
                          />
                          <MapView
                              ref={ref => this.refMap = ref}
                              provider={PROVIDER_GOOGLE}
                              style={Styles.map}
                              customMapStyle={MapStyles}
                              initialRegion={{
                                  latitude: 37.78825,
                                  longitude: -122.4324,
                                  latitudeDelta: 0.0922,
                                  longitudeDelta: 0.0421,
                              }}
                          >
                              <MapViewNavigation
                                  ref={ref => this.refNavigation = ref}
                                  map={() => this.refMap}
                                  apiKey={GOOGLE_API_KEY}
                                  simulate={true}
                                  onRouteChange={route => this.setState({route})}
                                  onStepChange={(step, nextStep) => this.setState({step, nextStep})}
                                  displayDebugMarkers={true}
                                  onNavigationStarted={route => console.log("Navigation Started")}
                                  onNavigationCompleted={route => this.setState({isNavigation: false})}
                              />
                          </MapView>
                      </View>
                  }
                  back={
                      <View>
                        <DirectionsListView
                            fontFamily={AppFonts.light}
                            fontFamilyBold={AppFonts.bold}
                            route={this.state.route}
                        />
                      </View>
                  }
              />

              <View style={Styles.appFooter}>
                  <OptionGroup
                      options={['Map', 'Directions']}
                      onChange={v => this.setState({isFlipped: v == 1})}
                      defaultValue={0}
                      borderColor={AppColors.foreground}
                      inverseTextColor={AppColors.background}
                  />
              </View>

          </View>
      )
    }
}