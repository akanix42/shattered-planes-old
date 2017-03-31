import GenerateWhenTriggeredComponent from './GenerateWhenTriggeredComponent';
import events from '/eventTypes';
import chai from 'chai';

const expect = chai.expect;

describe('GenerateWhenTriggeredComponent', ()=> {
  describe('constructor', () => {
    it('should set the template to the passed in template', () => {
      let template = {};
      const generateWhenTriggeredComponent = new GenerateWhenTriggeredComponent({}, { template });
      expect(generateWhenTriggeredComponent.template).to.equal(template);
    });
  });

  describe('generate', () => {
    it(`should generate an template`, () => {
      let result;
      let template = {};
      const generateWhenTriggeredComponent = new GenerateWhenTriggeredComponent({
        entityGenerator: {
          generate(template) {
            result = template
          }
        }
      }, { template });

      generateWhenTriggeredComponent.generate();

      expect(result).to.equal(template);
    });
  });

  describe('Handlers', () => {
    it('should listen to the events passed in as triggers', () => {
      const triggers = [
        { eventType: events.onTargetReached, priority: events.priorities.AFTER }
      ];
      const componentWithoutTriggers = new GenerateWhenTriggeredComponent();
      const componentWithTriggers = new GenerateWhenTriggeredComponent({}, { triggers });
      expect(componentWithoutTriggers.handlers.find(handler=>handler.eventType === events.onTargetReached)).to.not.be.ok;
      expect(componentWithTriggers.handlers.find(handler=>handler.eventType === events.onTargetReached)).to.be.ok;
    });
  });
});
