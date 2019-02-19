export default class PageManager {
  constructor(element){
    this.element = element;
  }

  init() {
    this.element.addEventListener('DOMContentLoaded', () => {
     window.PageManager.initialize(this.element);
    });
    // this.initializeUser(); USER GREETINGS FROM CONTROLLER

  }

  // initializeUser(){
    // var userProfile = new window.UserProfile();
    // userProfile.init();
  // }

  static initialize(element) {
    var components = Array.prototype.slice.call(
      element.getElementsByClassName('js-component')
    );

    for (var i = 0; i < components.length; i++) {
      var component = components[i];
      var componentClass = component.dataset.component;

      var volatileComponent = new window[componentClass](component);
      volatileComponent.init();
    }
  }
}

