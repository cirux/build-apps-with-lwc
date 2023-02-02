import { LightningElement } from 'lwc';

export default class HelloWebComponent extends LightningElement {
    // declares and initializes a greeting reactive property
    greeting = 'Trailblazer';

    // using a property has the benefit of not creating a new Date object for each rerender.
    currentDate = new Date().toDateString();

    // These getter functions are called expressions
    get capitalizedGreeting() {
        return `Hello ${this.greeting.toUpperCase()}!`;
    }

    // defines a function that captures a value from an event (input change event coming from the input field) and assigns it to the greeting property.
    handleGreetingChange(event) {
        this.greeting = event.target.value;
    }

}