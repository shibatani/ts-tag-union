// タグ付きユニオン型を作成
type Some<T> = {
  tag: "some";
  value: T;
};

type None = {
  tag: "none";
};

type Option<T> = Some<T> | None;

function isSome<T>(obj: Option<T>): obj is { tag: "some"; value: T } {
  return obj.tag === "some";
}

function callNumber(obj: Option<number>) {
  if (isSome<number>(obj)) {
    console.log(obj.value);
  }
}

const obj1: Option<number> = {
  tag: "some",
  value: 1
};

const obj2: Option<number> = {
  tag: `none`
};

callNumber(obj1);
callNumber(obj2);

// タグ付きユニオン型を作成(2)

function mapOption<T, U>(
  obj: Option<T>,
  doubleFunction: (x: T) => U
): Option<U> {
  switch (obj.tag) {
    case "some":
      return {
        tag: "some",
        value: doubleFunction(obj.value)
      };
    case "none":
      return {
        tag: "none"
      };
  }
}

function doubleOption(obj: Option<number>) {
  return mapOption<number, number>(obj, (x) => x * 2);
}

const four: Option<number> = {
  tag: "some",
  value: 4
};

const nothing: Option<number> = {
  tag: "none"
};

console.log(doubleOption(four));
console.log(doubleOption(nothing));
