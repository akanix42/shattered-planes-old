class MessageBus {
  topics = new Map;

  subscribe(subscription) {
    let topic = `${subscription.channel}.${subscription.topic}`;
    let entry = this.topics.get(topic);
    if (entry === undefined)
      this.topics.set(topic, entry = []);
    entry.push(subscription.callback);
    return entry.length -1;
  }

  unsubscribe(channel, topic, index) {
    topic = `${data.channel}.${data.topic}`;
    let entry = this.topics.get(topic);
    if (entry === undefined) return;
      entry.splice(index, 1);
  }

  publish(data) {
    let topic = `${data.channel}.${data.topic}`;
    let entry = this.topics.get(topic);
    if (entry === undefined) return;

    for (let i = 0; i < entry.length; i++)
      entry[i](data.data);
  }
}

export default new MessageBus;
