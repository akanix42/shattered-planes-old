import { serializable } from 'jsonc';

@serializable('Entity')
class Entity {
  _components = [];

  addComponent(component) {
    if (component._key in this._components)
      throw new Error(`Component ${_key} already exists for entity ${_this}`);

    this._components[component._key] = component;
    return this;
  }

  removeComponent(key) {
    delete this._components[key];
  }

}

export default Entity;