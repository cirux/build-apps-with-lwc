import { LightningElement, api, wire } from 'lwc';
// getRecord adapter allow us to use the Lightning Data Service to retrieve records without having to write Apex.
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Set Bear object fields - Note that this approach doesn’t support referential integrity. 
const NAME_FIELD = 'Bear__c.Name';
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Bear__c.Location__Longitude__s';
const bearFields = [
	NAME_FIELD,
	LOCATION_LATITUDE_FIELD,
	LOCATION_LONGITUDE_FIELD
];
export default class BearLocation extends LightningElement {
  // automatically receives the current record id
  @api recordId;

  name;

  mapMarkers = [];

  // Thanks to the @wire decorator, loadBear is automatically called when the component loads or when the record id changes.
  @wire(getRecord, { recordId: '$recordId', fields: bearFields })
  loadBear({ error, data }) {
    if (error) {
      // TODO: handle error
    } else if (data) {
      // Get Bear data
      this.name =  getFieldValue(data, NAME_FIELD);
      const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
      const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);
      // Transform bear data into map markers
      this.mapMarkers = [{
        location: { Latitude, Longitude },
        title: this.name,
        description: `Coords: ${Latitude}, ${Longitude}`
      }];
    }
  }
  get cardTitle() {
    return (this.name) ? `${this.name}'s location` : 'Bear location';
  }
}