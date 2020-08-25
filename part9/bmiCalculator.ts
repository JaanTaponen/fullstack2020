interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]) / 100,
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const multiplicator = (height: number, mass: number): String => {
    const bmi = mass / (height * height)
    //console.log("height",height, "mass", mass, "bmi", bmi)
    if (bmi < 18.5) {
        return "bruh you are underweight"
    } else if (bmi < 25){
        return "bruh you are normalweight"
    } else if (bmi < 30) {
        return "bruh you are overweight"
    } else {
        return "bruh you are very overweight"
    }
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(multiplicator(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}