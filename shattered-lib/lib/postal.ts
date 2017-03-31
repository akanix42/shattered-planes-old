class Subscription {
  constructor(messageBus, topic, index) {
    this.messageBus = messageBus;
    this.topic = topic;
    this.index = index;
  }

  unsubscribe() {
    this.messageBus.unsubscribe(this.topic, this.index);
  }
}

class MessageBus {
  topics = new Map;

  subscribe(data) {
    let topic = data.topic;
    let entry = this.topics.get(topic);
    if (entry === undefined)
      this.topics.set(topic, entry = []);

    let subscription = new Subscription(this, topic, entry.length);
    entry.push(data.callback);
    return subscription;
  }

  unsubscribe(topic, index) {
    let entry = this.topics.get(topic);
    if (entry === undefined) return;
    entry.splice(index, 1);
  }

  publish(data) {
    let entry = this.topics.get(data.topic);
    if (entry === undefined) return;

    for (let i = 0; i < entry.length; i++)
      entry[i](data.data);
  }
}

export default new MessageBus;
