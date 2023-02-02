import { LightningElement } from 'lwc';
// the ursusResources adapter gives us access to a static resource associated with our app
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.getAllBears() Apex method */
import getAllBears from '@salesforce/apex/BearController.getAllBears';
export default class BearList extends LightningElement {
	bears;
	error;
	appResources = {
		bearSilhouette: `${ursusResources}/standing-bear-silhouette.png`,
	};

    // execute code after the component is loaded
	connectedCallback() {
		this.loadBears();
	}
	loadBears() {
        // imperative Apex
		getAllBears()
			.then(result => {
				this.bears = result;
			})
			.catch(error => {
				this.error = error;
			});
	}
}