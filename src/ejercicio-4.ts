interface printMachine {
  print(doc: string): string;
}

interface scanMachine {
  scan(doc: string): string;
}

interface faxMachine {
  fax(doc: string): void;
}

export class BasicPrinter implements printMachine {
  print(doc: string): string {
    console.log("Printing:", doc);
    return `Printing: ${doc}`;
  }
}

export class BasicFax implements faxMachine {
  fax(doc: string): void {
    console.log("Sending Fax:", doc);
  }
}

export function sendFax(m: faxMachine, doc: string): string {
  m.fax(doc);
  return `Sending Fax: ${doc}`;
}
