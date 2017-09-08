export class PropertyNotifyInfo {
  key: string;
  origValue: any;
  value: any;
  constructor(key: string, origValue: any, value: any) {
    this.key = key;
    this.origValue = origValue;
    this.value = value;
  }
}
