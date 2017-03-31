declare module 'jcson' {
  interface SerializerSymbols {

  }
  interface ISerializedData {
    instances: any[];
    root: any;
  }

  interface IObjectReference {
    __index__: number
  }

  class Serializer {
    static Symbols: { Serialize: Symbol };

    constructor(jsonc: any);


    serialize(data: any): IObjectReference


    convertRegisteredTypeToDto(obj: any): IObjectReference;
  }

  interface JsoncOptions {
    exclude?: string[];
    include?: string[];
  }

  export interface ISerializableDecorator {
    (typeName:string, options?: JsoncOptions): (target:any) => void
  }

  const serializable: ISerializableDecorator;
  export { serializable };

  export interface ISerializable {
    _name?: string;
    __type__?: string;
  }
}
