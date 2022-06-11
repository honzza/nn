// Parsing the data and sending the response. The following rules apply:

// Phone calls longer than 5 minutes are charged per minutes, and each new minute costs 150 cents
// Short phone calls are charged per second, and each second costs 3 cents
// Customer gets a discount on one phone number which is phone number the customer has called the longest
// If there are two phone numbers that the customer has been calling for the same amount of time,
// then the discounted phone number is the smallest number, when we sort them numerically
// All calls to that phone number will not be charged

const parseData = (req, res) => {
  // Parsing the raw text data into an array of objects
  // Single line format hh:mm:ss,NNN-NNN-NNN
  const lines = req.body.split(/\r\n|\r|\n/g);
  const phoneData = lines.map((line) => {
    const [duration, number] = line.split(",");
    const [hours, minutes, seconds] = duration.split(":");
    return {
      duration:
        parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds),
      number,
      cost: 0,
    };
  });

  // Calculating the cost of each phone call
  const phoneDataCharged = phoneData.map((item) => {
    item.duration < 300
      ? (item.cost = item.duration * 3)
      : (item.cost = Math.ceil(item.duration / 60) * 150);
    return item;
  });

  // Finding the unique phone numbers and summing the cost and duration
  const phoneDataGrouped = [];
  phoneDataCharged.forEach((item) => {
    const index = phoneDataGrouped.findIndex((i) => i.number === item.number);
    if (index === -1) {
      phoneDataGrouped.push(item);
      return;
    }
    phoneDataGrouped[index].cost += item.cost;
    phoneDataGrouped[index].duration += item.duration;
  });

  // Sorting the phone numbers by duration and identifing the longest call
  const phoneDataSortedDuration = phoneDataGrouped.sort((a, b) => {
    return b.duration - a.duration;
  });
  const longestDuration = phoneDataSortedDuration[0].duration;

  //Filtering the phone numbers that have been called the longest
  const longestCalls = phoneDataSortedDuration.filter((item) => {
    return item.duration === longestDuration;
  });

  // Sorting the phone numbers by number and identifying the smallest number
  const freePhoneNumber = longestCalls.sort((b, a) => {
    return (
      parseInt(b.number.replace("-", "")) - parseInt(a.number.replace("-", ""))
    );
  });
  // Removing the free phone number from the list
  const phoneDataFinal = phoneDataSortedDuration.filter((item) => {
    return item.number != freePhoneNumber[0].number;
  });

  // Calculating the total cost of all phone calls
  const totalCost = phoneDataFinal.reduce(
    (acc, curr) => {
      acc.cost += curr.cost;
      return acc;
    },
    { cost: 0 }
  );

  res.status(200).send(totalCost);
};

exports.parseData = parseData;

// Tests - possible issues zeros at the beginning and the end of the number
// Immutability of the arrays
