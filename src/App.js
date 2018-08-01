/**
 * @imports
 */
import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import FlipView from 'react-native-flip-view';
import MapViewNavigation, { NavigationModes, TravelModeBox, TravelIcons, Geocoder, TravelModes, DirectionsListView, ManeuverView, DurationDistanceView } from 'react-native-maps-navigation';
import OptionGroup from 'react-native-optiongroup';
import Styles, {AppColors, AppFonts} from './AppStyles';
import MapStyles from './MapStyles';

/**
 * Settings
 * @type {string}
 */

/**
 * You need to fill in a Google API Key that enables the Direction API.
 */
const GOOGLE_API_KEY = 'GOOGLE_KEY';

/**
 * Set to true to use the controls methods instead of props
 * @type {boolean}
 */
const USE_METHODS = false;


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
            origin: {latitude: 37.78825, longitude: -122.4324},
            destination: '132 Wilmot St, San Francisco, CA 94115',
            navigationMode: NavigationModes.IDLE,
            travelMode: TravelModes.DRIVING,
            isFlipped: false,
            isNavigation: false,
            route: false,
            step: false,
        }
    }

    /**
     * goDisplayRoute
     * @void
     */
    goDisplayRoute()
    {
        if(!this.validateRoute()) return;

        // There are two ways to display a route - either through the method
        // displayRoute or by setting the props.
        // The difference is that you get instant feedback when using methods vs props.

        if(USE_METHODS) {

            this.refNavigation.displayRoute(
                this.state.origin,
                this.state.destination,
                {
                    mode: this.state.travelMode
                }
            ).then(route => {
                console.log(route);
            });

        } else {

            this.setState({
                navigationMode: NavigationModes.ROUTE,
            });
        }
    }

    /**
     * goNavigateRoute
     * @void
     */
    goNavigateRoute()
    {
        if (!this.validateRoute()) return;

        // There are two ways to navigate a route - either through the method
        // navigateRoute or by setting the props.
        // The difference is that you get instant feedback when using methods vs props.

        if (USE_METHODS) {

            this.refNavigation.navigateRoute(
                this.state.origin,
                this.state.destination,
                {
                    mode: this.state.travelMode
                }
            ).then(route => {
                this.setState({
                    isNavigation: true
                })
            });

        } else {

            this.setState({
                navigationMode: NavigationModes.NAVIGATION,
            });
        }
    }

    /**
     * validateRoute
     * @returns {boolean}
     */
    validateRoute()
    {
        if(this.state.destination.length >= 3) return true;

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
                          <TextInput style={Styles.input} onChangeText={destination => this.setState({destination})} value={this.state.destination}/>

                          <TouchableOpacity style={Styles.button} onPress={() => this.goDisplayRoute()}>
                              <Text style={Styles.buttonText}>{'\ue961'}</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={Styles.button} onPress={() => this.goNavigateRoute()}>
                              <Text style={Styles.buttonText}>{'\ue975'}</Text>
                          </TouchableOpacity>

                      </View>
                      <TravelModeBox
                          onChange={travelMode => this.setState({travelMode})}
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
                                  origin={this.state.origin}
                                  destination={this.state.destination}
                                  navigationMode={this.state.navigationMode}
                                  travelMode={this.state.travelMode}
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
                            displayTravelMode={true}
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