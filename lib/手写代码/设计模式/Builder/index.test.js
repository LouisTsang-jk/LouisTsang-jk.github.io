class ConcreteBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.computer = new Computer();
  }

  setCpu() {
    this.computer.parts.cpu = 'cpu1';
  }

  setMainboard() {
    this.computer.parts.mainboard = 'mainboard1';
  }

  setMemory() {
    this.computer.parts.memory = 'memory1';
  }

  getProduct() {
    const result = this.computer;
    this.reset();
    return result;
  }
}

class Computer {
  parts = {
    cpu: null,
    mainboard: null,
    memory: null
  };

  listParts() {
    console.log(`computer parts: ${this.parts.join(", ")}\n`);
  }
}

class Director {
  setBuilder(builder) {
    this.builder = builder;
  }
  buildProduct() {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

function clientCode(director) {
  const builder = new ConcreteBuilder();
  director.setBuilder(builder);

  console.log("Standard full featured product:");
  director.buildProduct();
  builder.getProduct().listParts();

  // Remember, the Builder pattern can be used without a Director class.
  console.log("Custom product:");
  builder.producePartA();
  builder.producePartC();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
