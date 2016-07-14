'use strict';
import ArchitectureComponent from './ArchitectureComponent';
import Entity from 'shattered-lib/Entity';
import Tile from 'shattered-lib/Tile';
import chai from 'chai';

const expect = chai.expect;

describe('ArchitectureComponent', ()=> {
  describe('onPosition', () => {

    it(`should set the current tile's architecture to it's entity`, () => {
      const architectureComponent = new ArchitectureComponent();
      const entity = new Entity();
      const currentTile = new Tile();
      entity.addComponent(architectureComponent);

      architectureComponent.onPosition({destination: currentTile});
      expect(currentTile.architecture).to.equal(entity);
    });

    it(`should remove it's entity from the previous tile's architecture`, () => {
      const architectureComponent = new ArchitectureComponent();
      const entity = new Entity();
      const previousTile = new Tile();
      entity.addComponent(architectureComponent);
      previousTile.architecture = entity;

      architectureComponent.onPosition({destination: null});
      expect(previousTile.architecture).to.be.null;
    });

  });
});
