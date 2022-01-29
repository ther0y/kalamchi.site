import { Base64 } from "./Base64";

type SetterGetter<T> = { set: (value: T) => void; get: () => T };

class EncryptedLocalstorage {
  constructor(private name: string) {}

  get() {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(this.name);
    return item && Base64.decode(item);
  }

  set(value: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.name, Base64.encode(value));
  }
}

export const LsBox = (name: string): EncryptedLocalstorage => {
  return new EncryptedLocalstorage(name);
};

export function EncBox(value: string): SetterGetter<string> {
  let secret = Base64.encode(value);

  return {
    get() {
      return Base64.decode(secret);
    },
    set(newValue: string) {
      secret = Base64.encode(newValue);
    },
  };
}
